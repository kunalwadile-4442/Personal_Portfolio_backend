import { Router } from "express";
import {jwtVerify} from "../middlewares/auth.middleware.js";
import { createProjects, deleteProjects, getProjects, updateProjects } from "../controllers/project.controller.js";
import {upload} from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/create-project").post(jwtVerify,upload.any(), createProjects);
router.route("/get-project").get(jwtVerify, getProjects);
router.route("/update-project").put(jwtVerify, upload.any(), updateProjects);
router.route("/delete-project").delete(jwtVerify, deleteProjects);

export default router;