import { NextFunction, Response, Request } from "express";
import { Document } from "../models/document";
import extractTextFromFile from "../utils/extractText";
import { CustomError } from "../utils/error";

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
      const error = new CustomError({
        message: "missing file name",
        code: 400,
      });
      throw error;
    }
    if (!userId) {
      const error = new CustomError({
        message: "user details missing",
        code: 403,
      });
      throw error;
    }
    const docPath = req.file?.path;
    if (!docPath) {
      const error = new CustomError({
        message: "could not save the document",
        code: 500,
      });
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
      const error = new CustomError({ message: "Failed to save", code: 500 });
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
      throw new CustomError({ message: "User details missing", code: 403 });
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
      throw new CustomError({ message: "Document not found", code: 404 });
    }
    const deleteSuccessful = await Document.archiveDocument(id);
    if (!deleteSuccessful) {
      throw new CustomError({ message: "could not archive", code: 500 });
    }
    res.status(200).json({ message: "delete successful" });
  } catch (error) {
    next(error);
  }
};
