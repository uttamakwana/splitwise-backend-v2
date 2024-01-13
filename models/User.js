//* imports
import mongoose, { mongo } from "mongoose";

//* schema
//? Does: Model each friend
const friendSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  name: { type: String, required: true },
  email: { type: String, required: true },
  amount: { type: Number, required: true, default: 0 },
  transactions: [
    {
      share: { type: Number, required: true },
      description: { type: String, required: true },
    },
  ],
});

//? Does: Model each transaction
const transactionSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isPersonalExpense: {
      type: Boolean,
      required: true,
    },
    paidBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    paidFor: [
      {
        id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        name: { type: String },
        share: { type: Number },
        description: { type: String },
        createdAt: { type: Date, default: Date.now() },
      },
    ],
  },
  { timestamps: true }
);

//? Does: Model each friend request
const friendRequestSchema = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

//? Does: Model each User
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required!"],
    },
    number: {
     type: String,
     required: [true, "Number is required!"]
    },
    email: {
      type: String,
      required: [true, "Email is required!"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
    },
    friends: [friendSchema],
    friendRequests: [friendRequestSchema],
    transactions: [transactionSchema],
    personalTotalExpense: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model.users || mongoose.model("users", userSchema);
