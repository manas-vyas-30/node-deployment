import { RequestHandler } from "express";
import fileService from "../services/file.service";

const createFile: RequestHandler = async (req, res, next) => {
  try {
    const data = await fileService.createFile(req.body.file);
    res.status(200).json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const findFiles: RequestHandler = async (req, res, next) => {
  try {
    const data = await fileService.findFiles();
    res.status(200).json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const fileController = {
  createFile,
  findFiles,
};

export default fileController;
