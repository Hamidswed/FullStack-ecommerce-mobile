import { AppDispatch } from "../store";
import axios from "axios";
import { url } from "../../App";
import { InitialType } from "../../components/users/loginForm/LogInForm";
import { userActions } from "./../slices/user";

export function Login(values: InitialType) {
  return async (dispatch: AppDispatch) => {
    try {
      const { data } = await axios.post(`${url}/users/login`, values);
      dispatch(userActions.getUser(data));
    } catch (error) {
      console.log(error);
    }
  };
}
