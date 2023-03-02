import { useState } from "react";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { Button, TextField, styled } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import axios from "axios";
import { userActions } from "../../../redux/slices/user";
import { useDispatch } from "react-redux";
import "./profile.css";
import { useNavigate } from "react-router-dom";
import { fetchOrderData } from "../../../redux/thunks/order";
import OrderList from "../order/OrderList";
import EditIcon from "@mui/icons-material/Edit";

const Profile = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const dispatchOrder = useDispatch<AppDispatch>();

  const [isEdit, setIsEdit] = useState(false);

  const CheckOutBTN = styled(Button)({
    color: "#fff",
    backgroundColor: "black",
    border: "none",
    "&:hover": {
      backgroundColor: "red",
      border: "none",
    },
  });

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
    axios
      .put(`https://backend-fullstack-arsu.onrender.com/users/${user?._id}`, values, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res, "new information");
        dispatch(userActions.getUser(res.data));
      });
  };
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    navigate("/login");
    window.location.reload();
  };

  const displayOrder = () => {
    dispatchOrder(fetchOrderData(user._id));
  };

  return (
    <div className="profile-container">
      <div className="information">
        <h3>UserInformation</h3>
        <Formik
          initialValues={initialValues}
          onSubmit={submitHandler}
          validationSchema={SinginSchema}
        >
          {({ errors, touched, handleChange }) => {
            return (
              <Form className="user-info">
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
                    <p>
                      <strong>First name:</strong> {user?.firstName}
                    </p>
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
                    <p>
                      <strong>Last name:</strong> {user?.lastName}
                    </p>
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
                    <p>
                      <strong>Email:</strong> {user?.email}
                    </p>
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
                    sx={{ marginTop: "20px" }}
                    startIcon={<EditIcon />}
                  >
                    Edit
                  </Button>
                )}

                <Button
                  variant="outlined"
                  onClick={displayOrder}
                  type="button"
                  sx={{ marginTop: "20px" }}
                >
                  orders
                </Button>
                <CheckOutBTN
                  variant="outlined"
                  onClick={logOut}
                  type="button"
                  sx={{ marginTop: "20px" }}
                >
                  log out
                </CheckOutBTN>
              </Form>
            );
          }}
        </Formik>
      </div>
      <div className="order-list-container">
        <OrderList />
      </div>
    </div>
  );
};
export default Profile;
