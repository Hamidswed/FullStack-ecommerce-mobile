import { Alert, IconButton, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import "./loginForm.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { userActions } from "../../../redux/slices/user";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { url } from "../../../App";

export type InitialType = {
  email: string;
  password: string;
};
const LogInForm = () => {
  const [open, setOpen] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const showPassHandler = () => {
    setShowPass(!showPass);
  };
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const initialValues: InitialType = {
    email: "",
    password: "",
  };

  const SinginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required("Please Enter your email"),
    password: Yup.string().required("Please Enter your password"),
  });
  const navigate = useNavigate();

  const submitHandler = (values: InitialType) => {
    axios
      .post(`${url}/users/login`, values)
      .then((res) => res.data)
      .then((data) => {
        console.log(data, "data");
        if (data.message === "invalid" || data.message === "wrong password!") {
          handleClick();
          return;
        } else {
          dispatch(userActions.getUser(data.userData));
          const token = data.token;
          localStorage.setItem("token", token);
          token && navigate("/user");
        }
       
      });
  };

  return (
    <div className="form-container">
      <Formik
        initialValues={initialValues}
        onSubmit={submitHandler}
        validationSchema={SinginSchema}
      >
        {({ values, errors, touched, handleChange }) => {
          return (
            <Form className="form">
              <div>
                <TextField
                  required
                  name="email"
                  label="Email"
                  onChange={handleChange}
                  value={values.email}
                />
                {errors.email && touched.email ? <p>{errors.email}</p> : null}
              </div>
              <div>
                <TextField
                  required
                  name="password"
                  label="Password"
                  onChange={handleChange}
                  value={values.password}
                  type={showPass ? "text" : "password"}
                />
                <span className="visibility">
                  {showPass ? (
                    <IconButton onClick={showPassHandler}>
                      <VisibilityOff />
                    </IconButton>
                  ) : (
                    <IconButton onClick={showPassHandler}>
                      <Visibility />
                    </IconButton>
                  )}
                </span>
                {errors.password && touched.password ? (
                  <p>{errors.password}</p>
                ) : null}
              </div>
              <Button variant="contained" type="submit">
                log in
              </Button>
              <Button variant="outlined" onClick={() => navigate("/register")}>
                register
              </Button>
            </Form>
          );
        }}
      </Formik>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Invalid email or password!
        </Alert>
      </Snackbar>
    </div>
  );
};
export default LogInForm;
