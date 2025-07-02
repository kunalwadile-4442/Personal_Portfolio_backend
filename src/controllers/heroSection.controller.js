import { HeroSection } from "../models/heroSection.model.js";
import  asyncHandler  from "../utils/asyncHandler.js";
import  ApiResponse from "../utils/apiResponse.js";
import { STATUS_CODE,MESSAGES } from "../constants.js";
import { ApiError } from "../utils/apiError.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import fetch from "node-fetch"; // optional if you're streaming manually


const createHeroSection = asyncHandler(async (req, res) => {
  const { title, designation } = req.body;

  if (!title || !designation) {
    throw new ApiError(STATUS_CODE.BAD_REQUEST, MESSAGES.REQUIRED_FIELDS);
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const resumeLink = req.files?.resumeLink[0]?.path;

  if(!resumeLink){
    throw new ApiError(STATUS_CODE.BAD_REQUEST, MESSAGES.RESUME_REQUIRED);
  }

  if (!avatarLocalPath) {
    throw new ApiError(STATUS_CODE.BAD_REQUEST, MESSAGES.AVATAR_REQUIRED);
  }

  // Check if the user already has a hero section
  const existingHeroSection = await HeroSection.findOne({ user: req.user._id });
  if (existingHeroSection) {
    throw new ApiError(
      STATUS_CODE.CONFLICT,
      MESSAGES.USER_ALREADY_HAS_HERO_SECTION
    );
  }

  const avatarUploaded = await uploadOnCloudinary(avatarLocalPath, "auto");
  const resumeUploaded = await uploadOnCloudinary(resumeLink, "raw");
  console.log("resumeUploaded",resumeUploaded)
  console.log("avatarUploaded", avatarUploaded);


  if(!resumeUploaded){
    throw new ApiError(
      STATUS_CODE.INTERNAL_SERVER_ERROR,
      MESSAGES.RESUME_UPLOAD_FAILED
    );
  }
  if (!avatarUploaded) {
    throw new ApiError(
      STATUS_CODE.INTERNAL_SERVER_ERROR,
      MESSAGES.AVATAR_UPLOAD_FAILED
    );
  }
  // Create a new hero section
  const heroSection = await HeroSection.create({
    user: req.user._id,
    title,
    designation,
    resumeLink: resumeUploaded.url,
    avatar: avatarUploaded.url,
  });

  return res
    .status(STATUS_CODE.OK)
    .json(
      new ApiResponse(
        STATUS_CODE.OK,
        { heroSection },
        MESSAGES.HERO_SECTION_CREATED_SUCCESSFULLY
      )
    );
});

const getHeroSection = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    throw new ApiError(STATUS_CODE.BAD_REQUEST, "User ID is required in params");
  }

  const heroSection = await HeroSection.findOne({ user: userId });

  if (!heroSection) {
    throw new ApiError(STATUS_CODE.NOT_FOUND, MESSAGES.HERO_SECTION_NOT_FOUND);
  }

  return res
    .status(STATUS_CODE.OK)
    .json(
      new ApiResponse(
        STATUS_CODE.OK,
        { heroSection },
        MESSAGES.HERO_SECTION_FETCHED_SUCCESSFULLY
      )
    );
});

const updateHeroSection = asyncHandler(async (req, res) => {
  const { title, designation } = req.body;

  if (!title || !designation) {
    throw new ApiError(STATUS_CODE.BAD_REQUEST, MESSAGES.REQUIRED_FIELDS);
  }

  const heroSection = await HeroSection.findOne(
    { user: req.user._id },
  );
  if(!heroSection){
    throw new ApiError(STATUS_CODE.NOT_FOUND, MESSAGES.HERO_SECTION_NOT_FOUND);
  }

  heroSection.title = title;
  heroSection.designation = designation;

 const avatarLocalPath = req.files?.avatar?.[0]?.path;
const resumeLinkLocalPath = req.files?.resumeLink?.[0]?.path;

  if (avatarLocalPath) {
    const avatarUploaded = await uploadOnCloudinary(avatarLocalPath, "auto");
    if (!avatarUploaded) {
      throw new ApiError(
        STATUS_CODE.INTERNAL_SERVER_ERROR,
        MESSAGES.AVATAR_UPLOAD_FAILED
      );
    }
    heroSection.avatar = avatarUploaded.url;
  }

  // Upload resume only if new file is uploaded
  if (resumeLinkLocalPath) {
    const resumeUploaded = await uploadOnCloudinary(resumeLinkLocalPath, "raw");
    if (!resumeUploaded) {
      throw new ApiError(
        STATUS_CODE.INTERNAL_SERVER_ERROR,
        MESSAGES.RESUME_UPLOAD_FAILED
      );
    }
    heroSection.resumeLink = resumeUploaded.url;
  }

  await heroSection.save();

  return res
    .status(STATUS_CODE.OK)
    .json(
      new ApiResponse(
        STATUS_CODE.OK,
        { heroSection },
        MESSAGES.HERO_SECTION_UPDATED_SUCCESSFULLY
      )
    );
});

const deleteHeroSection = asyncHandler(async (req, res) => {
  const heroSection = await HeroSection.findOne({ user: req.user._id });

  if (!heroSection) {
    throw new ApiError(STATUS_CODE.NOT_FOUND, MESSAGES.HERO_SECTION_NOT_FOUND);
  }

  await HeroSection.deleteOne({ user: req.user._id }); // ✅ Preferred

  return res
    .status(STATUS_CODE.OK)
    .json(
      new ApiResponse(
        STATUS_CODE.OK,
        {},
        MESSAGES.HERO_SECTION_DELETED_SUCCESSFULLY
      )
    );
});


const downloadResume = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    throw new ApiError(STATUS_CODE.BAD_REQUEST, MESSAGES.USER_ID_REQUIRED);
  }

  const hero = await HeroSection.findOne({ user: userId });
  if (!hero || !hero.resumeLink) {
    throw new ApiError(STATUS_CODE.NOT_FOUND, MESSAGES.RESUME_NOT_FOUND);
  }

  const fileUrl = hero.resumeLink;

  res.setHeader(
    "Content-Disposition",
    "attachment; filename=Kunal-Wadile-Resume.pdf"
  );
  res.setHeader("Content-Type", "application/pdf");

  const response = await fetch(fileUrl);
  if (!response.ok) {
    throw new ApiError(STATUS_CODE.BAD_GATEWAY, MESSAGES.RESUME_DOWNLOAD_FAILED);
  }
  response.body.pipe(res); 
  
});

export {createHeroSection,getHeroSection,updateHeroSection,deleteHeroSection, downloadResume};
