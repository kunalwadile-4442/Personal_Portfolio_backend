
export const MESSAGES = {
  // Auth & Credentials
  LOGIN_SUCCESSFUL: "User login successful",
  USER_REGISTERED_SUCCESSFULLY: "User registered successfully",
  LOGOUT_SUCCESSFUL: "User logout successful",
  INVALID_USER_CREDENTIALS: "Invalid email or password",
  UNAUTHORIZED_ACCESS: "Unauthorized access",
  INVALID_ACCESS_TOKEN: "Invalid access token",
  TOKEN_GENRATION_FAILED: "Failed to generate token",
  REFRESH_TOKEN_SUCCESSFUL: "Refresh token generated successfully",
  REFRESH_TOKEN_EXPIRED: "Refresh token has expired",
  INVALID_REFRESH_TOKEN: "Invalid refresh token",

  // Validation & Required Fields
  REQUIRED_FIELDS: "All fields are required",
  USERNAME_PASSWORD_REQUIRED: "Username and password are required",
  PASSWORD_REQUIRED: "Password is required",
  USERNAME_NOT_PROVIDED: "Username is required",
  EMAIL_NOT_PROVIDED: "Email is required",

  // Password Validation
  PASSWORD_MIN: "Password must be at least 6 characters long",
  PASSWORD_MAX: "Password must be at most 20 characters long",
  PASSWORDS_DO_NOT_MATCH: "New password and confirm password do not match",
  INVALID_CURRENT_PASSWORD: "Current password is incorrect",
  PASSWORD_CHANGED_SUCCESSFULLY: "Password changed successfully",
  OLD_NEW_PASSWORD_REQUIRED: "Current and new passwords are required",

  // Uniqueness & Conflicts
  USERNAME_ALREADY_EXISTS: "Username already exists",
  EMAIL_ALREADY_EXISTS: "Email already exists",

  // Fetch/Update
  CURRENT_USER_FETCHED_SUCCESSFULLY: "User profile fetched successfully",
  CURRENT_USER_UPDATED_SUCCESSFULLY: "User profile updated successfully",
  USER_NOT_FOUND: "User not found",

  // Errors
  USER_REGISTRATION_FAILED: "Something went wrong during registration",
  REQUEST_BODY_REQUIRED: "Request body is required",

  PROFILE_UPDATED_SUCCESSFULLY: "Profile updated successfully",
  AVATAR_REQUIRED: "Avatar is required",
  USER_ALREADY_HAS_HERO_SECTION: "User already has a hero section",
  AVATAR_UPLOAD_FAILED: "Avatar upload failed",

  HERO_SECTION_CREATED_SUCCESSFULLY: "Hero section created successfully",
  HERO_SECTION_NOT_FOUND: "Hero section not found",
  HERO_SECTION_FETCHED_SUCCESSFULLY: "Hero section fetched successfully",
  HERO_SECTION_UPDATED_SUCCESSFULLY: "Hero section updated successfully",

  HERO_SECTION_DELETED_SUCCESSFULLY: "Hero section deleted successfully",
  RESUME_REQUIRED: "Resume is required",
  RESUME_UPLOAD_FAILED: "Resume upload failed",
};


export const STATUS_CODE = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,

  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,

  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
};



