import {Router} from "express";
import { submitContactForm } from "../controllers/contact.controller.js";


const router = Router();
router.route("/contact").post(submitContactForm);
export default router;