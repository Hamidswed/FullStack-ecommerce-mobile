import { ProductType } from "../../types/productType";

//mui
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import { IconButton, TableBody, TableCell, TableRow } from "@mui/material";
import { useDispatch } from "react-redux";
import { productActions } from "./../../redux/slices/product";
type PropType = {
  favorite: ProductType;
  row: number;
};

const FavoriteItem = ({ favorite, row }: PropType) => {
  const dispatch = useDispatch();

  function addToCart() {
    dispatch(productActions.removeFromFavorite(favorite));
    dispatch(productActions.addToCart(favorite));
  }

  return (
    <TableBody className="cart-item">
      <TableRow
        key={favorite._id}
        sx={{
          "&:last-child td, &:last-child th": {
            borderBottom: "1px solid lightgrey",
          },
          bgColor: "none",
        }}
      >
        <TableCell align="center">{`${row}.`} </TableCell>
        <TableCell align="center">{favorite.title.slice(0, 20)} </TableCell>
        <TableCell align="center">${favorite.price}</TableCell>
        <TableCell align="center">
          <IconButton
            onClick={() =>
              dispatch(productActions.removeFromFavorite(favorite))
            }
          >
            <FavoriteIcon sx={{ color: "red" }} />
          </IconButton>
        </TableCell>
        <TableCell align="center">
          <IconButton onClick={addToCart}>
            <AddShoppingCartOutlinedIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    </TableBody>
  );
};
export default FavoriteItem;
