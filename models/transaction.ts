import mongoose, { Schema } from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    customerId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    type: {
      type: String,
      enum: ["CREDIT", "DEBIT"],
    },
    amount: {
      type: Number,
      default: 0, // Set a default value if needed
    },
    note: String,
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transactions", transactionSchema);

export default Transaction;
