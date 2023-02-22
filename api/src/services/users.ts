import User, { UserDocument } from "../models/User";

const createUser = async (
  user: UserDocument
): Promise<UserDocument | string> => {
  const foundUser = await User.findOne({ email: user.email });
  if (!foundUser) return user.save();
  else return "available";
};

const getUserById = async (id: string): Promise<UserDocument | null> => {
  return User.findById(id);
};

const findUserByEmailPassword = async (
  email: string,
  password: string
): Promise<UserDocument | null> => {
  return User.findOne({ email: email, password: password });
};

const updateUser = async (
  id: string,
  update: Partial<UserDocument>
): Promise<UserDocument | null> => {
  return User.findByIdAndUpdate(id, update, { new: true });
};

export default { createUser, getUserById, findUserByEmailPassword, updateUser };
