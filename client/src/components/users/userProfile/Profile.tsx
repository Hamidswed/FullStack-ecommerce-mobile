import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { Button, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import axios from "axios";
import { userActions } from '../../../redux/slices/user';
import { useDispatch } from 'react-redux';

const Profile = () => {

  const user = useSelector((state:RootState)=>state.user.user)
  const dispatch = useDispatch()

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
        dispatch(userActions.getUser(res.data))
      });
  };
  console.log(isEdit, "isEdit");
  return (
    <div>
      <h3>UserInformation</h3>
      <Formik
        initialValues={initialValues}
        onSubmit={submitHandler}
        validationSchema={SinginSchema}
      >
        {({ values, errors, touched, handleChange }) => {
          return (
            <Form className="info-container">
              <div>
                {isEdit ? (
                  <div>
                    <TextField
                      required
                      name="firstName"
                      label="FirstName"
                      onChange={handleChange}
                      // value={values.firstName}
                      placeholder={user?.firstName}
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
                      label="LastName"
                      onChange={handleChange}
                      // value={values.lastName}
                      placeholder={user?.lastName}
                    />
                    {errors.lastName && touched.lastName ? (
                      <p>{errors.lastName}</p>
                    ) : null}
                  </div>
                ) : (
                  <p>{user?.lastName}</p>
                )}
              </div>
              <p>{user?.email}</p>
              {isEdit ? (
                <Button variant="contained" type="submit">
                  Save
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  onClick={() => setIsEdit(true)}
                  type="button"
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
