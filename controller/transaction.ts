import { NextFunction, Request, Response } from "express";
import Transaction from "../models/transaction"; // Assuming your model file is named transactionModel.js
import Customer from "../models/customer";

// Function to add a transaction
export const calculateSummary = async (userId: string, customerId?: string) => {
  const filters: any = { userId };
  if (customerId) {
    filters.customerId = customerId;
  }
  const transactions = await Transaction.find(filters).lean();
  let totalPaid = 0;
  let totalRecived = 0;

  transactions.map((item) => {
    if (item.type === "CREDIT") {
      totalRecived += item.amount;
    } else {
      totalPaid += item.amount;
    }
  });
  const amountToBalance = totalRecived - totalPaid;
  return { totalPaid, totalRecived, amountToBalance };
};
export const addTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, customerId, type, amount, reminder, customReminder, note } =
      req.body;

    // Create a new transaction instance
    const newTransaction = new Transaction({
      userId,
      customerId,
      type,
      amount,
      note,
    });

    // Save the new transaction to the database
    const savedTransaction = await newTransaction.save();
    const summary = await calculateSummary(userId, customerId);
    res.status(201).json({ transaction: savedTransaction, summary }); // Return the saved transaction
  } catch (error) {
    next(error); // Pass any errors to the error handling middleware
  }
};

// Function to edit a transaction
export const editTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { transactionId } = req.params;
    const updatedFields = req.body;

    // Find the transaction by id and update it with the new fields
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      transactionId,
      updatedFields,
      { new: true }
    );

    if (!updatedTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    const summary = await calculateSummary(
      req.body.userId,
      req.body.customerId
    );
    res.json({ transaction: updatedTransaction, summary }); // Return the updated transaction
  } catch (error) {
    next(error); // Pass any errors to the error handling middleware
  }
};

// Function to get transactions by customerId
export const getTransactionsByCustomerId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, customerId } = req.params;

    // Find transactions by customerId
    const transactions = await Transaction.find({ customerId, userId });
    const summary = await calculateSummary(userId, customerId);
    res.json({ transactions, summary }); // Return the transactions
  } catch (error) {
    next(error); // Pass any errors to the error handling middleware
  }
};

// Function to get transactions by userId
export const getTransactionsByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;

    // Find transactions by userId
    const transactions = await Transaction.find({ userId });
    const summary = await calculateSummary(req.body.userId);
    res.json({ transactions, summary }); // Return the transactions
  } catch (error) {
    next(error); // Pass any errors to the error handling middleware
  }
};

// Function to delete a transaction
export const deleteTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { transactionId } = req.params;

    // Find the transaction by id and delete it
    const deletedTransaction = await Transaction.findByIdAndDelete(
      transactionId
    );

    if (!deletedTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.json({ message: "Transaction deleted successfully" });
  } catch (error) {
    next(error); // Pass any errors to the error handling middleware
  }
};
