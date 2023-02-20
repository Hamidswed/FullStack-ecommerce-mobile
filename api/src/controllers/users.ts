import { Request, Response } from "express";
import User from "../models/User";
import UserServices from "../services/users";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

export const createUserController = async (req: Request, res: Response) => {
  try {
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    });
    const user = await UserServices.createUser(newUser);
    res.json(user);
  } catch (error) {
    console.log(error);
  }
};

export const getUserByIdController = async (req: Request, res: Response) => {
  try {
    const foundUser = await UserServices.getUserById(req.params.id);
    res.json(foundUser);
  } catch (error) {
    console.log(error);
  }
};

//get JWT_SECRET
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET as string;
export const logInWithPassword = async (req: Request, res: Response) => {
  try {
    // get user information from DB and make token (with jsonwebtoken packages)
    const userData = await UserServices.findUserByEmailPassword(req.body.email, req.body.password);
    if (!userData) {
      res.json({ message: `${req.body.email} is invalid or password is wrong` });
      return;
    }

    const token = jwt.sign(
      { email: req.body.email, _id: userData._id },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ userData, token });
  } catch (error) {
    console.log(error);
  }
};
