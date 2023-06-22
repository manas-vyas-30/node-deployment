import File, { IFile } from "../models/File";

const findFiles = () => File.find();

const createFile = (file: IFile) => {
  const newFile = new File({
    file,
  });
  return newFile.save();
};

const fileService = {
  findFiles,
  createFile,
};

export default fileService;
