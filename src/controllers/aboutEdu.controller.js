import { AboutAndEducation } from "../models/aboutAndEdu.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";
import { STATUS_CODE, MESSAGES } from "../constants.js";
import { ApiError } from "../utils/apiError.js";

const createAboutEdu = asyncHandler(async (req, res) => {
  const { title, description, education } = req.body;

  if (!title || !description || !education || !Array.isArray(education)) {
    throw new ApiError(STATUS_CODE.BAD_REQUEST, MESSAGES.REQUIRED_FIELDS);
  }

  const existingAbout = await AboutAndEducation.findOne({ user: req.user._id });
  if (existingAbout) {
    throw new ApiError(STATUS_CODE.CONFLICT, MESSAGES.USER_ALREADY_HAS_ABOUT);
  }

  const aboutEdu = await AboutAndEducation.create({
    user: req.user._id,
    title,
    description,
    education,
  });

  return res
    .status(STATUS_CODE.CREATED)
    .json(
      new ApiResponse(
        STATUS_CODE.CREATED,
        { aboutEdu },
        MESSAGES.ABOUT_AND_EDUCATION_CREATED_SUCCESSFULLY
      )
    );
});

const getAboutEdu = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    throw new ApiError(
      STATUS_CODE.BAD_REQUEST,
      "User ID is required in params"
    );
  }

  const aboutEdu = await AboutAndEducation.findOne({ user: userId });

  if (!aboutEdu) {
    throw new ApiError(
      STATUS_CODE.NOT_FOUND,
      MESSAGES.ABOUT_AND_EDUCATION_NOT_FOUND
    );
  }

  return res
    .status(STATUS_CODE.OK)
    .json(
      new ApiResponse(
        STATUS_CODE.OK,
        { aboutEdu },
        MESSAGES.ABOUT_AND_EDUCATION_FETCHED_SUCCESSFULLY
      )
    );
});

const updateAboutEdu = asyncHandler(async (req, res) => {
  const { title, description, education } = req.body;

  if (!title || !description || !education || !Array.isArray(education)) {
    throw new ApiError(STATUS_CODE.BAD_REQUEST, MESSAGES.REQUIRED_FIELDS);
  }
  const aboutEdu = await AboutAndEducation.findOne({ user: req.user._id });

  if (!aboutEdu) {
    throw new ApiError(
      STATUS_CODE.NOT_FOUND,
      MESSAGES.ABOUT_AND_EDUCATION_NOT_FOUND
    );
  }

  aboutEdu.title = title;
  aboutEdu.description = description;
  aboutEdu.education = education;

  await aboutEdu.save();

  return res
    .status(STATUS_CODE.OK)
    .json(
      new ApiResponse(
        STATUS_CODE.OK,
        { aboutEdu },
        MESSAGES.ABOUT_AND_EDUCATION_UPDATED_SUCCESSFULLY
      )
    );
});

const deleteAboutEdu = asyncHandler(async (req, res) => {
  const aboutEdu = await AboutAndEducation.findOneAndDelete({
    user: req.user._id,
  });

  if (!aboutEdu) {
    throw new ApiError(
      STATUS_CODE.NOT_FOUND,
      MESSAGES.ABOUT_AND_EDUCATION_NOT_FOUND
    );
  }

  return res
    .status(STATUS_CODE.OK)
    .json(
      new ApiResponse(
        STATUS_CODE.OK,
        {},
        MESSAGES.ABOUT_AND_EDUCATION_DELETED_SUCCESSFULLY
      )
    );
});
export { createAboutEdu, getAboutEdu, updateAboutEdu, deleteAboutEdu };
