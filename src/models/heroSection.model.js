import mongoose,{Schema, model} from "mongoose";

const heroSectionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    designation: {
      type: [String],
      required: true,
      trim: true,
    },
    resumeLink: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const HeroSection = model("HeroSection", heroSectionSchema);
