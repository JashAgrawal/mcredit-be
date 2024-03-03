import mongoose, { Schema } from "mongoose";
import Customer from "./customer";

const reminderSchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, required: true },
  userName: { type: String, required: true },
  userPhone: { type: String, required: true },
  customerId: { type: Schema.Types.ObjectId, ref: Customer },
  onDate: Date,
  onEvent: { type: String, enum: ["WEEKLY", "MONTHLY"] },
  isActive: Boolean,
});

const Reminder = mongoose.model("Reminders", reminderSchema);

export default Reminder;
