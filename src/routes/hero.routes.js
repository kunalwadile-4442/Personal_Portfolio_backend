import { upload } from "../middlewares/multer.middleware.js";
import { Router } from "express"; 
import { createHeroSection, deleteHeroSection, getHeroSection, updateHeroSection } from "../controllers/heroSection.controller.js";
import { jwtVerify } from "../middlewares/auth.middleware.js";


const router = Router();

router.route("/create-hero").post(
    jwtVerify,
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "resumeLink", maxCount: 1 },
  ]),
  createHeroSection
);
router.route("/get-hero/:userId").get(getHeroSection);

router.route("/delete-hero").delete(jwtVerify, deleteHeroSection);

router.route("/update-hero").patch(jwtVerify, upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "resumeLink", maxCount: 1 },
  ]), updateHeroSection);
// router
//   .route("/")
//   .post(jwtVerify, upload.fields([{ name: "avatar", maxCount: 1 },{ name: "avresumeLinkatar", maxCount: 1 }]), createHeroSection)
//   .get(jwtVerify, getHeroSection)
//   .patch(jwtVerify, upload.fields([{ name: "avatar", maxCount: 1 }]), updateHeroSection)
//   .delete(jwtVerify, deleteHeroSection);


  export default router;
