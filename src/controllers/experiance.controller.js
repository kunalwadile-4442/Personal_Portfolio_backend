import { Experiance } from "../models/experiance.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";
import { STATUS_CODE, MESSAGES } from "../constants.js";
import { ApiError } from "../utils/apiError.js";

const createExperiance = asyncHandler(async (req, res) => {
  const { title, experianceCard } = req.body;

  if (!title || !experianceCard) {
    throw new ApiError(STATUS_CODE.BAD_REQUEST, MESSAGES.REQUIRED_FIELDS);
  }

  // Parse JSON string
  let parsedCards;
  try {
    parsedCards = experianceCard;
    if (!Array.isArray(parsedCards)) {
      throw new ApiError(STATUS_CODE.BAD_REQUEST, MESSAGES.INVALID_JSON);
    }
  } catch (err) {
    throw new ApiError(STATUS_CODE.BAD_REQUEST, MESSAGES.INVALID_JSON);
  }

  const existingExperiance = await Experiance.findOne({ user: req.user._id });
  if (existingExperiance) {
    throw new ApiError(STATUS_CODE.CONFLICT, MESSAGES.USER_ALREADY_HAS_EXPERIANCE);
  }

  const experianceCards = parsedCards.map((card) => ({
    position: card.position,
    companyName: card.companyName,
    duration: card.duration,
    description: card.description, // should be array of bullet strings
  }));

  const experiance = await Experiance.create({
    user: req.user._id,
    title,
    experianceCard: experianceCards,
  });

  return res.status(STATUS_CODE.CREATED).json(
    new ApiResponse(
      STATUS_CODE.CREATED,
      { experiance },
      MESSAGES.EXPERIANCE_CREATED_SUCCESSFULLY
    )
  );
});


const getExperiance = asyncHandler(async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    throw new ApiError(STATUS_CODE.BAD_REQUEST, "User ID is required");
  }

  const experiance = await Experiance.findOne({ user: userId });

  if (!experiance) {
    throw new ApiError(STATUS_CODE.NOT_FOUND, MESSAGES.EXPERIANCE_NOT_FOUND);
  }

  return res.status(STATUS_CODE.OK).json(
    new ApiResponse(
      STATUS_CODE.OK,
      { experiance },
      MESSAGES.EXPERIANCE_FETCHED_SUCCESSFULLY
    )
  );
});

const updateExperiance = asyncHandler(async (req, res) => {
  const { title, experianceCard } = req.body;

  if (!title || !experianceCard) {
    throw new ApiError(STATUS_CODE.BAD_REQUEST, MESSAGES.REQUIRED_FIELDS);
  }

  const experiance = await Experiance.findOne({ user: req.user._id });

  if (!experiance) {
    throw new ApiError(STATUS_CODE.NOT_FOUND, MESSAGES.EXPERIANCE_NOT_FOUND);
  }

  let experianceCards;
try {
  experianceCards = experianceCard;
} catch (err) {
  throw new ApiError(STATUS_CODE.BAD_REQUEST, MESSAGES.INVALID_JSON);
}

  const updatedCards = experianceCards.map((card) => ({
    position: card.position,
    companyName: card.companyName,
    duration: card.duration,
    description: card.description, // should be array of bullet strings
  }));

  const updatedExperiance = await Experiance.findOneAndUpdate(
    { user: req.user._id },
    { title, experianceCard: updatedCards },
    { new: true }
  );

  return res.status(STATUS_CODE.OK).json(
    new ApiResponse(
      STATUS_CODE.OK,
      { experiance: updatedExperiance },
      MESSAGES.EXPERIANCE_UPDATED_SUCCESSFULLY
    )
  );
});

const deleteExperiance = asyncHandler(async (req, res) => {
  const experiance = await Experiance.findOneAndDelete({ user: req.user._id });

  if (!experiance) {
    throw new ApiError(STATUS_CODE.NOT_FOUND, MESSAGES.EXPERIANCE_NOT_FOUND);
  }

  return res
    .status(STATUS_CODE.OK)
    .json(
      new ApiResponse(
        STATUS_CODE.OK,
        {  },
        MESSAGES.EXPERIANCE_DELETED_SUCCESSFULLY
      )
    );
});

const deleteSingleExperianceCard = asyncHandler(async (req, res) => {
  const { cardId } = req.body; // Getting ID from body (fine for POST/DELETE with body)

  if (!cardId) {
    throw new ApiError(STATUS_CODE.BAD_REQUEST, "Experience card ID is required");
  }

  const experiance = await Experiance.findOne({ user: req.user._id });
  if (!experiance) {
    throw new ApiError(STATUS_CODE.NOT_FOUND, MESSAGES.EXPERIANCE_NOT_FOUND);
  }

  const initialLength = experiance.experianceCard.length;

  // Filter out the card with the given ID
  experiance.experianceCard = experiance.experianceCard.filter(
    (card) => `${card._id}` !== `${cardId}` // Ensure both are strings
  );

  // If nothing was removed, ID was not found
  if (experiance.experianceCard.length === initialLength) {
    throw new ApiError(STATUS_CODE.NOT_FOUND, "Experience card not found");
  }

  await experiance.save();

  return res
    .status(STATUS_CODE.OK)
    .json(
      new ApiResponse(
        STATUS_CODE.OK,
        { experiance },
        MESSAGES.EXPERIANCE_CARD_DELETED_SUCCESSFULLY
      )
    );
});
    export {
        createExperiance,
        getExperiance,
        updateExperiance,
        deleteSingleExperianceCard,
        deleteExperiance
    }