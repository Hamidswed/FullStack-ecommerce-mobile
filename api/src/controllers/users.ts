import { Request, Response } from "express";
import User from "../models/User";
import UserServices from "../services/users";

export const createUserController = async (req: Request, res: Response) => {
  try {
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    });
    const user =await UserServices.createUser(newUser)
    res.json(user)
  } catch (error) {
    console.log(error);
  }
};
