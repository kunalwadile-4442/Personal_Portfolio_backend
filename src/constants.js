
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
  ABOUT_AND_EDUCATION_CREATED_SUCCESSFULLY:
    "About and education created successfully",
    USER_ALREADY_HAS_ABOUT: "User already has an about section",
    ABOUT_AND_EDUCATION_FETCHED_SUCCESSFULLY:
    "About and education fetched successfully",
    ABOUT_AND_EDUCATION_NOT_FOUND: "About and education not found",
    ABOUT_AND_EDUCATION_UPDATED_SUCCESSFULLY:
    "About and education updated successfully",
    ABOUT_AND_EDUCATION_DELETED_SUCCESSFULLY:
    "About and education deleted successfully",
    TECH_STACK_CREATED_SUCCESSFULLY: "Tech stack created successfully",
    TECH_STACK_UPDATED_SUCCESSFULLY: "Tech stack updated successfully",
    TECH_STACK_FETCHED_SUCCESSFULLY: "Tech stack fetched successfully",
    TECH_STACK_DELETED_SUCCESSFULLY: "Tech stack deleted successfully",
    PROJECT_CREATED_SUCCESSFULLY: "Project created successfully",
    PROJECT_UPDATED_SUCCESSFULLY: "Project updated successfully",
    PROJECTS_NOT_FOUND: "Projects not found",
    PROJECT_DELETED_SUCCESSFULLY: "Project deleted successfully",
    PROJECTS_FETCHED_SUCCESSFULLY: "Projects fetched successfully",
    PROJECTS_DELETED_SUCCESSFULLY: "Projects deleted successfully",
    USER_ALREADY_HAS_PROJECT: "User already has a project",
    USER_ALREADY_HAS_EXPERIANCE: "User already has an experience section",
    EXPERIANCE_CREATED_SUCCESSFULLY: "Experience created successfully",
    INVALID_JSON: "Invalid JSON in experianceCard",
    EXPERIANCE_FETCHED_SUCCESSFULLY: "Experience fetched successfully",
    EXPERIANCE_UPDATED_SUCCESSFULLY: "Experience updated successfully",
    EXPERIANCE_NOT_FOUND: "Experience not found",
    EXPERIANCE_DELETED_SUCCESSFULLY: "Experience deleted successfully",
    EXPERIANCE_CARD_DELETED_SUCCESSFULLY: "Experience card deleted successfully",
    MAIL_SEND_SUCCESFULLY: "Email sent successfully",
    USER_ID_REQUIRED: "User ID is required",
    RESUME_NOT_FOUND: "Resume not found",
    RESUME_DOWNLOAD_FAILED: "Failed to download resume",
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



