// end_year,topic,sector,region,source,country
import { NextFunction, Request, Response } from "express";
import Customer from "../models/customer";
export const addCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, name, mobile } = req.body;

    // Create a new customer instance
    const newCustomer = new Customer({
      userId,
      name,
      mobile,
    });

    // Save the new customer to the database
    const savedCustomer = await newCustomer.save();

    res.status(201).json(savedCustomer); // Return the saved customer
  } catch (error) {
    next(error); // Pass any errors to the error handling middleware
  }
};

// Function to get customers by userId
export const getCustomersByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;

    // Find customers by userId
    const customers = await Customer.find({ userId });

    res.json(customers); // Return the customers
  } catch (error) {
    next(error); // Pass any errors to the error handling middleware
  }
};

// Function to get customer by userId and customerId
export const getCustomerByUserIdAndCustomerId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, customerId } = req.params;

    // Find customer by userId and customerId
    const customer = await Customer.findOne({ userId, _id: customerId });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.json(customer); // Return the customer
  } catch (error) {
    next(error); // Pass any errors to the error handling middleware
  }
};
export const editCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { customerId } = req.params;
    const updatedFields = req.body;

    // Find the customer by id and update it with the new fields
    const updatedCustomer = await Customer.findByIdAndUpdate(
      customerId,
      updatedFields,
      { new: true }
    );

    if (!updatedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.json(updatedCustomer); // Return the updated customer
  } catch (error) {
    next(error); // Pass any errors to the error handling middleware
  }
};

// Function to delete a customer
export const deleteCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { customerId } = req.params;

    // Find the customer by id and delete it
    const deletedCustomer = await Customer.findByIdAndDelete(customerId);

    if (!deletedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.json({ message: "Customer deleted successfully" });
  } catch (error) {
    next(error); // Pass any errors to the error handling middleware
  }
};
