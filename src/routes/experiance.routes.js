import { Router } from "express";
import { jwtVerify } from "../middlewares/auth.middleware.js";
import {  createExperiance,
        getExperiance,
        updateExperiance,
        deleteSingleExperianceCard,
        deleteExperiance } from "../controllers/experiance.controller.js";
const router = Router();


router.route("/create-experiance").post(jwtVerify, createExperiance);

router.route("/get-experiance/:userId").get(getExperiance);

router.route("/update-experiance").put(jwtVerify, updateExperiance);

router.route("/delete-experiance").delete(jwtVerify, deleteExperiance);

router.route("/delete-experiance").delete(jwtVerify, deleteSingleExperianceCard);
export default router;