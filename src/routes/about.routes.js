import { createAboutEdu, deleteAboutEdu, getAboutEdu, updateAboutEdu } from "../controllers/aboutEdu.controller.js";
import { jwtVerify } from "../middlewares/auth.middleware.js";
import {Router} from "express";



const router  = Router();


router.route("/about-create").post(jwtVerify, createAboutEdu);
router.route("/about-get").get( getAboutEdu);
router.route("/about-update").patch(jwtVerify, updateAboutEdu);
router.route("/about-delete").delete(jwtVerify, deleteAboutEdu);










export default router;
