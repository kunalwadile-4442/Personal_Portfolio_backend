import mongoose, { Schema, model } from "mongoose";

const educationSchema = new Schema({
  degree: {
    type: String,
    required: true,
    trim: true,
  },
  cgpa: {
    type: String,
    required: true,
    trim: true,
  },
  institution: {
    type: String,
    required: true,
    trim: true,
  },
});

const aboutAndEduSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title:{
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    education: [educationSchema],
  },
  { timestamps: true }
);

export const AboutAndEducation = model("AboutAndEducation", aboutAndEduSchema);