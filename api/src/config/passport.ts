// jwt passport here
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import dotenv from "dotenv";
import UserServices from "../services/users";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
//two parameters in JwtStrategy: secretOrkey and callback
export const jwtStrategy = new JwtStrategy(
  {
    secretOrKey: JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  //payload (body): all information that you send it from frontend side (new email,...)
  //done: shows that the authentication is done and you can move to next step
  async (payload, done) => {
    const foundUser = await UserServices.findUserByEmailPassword(payload.email);
    if (!foundUser) {
      return "no user!";
    }
    done(null, foundUser);
  }
);
