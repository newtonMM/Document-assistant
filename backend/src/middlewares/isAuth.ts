import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models/user";

/* 
@desc middleware to always check if a logged in to access protected routes

*/
const isAuth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.session.token;
  if (!token) {
    const error = new Error("Not authorized");
    throw error;
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY!) as JwtPayload;
  } catch (error) {
    throw error;
  }
  if (!decodedToken) {
    const error = new Error("Not authenticated");
    throw error;
  }
  next();
};

export default isAuth;
