import { Alert, Button, TextField } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "../loginForm/loginForm.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserType } from "../../../types/userType";
import { url } from "../../../App";
import SuccessModal from "./SuccessModal";
import Divider from "@mui/material/Divider";

const RegisterForm = () => {
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [userName, setUserName] = useState("");

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

  const initialValues: UserType = {
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const SingUpSchema = Yup.object().shape({
    firstName: Yup.string(),
    lastName: Yup.string(),
    email: Yup.string()
      .email("Invalid email")
      .required("Please Enter your email"),
    password: Yup.string()
      .min(7, "It should be more than 6 character")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase and One Number"
      )
      .required("Please Enter your password"),
  });

  const submitHandler = (values: UserType) => {
    axios.post(`${url}/users`, values).then((res) => {
      console.log(res.data, "data");
      if (res.data.message === "available") {
        handleClick();
      } else if (res.status === 200) {
        setOpenModal(true);
        setUserName(values.firstName);
      }
    });
  };
  const navigate = useNavigate();
  return (
    <div className="form-container">
      <Formik
        initialValues={initialValues}
        onSubmit={submitHandler}
        validationSchema={SingUpSchema}
      >
        {({ values, errors, touched, handleChange }) => {
          return (
            <Form className="form">
              <div>
                <TextField
                  required
                  name="firstName"
                  label="FirstName"
                  onChange={handleChange}
                  value={values.firstName}
                />
              </div>
              <div>
                <TextField
                  required
                  name="lastName"
                  label="LastName"
                  onChange={handleChange}
                  value={values.lastName}
                />
              </div>
              <div>
                <TextField
                  required
                  name="email"
                  label="Email"
                  onChange={handleChange}
                  value={values.email}
                />
                {errors.email && touched.email && <p>{errors.email}</p>}
              </div>
              <div>
                <TextField
                  required
                  name="password"
                  label="Password"
                  onChange={handleChange}
                  value={values.password}
                  type="password"
                />
                {errors.password && touched.password && (
                  <p>{errors.password}</p>
                )}
              </div>

              <Button variant="contained" type="submit">
                Register
              </Button>
              <Divider id="divider">
                <span>OR</span>
              </Divider>
              <Button variant="outlined" onClick={() => navigate("/login")}>
                Log in
              </Button>
            </Form>
          );
        }}
      </Formik>
      <SuccessModal open={openModal} setOpen={setOpenModal} name={userName} />
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          The email is already registerd!!
        </Alert>
      </Snackbar>
    </div>
  );
};
export default RegisterForm;
