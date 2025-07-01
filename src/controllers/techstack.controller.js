import { TechStack } from "../models/techStack.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";
import { STATUS_CODE, MESSAGES } from "../constants.js";
import { ApiError } from "../utils/apiError.js";

const createTechStack = asyncHandler(async (req, res) => {
  const { title, subtitle, stack } = req.body;

  if (!title || !subtitle || !stack) {
    throw new ApiError(STATUS_CODE.BAD_REQUEST, MESSAGES.REQUIRED_FIELDS);
  }

  const parsedStack = JSON.parse(stack); // assuming `stack` comes as JSON string

  const finalStack = [];

  for (let i = 0; i < parsedStack.length; i++) {
  const iconFile = req.files.find(file => file.fieldname === `stack[${i}][icon]`);
  const iconLocalPath = iconFile?.path;

  if (!iconLocalPath) {
    throw new ApiError(STATUS_CODE.BAD_REQUEST, `Missing icon for ${parsedStack[i].name}`);
  }

  const uploadedIcon = await uploadOnCloudinary(iconLocalPath);

  if (!uploadedIcon) {
    throw new ApiError(STATUS_CODE.INTERNAL_SERVER_ERROR, `Failed to upload icon for ${parsedStack[i].name}`);
  }

  finalStack.push({
    name: parsedStack[i].name,
    iconUrl: uploadedIcon.url,
  });
}

  const techStack = await TechStack.create({
    user: req.user._id,
    title,
    subtitle,
    stack: finalStack,
  });

  return res.status(STATUS_CODE.CREATED).json(
    new ApiResponse(
      STATUS_CODE.CREATED,
      { techStack },
      MESSAGES.TECH_STACK_CREATED_SUCCESSFULLY 
    )
  );
});

const updateTechStack = asyncHandler(async (req, res) => {
  const { title, subtitle, stack } = req.body;

  if (!title || !subtitle || !stack) {
    throw new ApiError(STATUS_CODE.BAD_REQUEST, MESSAGES.REQUIRED_FIELDS);
  }

  const parsedStack = JSON.parse(stack); // assuming JSON stringified array
  const finalStack = [];

  for (let i = 0; i < parsedStack.length; i++) {
    const iconFile = req.files.find(file => file.fieldname === `stack[${i}][icon]`);
    const iconLocalPath = iconFile?.path;

    let iconUrl = parsedStack[i].iconUrl; // fallback to existing URL

    if (iconLocalPath) {
      const uploadedIcon = await uploadOnCloudinary(iconLocalPath, "auto");
      if (!uploadedIcon) {
        throw new ApiError(STATUS_CODE.INTERNAL_SERVER_ERROR, `Failed to upload icon for ${parsedStack[i].name}`);
      }
      iconUrl = uploadedIcon.url;
    }

    finalStack.push({
      name: parsedStack[i].name,
      iconUrl,
    });
  }

  const techStack = await TechStack.findOneAndUpdate(
    { user: req.user._id },
    { title, subtitle, stack: finalStack },
    { new: true }
  );

  if (!techStack) {
    throw new ApiError(STATUS_CODE.NOT_FOUND, MESSAGES.TECH_STACK_NOT_FOUND);
  }

  return res.status(STATUS_CODE.OK).json(
    new ApiResponse(
      STATUS_CODE.OK,
      { techStack },
      MESSAGES.TECH_STACK_UPDATED_SUCCESSFULLY
    )
  );
});
const getTechStack = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    throw new ApiError(STATUS_CODE.BAD_REQUEST, "User ID is required in params");
  }

  const techStack = await TechStack.findOne({ user: userId });

  if (!techStack) {
    throw new ApiError(STATUS_CODE.NOT_FOUND, MESSAGES.TECH_STACK_NOT_FOUND);
  }

  return res
    .status(STATUS_CODE.OK)
    .json(
      new ApiResponse(
        STATUS_CODE.OK,
        { techStack },
        MESSAGES.TECH_STACK_FETCHED_SUCCESSFULLY
      )
    );
});
const deleteTechStack = asyncHandler(async (req, res) => {
  const techStack = await TechStack.findOneAndDelete({ user: req.user._id });

  if (!techStack) {
    throw new ApiError(STATUS_CODE.NOT_FOUND, MESSAGES.TECH_STACK_NOT_FOUND);
  }

  return res
    .status(STATUS_CODE.OK)
    .json(
      new ApiResponse(
        STATUS_CODE.OK,
        {},
        MESSAGES.TECH_STACK_DELETED_SUCCESSFULLY
      )
    );
});


export { createTechStack,updateTechStack,getTechStack ,deleteTechStack};