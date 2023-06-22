import { Router } from "express";
import fileController from "../controller/file.controller";

const router = Router();

router.get("/", fileController.findFiles);
router.post("/upload", fileController.createFile);

export default router;
