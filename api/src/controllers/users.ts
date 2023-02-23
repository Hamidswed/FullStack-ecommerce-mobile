import { Request, Response } from "express";
import User from "../models/User";
import UserServices from "../services/users";
import generateToken from "../utils/generateToken";
import bcrypt from "bcrypt";

export const createUserController = async (req: Request, res: Response) => {
  try {
    //get password from the body
    const { firstName, lastName, email, password } = req.body;
    //hash password
    const saltRounds = await bcrypt.genSalt(10); //complexity of the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log(hashedPassword);
    const newUser = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
    });
    const user = await UserServices.createUser(newUser);
    if (user !== "available") res.json(user) && res.status(200);
    else res.json({ message: "available" });
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

export const logInWithPassword = async (req: Request, res: Response) => {
  try {
    // get user information from DB and make token (with jsonwebtoken packages)
    const userData = await UserServices.findUserByEmailPassword(req.body.email);
    if (!userData) {
      res.json({
        message: "invalid",
      });
      return;
    }
    //compare password form login form and hashed password from DB
    const passwordFromForm = req.body.password;
    const passwordFromDB = userData.password;
    const match = await bcrypt.compare(passwordFromForm, passwordFromDB);
    if (!match) {
      res.json({ message: "wrong password!" });
      return;
    }

    const token = generateToken(userData._id, req.body.email);
    res.json({ userData, token });
  } catch (error) {
    console.log(error);
  }
};

export const updateUserController = async (req: Request, res: Response) => {
  try {
    const updatedUser = await UserServices.updateUser(req.params.id, req.body);
    res.json(updatedUser);
  } catch (error) {
    console.log(error);
  }
};
