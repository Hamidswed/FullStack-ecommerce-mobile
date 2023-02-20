import User, { UserDocument } from "../models/User";

const createUser = async (user: UserDocument): Promise<UserDocument> => {
  return user.save();
};

const getUserById = async (id: string): Promise<UserDocument | null> => {
  return User.findById(id);
};

const findUserByEmailPassword = async (email: string, password:string): Promise<UserDocument | null> => {
  return User.findOne({ email: email, password:password });
};

export default { createUser, getUserById, findUserByEmailPassword };
