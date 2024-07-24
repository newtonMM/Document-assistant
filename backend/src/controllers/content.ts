import { NextFunction, Response, Request } from "express";
import { Content } from "../models/content";
import { processDocument } from "../utils/processDocument";
import showdown from "showdown";
import { CustomError } from "../utils/error";

export const findContent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { contId } = req.params;

  try {
    const cont = await Content.findContent(parseInt(contId));
    if (!cont) {
      const error = new CustomError({
        message: "Entry does not exist",
        code: 404,
      });
      throw error;
    }
    res.status(200).json({ message: "success", content: cont });
  } catch (error) {
    next(error);
  }
};

export const saveContent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { text, document_id } = req.body;
  const { contId } = req.params;

  try {
    const updatedContent = await Content.createContent(
      text,
      parseInt(contId),
      document_id
    );
    if (!updatedContent) {
      const error = new CustomError({
        message: "Failed to save this version",
        code: 424,
      });
      throw error;
    }
    res.status(201).json({ message: "content saved successfully" });
  } catch (error) {
    next(error);
  }
};

export const deleteContent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { contId } = req.params;

  try {
    const deletedSuccessfully = await Content.deleteContent(parseInt(contId));
    if (!deletedSuccessfully) {
      const error = new CustomError({ message: "failed", code: 424 });
      throw error;
    }
    res.status(200).json({ message: "delete successful" });
  } catch (error) {
    next(error);
  }
};

export const processContent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { content } = req.body;

    if (!content) {
      throw new CustomError({ message: "content is empty", code: 400 });
    }
    const processedContent = await processDocument(content);
    if (!processedContent) {
      throw new CustomError({ message: "No output", code: 424 });
    }

    const converter = new showdown.Converter();
    const contentInHtml = converter.makeHtml(processedContent);
    if (!contentInHtml) {
      const error = new CustomError({
        message: "Could not convert to a read able format",
        code: 424,
      });
      throw error;
    }
    res.status(200).json(contentInHtml);
  } catch (error) {
    next(error);
  }
};

export const fetchOriginalDocument = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { docId } = req.params;
    if (!docId) {
      throw new CustomError({ message: "Failed", code: 400 });
    }
    const document = await Content.fetchOriginalContent(parseInt(docId));
    res.status(200).json(document);
  } catch (error) {
    next(error);
  }
};
