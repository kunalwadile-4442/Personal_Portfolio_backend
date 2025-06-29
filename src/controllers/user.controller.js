import { User } from "../models/user.model.js";
import  ApiResponse  from "../utils/apiResponse.js";
import  asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { MESSAGES, STATUS_CODE } from "../constants.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import { deleteFromCloudinary } from "../utils/deleteOldFile.js";
import jwt from "jsonwebtoken";


const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new ApiError(STATUS_CODE.NOT_FOUND, MESSAGES.USER_NOT_FOUND);
    }
    console.log("user",user)

    const accessToken = user.generateAccessToken();     // ✅ make sure method exists
    const refreshToken = user.generateRefreshToken();   // ✅ typo fixed

    console.log("accessToken",accessToken)
    console.log("refreshToken",refreshToken)

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Token generation error:", error); // helpful log
    throw new ApiError(STATUS_CODE.INTERNAL_SERVER_ERROR, MESSAGES.TOKEN_GENRATION_FAILED);
  }
};
const registerUser = asyncHandler(async(req, res)=>{
  /*
	1.	Extract data from the request body: username, email, password.
	2.	Validate all required fields are present.
	3.	Check if a user already exists with the same email or username.
	4.	If user exists, throw a conflict or duplicate error.
	5.	Hash the password securely using bcrypt (or similar).
	6.	(Optional) Upload profile picture if provided.
	7.	Create and save the user in the database with the hashed password.
	8.	Generate access and refresh tokens (JWT).
	9.	Send success response with user data and tokens.
  */

const {email,password,username,fullName} = req.body;

if(!email || !password || !username || !fullName){
  throw new ApiError(STATUS_CODE.BAD_REQUEST, MESSAGES.REQUIRED_FIELDS);
}

const existingUser = await User.findOne({
  $or:[
    {email:email.toLowerCase()},
    {username:username.toLowerCase()}
  ]
})

if(existingUser){
  if(existingUser.email === email.toLowerCase()){
    throw new ApiError(STATUS_CODE.CONFLICT, MESSAGES.EMAIL_ALREADY_EXISTS);
  }

  if(existingUser.username === username.toLowerCase()){
    throw new ApiError(STATUS_CODE.CONFLICT, MESSAGES.USERNAME_ALREADY_EXISTS);
  }
}

  // const avatarLocalPath = 
// const profileImageLocalPath = req.files?.profileImage[0]?.path;

//   console.log("profileImageLocalPath",profileImageLocalPath)

//   const profileImage = profileImageLocalPath ? await uploadOnCloudinary(profileImageLocalPath) : null;

//   console.log("profileImage",profileImage)


  const user = await User.create ({
    fullName:fullName,
    email:email.toLowerCase(),
    username:username.toLowerCase(),
    password:password,
    // profileImage:profileImage ?? null
  })
  
  const sanitarizedUser = await User.findById(user._id).select("-password -refreshToken").lean();

  
  return res.status(STATUS_CODE.CREATED).json(
    new ApiResponse(
      STATUS_CODE.OK,
      {user: sanitarizedUser},
      MESSAGES.USER_REGISTERED_SUCCESSFULLY
    )
  )
})

const loginUser = asyncHandler(async (req, res) => {
  const { email,username, password } = req.body;

  if ((!email && !username)|| !password) {
    throw new ApiError(STATUS_CODE.BAD_REQUEST, MESSAGES.REQUIRED_FIELDS);
  }

  // ✅ find user by email or username
  // Use $or to check both email and username, but filter out null entries
const user = await User.findOne({
  $or: [
    email ? { email: email.toLowerCase() } : null,
    username ? { username: username.toLowerCase() } : null
  ].filter(Boolean)  // ✅ remove null entries
}).select("+password +refreshToken");

  if (!user) {
    throw new ApiError(STATUS_CODE.UNAUTHORIZED, MESSAGES.INVALID_USER_CREDENTIALS);
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    throw new ApiError(STATUS_CODE.UNAUTHORIZED, MESSAGES.INVALID_USER_CREDENTIALS);
  }

  const options={
    secure: true,
    httpOnly: true,
    sameSite: "Strict", // ✅ optional, improves CSRF protection
  }

  // ✅ set refresh token in cookies
  // ✅ clear previous refresh token if exists
  if (user.refreshToken || user.accessToken) {
    user.refreshToken = null; // clear previous refresh token
    await user.save({ validateBeforeSave: false }); // save without validation
  }   
  


  // ✅ generate new tokens
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);


user.refreshToken = refreshToken;
user.accessToken = accessToken; // ✅ save access token if needed
await user.save({ validateBeforeSave: false });
res.cookie("refreshToken", refreshToken, options);
res.cookie("accessToken", accessToken, options);



const loggedInUser = await User.findById(user._id).select("-password -refreshToken").lean();


  return res.status(STATUS_CODE.OK).json(
    new ApiResponse(
      STATUS_CODE.OK,
      { user: loggedInUser, accessToken, refreshToken },
      MESSAGES.LOGIN_SUCCESSFUL
    )
  );
});

