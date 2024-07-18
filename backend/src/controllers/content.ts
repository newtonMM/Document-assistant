import { NextFunction, Response, Request } from "express";
import { Content } from "../models/content";
import { processDocument } from "../utils/processDocument";
import showdown from "showdown";

export const findContent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { contId } = req.params;

  try {
    const cont = await Content.findContent(parseInt(contId));
    if (!cont) {
      const error = new Error("an error ocurred");
      throw error;
    }
    res.status(200).json({ message: "success", content: cont });
  } catch (error) {
    next(error);
  }
};

export const updateContent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { content, document_id } = req.body;
  const { contId } = req.params;

  try {
    const updatedContent = await Content.createContent(
      content,
      parseInt(contId),
      document_id
    );
    if (!updatedContent) {
      const error = new Error("an error ocurred");
      throw error;
    }
    res.status(200).json({ message: "content updated successfully" });
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
      const error = new Error("an error ocurred");
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
    const { contId } = req.params;
    const { content, document_id } = req.body;

    if (!content) {
      throw new Error("content is empty");
    }
    const processedContent = await processDocument(content);
    if (!processedContent) {
      throw new Error("content is empty");
    }
    console.log("this is", processedContent);
    const converter = new showdown.Converter();
    const contentInHtml = converter.makeHtml(processedContent);
    if (!contentInHtml) {
      const error = new Error("an error ocurred");
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
      throw new Error(" ");
    }
    const document = await Content.fetchOriginalContent(parseInt(docId));
    res.status(200).json(document);
  } catch (error) {
    next(error);
  }
};
