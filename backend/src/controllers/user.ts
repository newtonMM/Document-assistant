import { NextFunction, Response, Request } from "express";
import { User } from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserProps } from "../@types/User/Index";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, username }: UserProps = req.body;
    console.log("this is the payload", req.body);
    const usernameTaken = await User.findUserByUsername(username);
    if (usernameTaken) {
      console.log(usernameTaken);
      const error = new Error("username already exist");
      throw error;
    }
    const emailExist = await User.findUserByEmail(email);
    if (emailExist) {
      const error = new Error("email already exist");
      throw error;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPw = await bcrypt.hash(password, salt);
    const user = new User(email, hashedPw, username);
    const userSaved = await user.save();
    if (!userSaved) {
      const error = new Error("an error ocurred");
      throw error;
    }
    res.status(200).json({ message: "user saved successfully" });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    const user = (await User.findUserByEmail(email)) as UserProps;
    if (!user) {
      const error = new Error("email not found");
      throw error;
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error("you have entered the wrong password");
      throw error;
    }
    const token = jwt.sign(
      {
        userId: user.id,
      },
      process.env.JWT_SECRET_KEY!
    );
    if (!token) {
      const error = new Error("could not generate token");
      throw error;
    }
    req.session.regenerate(async (err) => {
      if (err) {
        res.status(500);
        throw new Error("Session regeneration failed.");
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
