import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  createTechStack,
  updateTechStack,
  deleteTechStack,
  getTechStack,
} from "../controllers/techstack.controller.js";
import { jwtVerify } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/create-stack").post(
  jwtVerify,
  upload.any(),
  createTechStack
);

router.route("/update-stack").put(
  jwtVerify,
  upload.any(), // dynamically handles any stack[n][icon]
  updateTechStack
);
router.route("/get-stacks").get(jwtVerify, getTechStack);
router.route("/delete-stack").delete(jwtVerify, deleteTechStack);

export default router;