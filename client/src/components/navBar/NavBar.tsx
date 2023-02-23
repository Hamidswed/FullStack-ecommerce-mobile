import "./navBar.css";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { IconButton, Tooltip } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export default function NavBar() {
  const user = useSelector((state: RootState) => state.user.user);
  return (
    <div className="navbar">
      <div className="navbar-logo">
        <Logo />
      </div>
      <div className="navbar-menu">
        <Link to="/">
          <IconButton>
            <HomeIcon />
          </IconButton>
        </Link>
        <Link to="/products">
          <IconButton>
            <FormatListBulletedIcon />
          </IconButton>
        </Link>
        <Link to="/favorites">
          <IconButton>
            <FavoriteIcon />
          </IconButton>
        </Link>
        <Link to="/cart">
          <IconButton>
            <ShoppingCartIcon />
          </IconButton>
        </Link>
        <Tooltip title={user.firstName!=="" ? `${user.firstName}` : "Login"}>
          <Link to={user.firstName!=="" ? "/user" : "/login"}>
            <IconButton>
              <AccountCircleIcon />
            </IconButton>
          </Link>
        </Tooltip>
      </div>
    </div>
  );
}
