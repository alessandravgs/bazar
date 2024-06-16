import { Router } from "express";
import ProductController from "../controller/ProductController.js";
import { verifyJwt } from "../helpers/managerJWT.js";
import imageUpload from "../helpers/imageUpload.js";

const router = Router();

router.post("/", verifyJwt, imageUpload.array("images"), ProductController.createProduct);
router.get("/", ProductController.index);
router.get("/showUserProducts", verifyJwt, ProductController.showUserProducts);
router.get("/showRecieverProducts", verifyJwt, ProductController.showRecieverProducts);
router.get("/:id", ProductController.show);
router.put("/:id", verifyJwt, imageUpload.array("images"), ProductController.updateProduct);
router.delete("/:id", verifyJwt, ProductController.deleteProduct);
router.patch("/schedule/:id", verifyJwt, ProductController.schedule);
router.patch("/concludeDonation/:id", verifyJwt, ProductController.concludeDonation);


export default router;