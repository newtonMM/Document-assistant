import { NextFunction, Response, Request } from "express";
import { Document } from "../models/document";
import extractTextFromFile from "../utils/extractText";

export const uploadDocument = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.session.userId;
    const name = req.file?.filename;

    if (!name) {
      const error = new Error("missing file name");
      throw error;
    }
    if (!userId) {
      const error = new Error("please login");
      throw error;
    }
    const docPath = req.file?.path;
    if (!docPath) {
      const error = new Error("invalid file path");
      throw error;
    }
    const text = await extractTextFromFile(docPath);
    const p_id = 0;
    const status = "active";
    const document = new Document(userId, status, text, docPath, p_id, name);
    const documentIsSaved = await document.save();
    if (!documentIsSaved) {
      const error = new Error("an error ocurred");
      throw error;
    }
    res.status(200).json({ message: "document saved successfully" });
  } catch (error) {
    next(error);
  }
};

export const getAllUserDocuments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.session.userId;
    if (!userId) {
      throw new Error("user is not logged ");
    }
    const documents = await Document.findUserDocuments(userId);
    res.status(200).json({ documents });
  } catch (error) {
    next(error);
  }
};

export const deleteDocuments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new Error("attach an id");
    }
    const deleteSuccessful = await Document.deleteDocuments(id);
    if (!deleteSuccessful) {
      throw new Error("delete failed");
    }
    res.status(200).json({ message: "delete successful" });
  } catch (error) {
    next(error);
  }
};
