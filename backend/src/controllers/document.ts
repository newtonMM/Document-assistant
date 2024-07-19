import { NextFunction, Response, Request } from "express";
import { Document } from "../models/document";
import extractTextFromFile from "../utils/extractText";

export const uploadDocument = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    /* 
     @desc get the user id from the session object so that we can associate documents with the users, 
     we also get the path where the document has been uploaded and pass that incase we need to retrieve the document 
     */
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
    /* 
    @desc we extract the text from the file ans store it as the content, this is because we can prompt the AI using text
     */
    const text = await extractTextFromFile(docPath);
    const p_id = 0;
    const status = "active";
    const document = new Document(userId, status, text, docPath, p_id, name);
    const documentId = (await document.save()) as number;

    if (!documentId) {
      const error = new Error("an error ocurred");
      throw error;
    }
    res
      .status(201)
      .json({ message: "document saved successfully", id: documentId });
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
    /* 
    @desc get all all documents belonging to a user 
    */
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
