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
import { useDispatch } from "react-redux";
import { productActions } from './../../../redux/slices/product';
import "./cartItem.css";

type PropType = {
  cart: ProductType;
};
const CartItem = ({ cart }: PropType) => {
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
          <img src={cart.productImage} alt={cart.title} />
        </TableCell>
        <TableCell align="center">{cart.title.slice(0, 20)}</TableCell>
        <TableCell align="center">${(cart.price * cart.quantity).toFixed(2)}</TableCell>
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
          >
            +
          </Button>
        </TableCell>
        <TableCell align="center">
          <Tooltip title="Remove from cart">
            <IconButton onClick={() => dispatch(productActions.removeAll(cart))}>
              <HighlightOffIcon />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
    </TableBody>
  );
};
export default CartItem;