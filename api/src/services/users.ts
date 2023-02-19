import User, { UserDocument } from "../models/User";

const createUser = async (user: UserDocument): Promise<UserDocument> => {
  return user.save();
};

const getUserById = async (id: string): Promise<UserDocument | null> => {
  return User.findById(id);
};

export default { createUser, getUserById };
