import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { Button, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import axios from "axios";
import { userActions } from "../../../redux/slices/user";
import { useDispatch } from "react-redux";
import "./profile.css";

const Profile = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();

  const [isEdit, setIsEdit] = useState(false);

  type InitialType = {
    firstName: string;
    lastName: string;
  };
  const initialValues: InitialType = {
    firstName: "",
    lastName: "",
  };

  const SinginSchema = Yup.object().shape({
    firstName: Yup.string().required("Please Enter your first name"),
    lastName: Yup.string().required("Please Enter your last name"),
  });
  const submitHandler = (values: InitialType) => {
    setIsEdit(false);
    //get token from local storage
    const token = localStorage.getItem("token");
    axios
      .put(`http://localhost:8000/users/${user?._id}`, values, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res, "new information");
        dispatch(userActions.getUser(res.data));
      });
  };
  console.log(isEdit, "isEdit");
  return (
    <div className="information">
      <h3>UserInformation</h3>
      <Formik
        initialValues={initialValues}
        onSubmit={submitHandler}
        validationSchema={SinginSchema}
      >
        {({ values, errors, touched, handleChange }) => {
          return (
            <Form className="information">
              <div>
                {isEdit ? (
                  <div>
                    <TextField
                      required
                      name="firstName"
                      label={user?.firstName}
                      onChange={handleChange}
                    />
                    {errors.firstName && touched.firstName ? (
                      <p>{errors.firstName}</p>
                    ) : null}
                  </div>
                ) : (
                  <p>{user?.firstName}</p>
                )}
              </div>
              <div>
                {isEdit ? (
                  <div>
                    <TextField
                      required
                      name="lastName"
                      label={user?.lastName}
                      onChange={handleChange}
                    />
                    {errors.lastName && touched.lastName ? (
                      <p>{errors.lastName}</p>
                    ) : null}
                  </div>
                ) : (
                  <p>{user?.lastName}</p>
                )}
              </div>
              <div>
                {isEdit ? (
                  <div>
                    <TextField
                      disabled
                      name="email"
                      label={user?.email}
                      placeholder={user?.email}
                    />
                  </div>
                ) : (
                  <p>{user?.email}</p>
                )}
              </div>
              {isEdit ? (
                <div className="profile-btn">
                  <Button variant="outlined" onClick={() => setIsEdit(false)}>
                    cancle
                  </Button>
                  <Button variant="contained" type="submit">
                    Save
                  </Button>
                </div>
              ) : (
                <Button
                  variant="outlined"
                  onClick={() => setIsEdit(true)}
                  type="button"
                  sx={{marginTop:"20px"}}
                >
                  Edit
                </Button>
              )}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
export default Profile;
