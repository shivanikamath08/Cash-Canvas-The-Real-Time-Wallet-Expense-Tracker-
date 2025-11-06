const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");

// Add expense
router.post("/", async (req, res) => {
  try {
    const { title, amount, category, date } = req.body;

    // Convert frontend date string to proper Date object
    let expenseDate;
    if (date) {
      expenseDate = new Date(date + "T00:00:00"); // ensures selected date is stored
      if (isNaN(expenseDate.getTime())) {
        // fallback if date is invalid
        expenseDate = Date.now();
      }
    } else {
      expenseDate = Date.now(); // fallback if date is not provided
    }

    const expense = new Expense({
      title,
      amount,
      category,
      date: expenseDate
    });

    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: "Error adding expense" });
  }
});

// Get all expenses
router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching expenses" });
  }
});

// Delete expense
router.delete("/:id", async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: "Expense deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting expense" });
  }
});

module.exports = router;
