import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Button,
  Alert,
  Snackbar,
  styled,
} from "@mui/material";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import CartItem from "../cartItem/CartItem";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../../redux/store";
import { productActions } from "../../../redux/slices/product";
import "./cartList.css";
import axios from "axios";
import { url } from "../../../App";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function createData(
  _id: string,
  title: string,
  price: number,
  productImage: string,
  detailImage: string,
  quantity: number,
  description: string
) {
  return {
    _id,
    title,
    price,
    productImage,
    detailImage,
    quantity,
    description,
  };
}
const CartList = () => {
  const [checkOutClicked, setCheckOutClicked] = useState(false);
  const [open, setOpen] = useState(false);

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
  const CheckOutBTN = styled(Button)({
    color: "#fff",
    backgroundColor: "black",
    border: "none",
    "&:hover": {
      backgroundColor: "#adc178",
      border: "none",
    },
  });
  const cartList = useSelector((state: RootState) => state.product.carts);
  const user = useSelector((state: RootState) => state.user.user);
  const totalPrice = useSelector(
    (state: RootState) => state.product.totalPrice
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(productActions.totalPrice());
  });

  const cartRows = cartList.map((cart) => {
    return createData(
      cart._id,
      cart.title,
      cart.price,
      cart.productImage,
      cart.detailImage,
      cart.quantity,
      cart.description
    );
  });

  const checkOut = () => {
    const token = localStorage.getItem("token");
    const totalPrice = Number(localStorage.getItem("totalPrice"));
    const order = { productOrder: cartList, totalPrice: totalPrice.toFixed(2) };
    token &&
      cartList.length !== 0 &&
      axios
        .post(`${url}/orders/${user._id}`, order, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => console.log(res.data, "order"));
    handleClick();
    setCheckOutClicked(true);
    localStorage.removeItem("cart");
    dispatch(productActions.getCartList([]));
  };

  return (
    <div className="cart-list">
      {cartList.length === 0 ? (
        <div className="cart-list-warning">
          {checkOutClicked ? (
            <CheckCircleIcon color="success" fontSize="large" />
          ) : (
            <Tooltip title="Back to products">
              <Link to="/products">
                <IconButton>
                  <AddShoppingCartOutlinedIcon sx={{ fontSize: "50px" }} />
                </IconButton>
              </Link>
            </Tooltip>
          )}

          {checkOutClicked ? (
            <div>
              <p>Your order is registerd!</p>
              <Tooltip title="Back to products">
                <Link to="/products">
                  <Button sx={{ marginTop: "20px" }}>Back</Button>
                </Link>
              </Tooltip>
            </div>
          ) : (
            <em>Please add product to cart!</em>
          )}
        </div>
      ) : (
        <>
          <h3> Cart List</h3>
          <TableContainer component={Paper} style={{ marginTop: "50px" }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow sx={{ backgroundColor: "#474747" }}>
                  <TableCell align="center">
                    <strong>Image</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>Title</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>Price</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>Quantity</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>Remove</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              {cartRows.map((cart) => {
                return <CartItem key={cart._id} cart={cart} />;
              })}
            </Table>
          </TableContainer>
          <div className="cart-total">
            <CheckOutBTN variant="outlined" onClick={checkOut}>
              Checkout
            </CheckOutBTN>
            <p>
              <strong style={{ color: "black" }}>Total Price:</strong>
            </p>
            <p>
              <strong style={{ color: "black" }}>
                $ {totalPrice.toFixed(2)}
              </strong>
            </p>
          </div>
        </>
      )}

      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Checkout is done!
        </Alert>
      </Snackbar>
    </div>
  );
};
export default CartList;
