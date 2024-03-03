import { NextFunction, Request, Response } from "express";
import Reminder from "../models/reminder"; // Assuming your model file is named reminderModel.js

// Function to create a reminder
export const createReminder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      userId,
      userName,
      userPhone,
      customerId,
      customerName,
      onDate,
      onEvent,
      isActive,
    } = req.body;

    // Create a new reminder instance
    const newReminder = new Reminder({
      userId,
      userName,
      userPhone,
      customerId,
      onDate,
      onEvent,
      isActive,
    });

    // Save the new reminder to the database
    const savedReminder = await newReminder.save();

    res.status(201).json(savedReminder); // Return the saved reminder
  } catch (error) {
    next(error); // Pass any errors to the error handling middleware
  }
};

// Function to get all reminders by userId
export const getRemindersByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;

    // Find reminders by userId
    const reminders = await Reminder.find({ userId });

    res.json(reminders); // Return the reminders
  } catch (error) {
    next(error); // Pass any errors to the error handling middleware
  }
};

// Function to update a reminder
export const updateReminder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { reminderId } = req.params;
    const updatedFields = req.body;

    // Find the reminder by id and update it with the new fields
    const updatedReminder = await Reminder.findByIdAndUpdate(
      reminderId,
      updatedFields,
      { new: true }
    );

    if (!updatedReminder) {
      return res.status(404).json({ message: "Reminder not found" });
    }

    res.json(updatedReminder); // Return the updated reminder
  } catch (error) {
    next(error); // Pass any errors to the error handling middleware
  }
};

// Function to delete a reminder
export const deleteReminder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { reminderId } = req.params;

    // Find the reminder by id and delete it
    const deletedReminder = await Reminder.findByIdAndDelete(reminderId);

    if (!deletedReminder) {
      return res.status(404).json({ message: "Reminder not found" });
    }

    res.json({ message: "Reminder deleted successfully" });
  } catch (error) {
    next(error); // Pass any errors to the error handling middleware
  }
};

export const getReminderForCron = async (event: "WEEKLY" | "MONTHLY") => {
  const reminders = await Reminder.find({
    isActive: true,
    onEvent: event,
  })
    .populate({ path: "customerId", select: "name mobile" })
    .lean();
  return reminders;
};
