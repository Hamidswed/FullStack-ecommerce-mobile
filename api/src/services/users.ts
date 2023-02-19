import { UserDocument } from "../models/User";

const createUser = async (user: UserDocument): Promise<UserDocument> => {
  return user.save();
};

export default {createUser}
