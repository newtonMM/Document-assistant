import { NextFunction, Response, Request } from "express";
import { User } from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserProps } from "../@types/User/Index";
import { CustomError } from "../utils/error";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, username }: UserProps = req.body;
    const usernameTaken = await User.findUserByUsername(username);
    if (usernameTaken) {
      console.log(usernameTaken);
      const error = new CustomError({
        message: "Username already taken",
        code: 400,
      });
      throw error;
    }
    const emailExist = await User.findUserByEmail(email);
    if (emailExist) {
      const error = new CustomError({
        message: "Email already exist",
        code: 400,
      });
      throw error;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPw = await bcrypt.hash(password, salt);
    const user = new User(email, hashedPw, username);
    const userSaved = await user.save();
    if (!userSaved) {
      const error = new CustomError({ message: "Failed!", code: 500 });
      throw error;
    }
    res.status(201).json({ message: "user saved successfully" });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = (await User.findUserByEmail(email)) as UserProps;
    if (!user) {
      const error = new CustomError({
        message: "incorrect email or password",
        code: 400,
      });
      throw error;
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new CustomError({
        message: "Incorrect password",
        code: 403,
      });
      throw error;
    }
    const token = jwt.sign(
      {
        userId: user.id,
      },
      process.env.JWT_SECRET_KEY!
    );
    if (!token) {
      const error = new CustomError({
        message: "could not generate the user token",
        code: 500,
      });
      throw error;
    }
    /* 
    @desc after successful token generation we initialize a user session and cookie for authentication 
    */
    req.session.regenerate(async (err) => {
      if (err) {
        const error = new CustomError({
          message: "could not create the user session",
          code: 500,
        });
      }

      // Store user in session
      req.session.userId = user.id;
      req.session.token = token;
      req.session.startTime = new Date()
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
      req.session.lifetime = 6;
      const currentDateTime = new Date();
      currentDateTime.setTime(currentDateTime.getTime() + 6 * 60 * 60 * 1000);
      const endtime = currentDateTime
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");

      req.session.endTime = endtime;

      res.status(200).json({ message: "Login successful", token });
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.session.destroy((err) => {
    if (err) {
      const error = new CustomError({ message: "Log out failed", code: 500 });
    }
    res.status(204).json({ message: "See you later!" });
  });
};
