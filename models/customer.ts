import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  mobile: { type: String, required: true },
});

const Customer = mongoose.model("Customers", customerSchema);

export default Customer;
