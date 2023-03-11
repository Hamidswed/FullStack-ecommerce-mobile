import {
  Button,
  IconButton,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { ProductType } from "../../../types/productType";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "./../../../redux/slices/product";
import "./cartItem.css";
import { RootState } from "../../../redux/store";
import { Link } from "react-router-dom";

type PropType = {
  cart: ProductType;
};
const CartItem = ({ cart }: PropType) => {
  const productList = useSelector((state: RootState) => state.product.products);
  const index = productList.findIndex((product) => product._id === cart._id);
  const dispatch = useDispatch();
  return (
    <TableBody className="cart-item">
      <TableRow
        key={cart._id}
        sx={{
          "&:last-child td, &:last-child th": {
            borderBottom: "1px solid lightgrey",
          },
          bgColor: "none",
        }}
      >
        <TableCell component="th" scope="row" align="center">
          <Link to={`/products/${cart._id}`}>
            <img src={cart.productImage} alt={cart.title} />
          </Link>
        </TableCell>
        <TableCell align="center">{cart.title.slice(0, 20)}</TableCell>
        <TableCell align="center">
          ${(cart.price * cart.quantity).toFixed(2)}
        </TableCell>
        <TableCell align="center" sx={{ color: "#D32F2F" }}>
          {productList[index].quantity}
        </TableCell>
        <TableCell align="center">
          <Button
            variant="outlined"
            onClick={() => dispatch(productActions.removeFromCart(cart))}
            size="small"
          >
            -
          </Button>
          <span style={{ marginInline: "10px" }}>{cart.quantity}</span>
          <Button
            variant="outlined"
            onClick={() => dispatch(productActions.addToCart(cart))}
            size="small"
            disabled={
              cart.quantity === productList[index].quantity ? true : false
            }
          >
            +
          </Button>
        </TableCell>
        <TableCell align="center">
          <Tooltip title="Remove from cart">
            <IconButton
              onClick={() => dispatch(productActions.removeAll(cart))}
            >
              <HighlightOffIcon />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
    </TableBody>
  );
};
export default CartItem;
