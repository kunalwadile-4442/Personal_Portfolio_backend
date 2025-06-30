import {Project} from "../models/project.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";
import { STATUS_CODE, MESSAGES } from "../constants.js";
import { ApiError } from "../utils/apiError.js";

const createProjects = asyncHandler(async (req, res) => {
  const { title, subtitle, projectCard } = req.body;

  if (!title || !subtitle || !projectCard) {
    throw new ApiError(STATUS_CODE.BAD_REQUEST, MESSAGES.REQUIRED_FIELDS);
  }
  const existingProject = await Project.findOne({ user: req.user._id });
  if (existingProject) {
    throw new ApiError(
      STATUS_CODE.CONFLICT,
      MESSAGES.USER_ALREADY_HAS_PROJECT
    );
  }

  let parsedCards;
  try {
    parsedCards = JSON.parse(projectCard); // safely parse
  } catch (err) {
    throw new ApiError(STATUS_CODE.BAD_REQUEST, "Invalid JSON in projectCard");
  }

  const projectStack = [];

  for (let i = 0; i < parsedCards.length; i++) {
    const iconFile = req.files.find(
      file => file.fieldname === `projectCard[${i}][projectImg]`
    );
    const iconLocalPath = iconFile?.path;

    let projectImg = parsedCards[i].projectImg || "";

    if (iconLocalPath) {
      const uploadedIcon = await uploadOnCloudinary(iconLocalPath, "auto");
      if (!uploadedIcon) {
        throw new ApiError(
          STATUS_CODE.INTERNAL_SERVER_ERROR,
          `Failed to upload image for ${parsedCards[i].title}`
        );
      }
      projectImg = uploadedIcon.url;
    }

    projectStack.push({
      projectImg,
      title: parsedCards[i].title,
      description: parsedCards[i].description,
      projectLink: parsedCards[i].projectLink
    });
  }

  const project = await Project.create({
    user: req.user._id,
    title,
    subtitle,
    projectCard: projectStack,
  });

  return res.status(STATUS_CODE.CREATED).json(
    new ApiResponse(
      STATUS_CODE.CREATED,
      { project },
      MESSAGES.PROJECT_CREATED_SUCCESSFULLY
    )
  );
});

const updateProjects = asyncHandler(async (req, res) => {
  const { title, subtitle, projectCard } = req.body;

  if (!title || !subtitle || !projectCard) {
    throw new ApiError(STATUS_CODE.BAD_REQUEST, MESSAGES.REQUIRED_FIELDS);
  }
  
   const existingProject = await Project.findOne({ user: req.user._id });
  if (!existingProject) {
    throw new ApiError(
      STATUS_CODE.NOT_FOUND,
      MESSAGES.PROJECTS_NOT_FOUND
    );
  }

  let parsedCards;
  try {
    parsedCards = JSON.parse(projectCard);
  } catch (err) {
    throw new ApiError(STATUS_CODE.BAD_REQUEST, "Invalid projectCard JSON format");
  }

  const updatedStack = [];

  for (let i = 0; i < parsedCards.length; i++) {
    const iconFile = req.files.find(
      file => file.fieldname === `projectCard[${i}][projectImg]`
    );
    const iconLocalPath = iconFile?.path;

    let projectImg = parsedCards[i].projectImg || "";

    if (iconLocalPath) {
      const uploadedIcon = await uploadOnCloudinary(iconLocalPath, "auto");

      if (!uploadedIcon) {
        throw new ApiError(
          STATUS_CODE.INTERNAL_SERVER_ERROR,
          `Failed to upload image for ${parsedCards[i].title}`
        );
      }

      projectImg = uploadedIcon.url;
    }

    updatedStack.push({
      projectImg,
      title: parsedCards[i].title,
      description: parsedCards[i].description,
      projectLink: parsedCards[i].projectLink,
    });
  }

  const updatedProject = await Project.findOneAndUpdate(
    { user: req.user._id },
    { title, subtitle, projectCard: updatedStack },
    { new: true }
  );

  return res.status(STATUS_CODE.OK).json(
    new ApiResponse(
      STATUS_CODE.OK,
      { project: updatedProject },
      MESSAGES.PROJECT_UPDATED_SUCCESSFULLY
    )
  );
});

const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({ user: req.user._id });

    if (!projects || projects.length === 0) {
    throw new ApiError(STATUS_CODE.NOT_FOUND, MESSAGES.PROJECTS_NOT_FOUND);
    }

  return res
    .status(STATUS_CODE.OK)
    .json(
      new ApiResponse(
        STATUS_CODE.OK,
        { projects },
        MESSAGES.PROJECTS_FETCHED_SUCCESSFULLY
      )
    );
}); 

const deleteProjects = asyncHandler(async (req, res) => {
  const projects = await Project.findOneAndDelete({ user: req.user._id });

    if (!projects || projects.length === 0) {
    throw new ApiError(STATUS_CODE.NOT_FOUND, MESSAGES.PROJECTS_NOT_FOUND);
  }

  return res
    .status(STATUS_CODE.OK)
    .json(
      new ApiResponse(
        STATUS_CODE.OK,
        {  },
        MESSAGES.PROJECTS_DELETED_SUCCESSFULLY
      )
    );
});

export { createProjects,updateProjects, getProjects,deleteProjects};