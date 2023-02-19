import "./navBar.css";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function NavBar() {
  return (
    <div className="navbar">
      <div className="navbar-logo">
        <Logo />
      </div>
      <div className="navbar-menu">
        <IconButton>
          <HomeIcon />
        </IconButton>
        <IconButton>
          <FormatListBulletedIcon />
        </IconButton>
        <IconButton>
          <FavoriteIcon />
        </IconButton>
        <IconButton>
          <ShoppingCartIcon />
        </IconButton>
        <IconButton>
          <AccountCircleIcon />
        </IconButton>
      </div>
    </div>
  );
}
