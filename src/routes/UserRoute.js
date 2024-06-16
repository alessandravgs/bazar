import { Router } from "express";
import UserController from "../controller/UserController.js";
import { verifyJwt } from "../helpers/managerJWT.js";
import imageUpload from "../helpers/imageUpload.js";

const router = Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login)
router.get("/currentUser", verifyJwt, UserController.getUser);
router.put("/currentUser", verifyJwt, imageUpload.single("image"), UserController.updateUser);

export default router;