const updateProfile = asyncHandler(async (req, res) => {
  const { fullName, email } = req.body;

  console.log("req.body",req.body);
  // Validate required fields
  if (!fullName || !email) {
    throw new ApiError(STATUS_CODE.BAD_REQUEST, MESSAGES.REQUIRED_FIELDS);
  }
  // Fetch the user
  const user = await User.findById(req.user._id).select("-password -refreshToken");
 
  if (!user) {
    throw new ApiError(STATUS_CODE.NOT_FOUND, MESSAGES.USER_NOT_FOUND);
  }
  // local path of the profile image
  // const profileImageLocalPath = req.files?.profileImage[0]?.path;

  // if(profileImageLocalPath){
  // if (user.profileImage?.publicId) {
  //     await deleteFromCloudinary(user.profileImage.publicId);
  // }

  //   const uploadedProfileImage = await uploadOnCloudinary(profileImageLocalPath);
  //   console.log("uploadedProfileImage",uploadedProfileImage)
  //   // uploadedProfileImage.

  //     if(uploadedProfileImage) {
  //       user.profileImage={
  //         url: uploadedProfileImage.url,
  //         publicId: uploadedProfileImage.publicId
  //       }
       
  //     }
  // }
  // Update user data
  user.fullName = fullName.trim();
  user.email = email.toLowerCase().trim();

  // Save the updated user
  await user.save();

  // Send response
  return res.status(STATUS_CODE.OK).json(
    new ApiResponse(
      STATUS_CODE.OK,
      { user },
      MESSAGES.PROFILE_UPDATED_SUCCESSFULLY
    )
  );
});

const updatePassword = asyncHandler(async(req,res)=>{

  const {currentPassword, newpassword, confirmPassword} = req.body;

  if(!currentPassword || !newpassword || !confirmPassword){
    throw new ApiError(STATUS_CODE.BAD_REQUEST, MESSAGES.REQUIRED_FIELDS);
  }

  if(!(newpassword === confirmPassword)){
    throw new ApiError(STATUS_CODE.BAD_REQUEST, MESSAGES.PASSWORDS_DO_NOT_MATCH);
  }

  const user = await User.findById(req.user._id).select("+password");
  
  if(!user){
    throw new ApiError(STATUS_CODE.NOT_FOUND, MESSAGES.USER_NOT_FOUND);
  }

  const isPasswordCorrect = await user.isPasswordCorrect(currentPassword);
  if(!isPasswordCorrect){
    throw new ApiError(STATUS_CODE.UNAUTHORIZED, MESSAGES.INVALID_CURRENT_PASSWORD);
  }

  user.password = newpassword;
  await user.save();

  const sanitizedUser = await User.findById(user._id).select("-password -refreshToken");

  return res.status(STATUS_CODE.OK).json(
    new ApiResponse(
      STATUS_CODE.OK,
      {user: sanitizedUser},
      MESSAGES.PASSWORD_CHANGED_SUCCESSFULLY
    )
  )

})

const getCurrectUser = asyncHandler(async (req, res) => {
  // Fetch the user from the request
  const user = req.user;

  if (!user) {
    throw new ApiError(STATUS_CODE.NOT_FOUND, MESSAGES.USER_NOT_FOUND);
  }

  // Send response with user data
  return res.status(STATUS_CODE.OK).json(
    new ApiResponse(
      STATUS_CODE.OK,
      { user },
      MESSAGES.CURRENT_USER_FETCHED_SUCCESSFULLY
    )
  );
});


const logoutUser = asyncHandler(async( req,res )=>{

  const user = req.user;
  if(!user){
    throw new ApiError(STATUS_CODE.NOT_FOUND, MESSAGES.USER_NOT_FOUND);
  }

  const options = {
    httpOnly: true,
    secure: true,
  }

  // Clear refresh token and access token
  user.refreshToken = null;
  await user.save({ validateBeforeSave: false });

   res.clearCookie("refreshToken", options);
   res.clearCookie("accessToken", options);


  // Send response
  return res.status(STATUS_CODE.OK).json(
    new ApiResponse(
      STATUS_CODE.OK,
      { message: MESSAGES.LOGGED_OUT_SUCCESSFULLY },
      MESSAGES.LOGOUT_SUCCESSFUL
    )
  );

})

const refreshAccessToken = asyncHandler(async (req, res) => {
  // 1. Get refresh token from cookie or body
  const incomingRefreshToken =
    req.cookies?.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(STATUS_CODE.UNAUTHORIZED, MESSAGES.INVALID_REFRESH_TOKEN);
  }

  try {
    // 2. Verify refresh token
    const decoded = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    // 3. Find the user by decoded ID
    const user = await User.findById(decoded._id);

    if (!user || user.refreshToken !== incomingRefreshToken) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, MESSAGES.REFRESH_TOKEN_EXPIRED);
    }

    // 4. Generate new tokens
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // 5. Update refresh token in DB
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    // 6. Send new tokens in response or set cookies
    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    };

    res.cookie("accessToken", accessToken, options);
    res.cookie("refreshToken", refreshToken, options);

    return res.status(STATUS_CODE.OK).json(
      new ApiResponse(
        STATUS_CODE.OK,
        { accessToken, refreshToken },
        MESSAGES.REFRESH_TOKEN_SUCCESSFUL
      )
    );
  } catch (err) {
    throw new ApiError(STATUS_CODE.UNAUTHORIZED, MESSAGES.INVALID_REFRESH_TOKEN);
  }
});

export {registerUser,loginUser,updateProfile,updatePassword,getCurrectUser,logoutUser,refreshAccessToken}

