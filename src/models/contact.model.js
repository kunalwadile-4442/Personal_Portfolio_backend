import mongoose, { Schema, model } from "mongoose";

const contactSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
    maxlength: 256,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    maxlength: 256,
    trim: true,
  },
  subject: {
    type: String,
    required: true,
    maxlength: 256,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    maxlength: 15, // supports international format (e.g., +919876543210)
    trim: true,
  },
  message: {
    type: String,
    required: true,
    maxlength: 1000,
    trim: true,
  },
}, { timestamps: true });

export const Contact = model("Contact", contactSchema);