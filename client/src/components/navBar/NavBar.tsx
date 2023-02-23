import "./navBar.css";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { Badge, BadgeProps, IconButton, styled, Tooltip } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useLocation } from "react-router-dom";

export default function NavBar() {
  const user = useSelector((state: RootState) => state.user.user);
  const cartState = useSelector((state: RootState) => state.product.carts);
  const favState = useSelector((state: RootState) => state.product.favorites);
  let { pathname } = useLocation();

  const StyledBadge = styled(Badge)<BadgeProps>(() => ({
    "& .MuiBadge-badge": {
      right: 6,
      top: 3,
      padding: "0 4px",
    },
  }));

  return (
    <div className={pathname === "/" ? "navbar" : "navbar navbar-blur"}>
      <div className="navbar-logo">
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <div
        className={pathname === "/" ? "btn-white navbar-menu" : "navbar-menu"}
      >
        <Tooltip title="Home">
          <Link to="/">
            <IconButton>
              <HomeIcon />
            </IconButton>
          </Link>
        </Tooltip>
        <Tooltip title="Product list">
          <Link to="/products">
            <IconButton>
              <FormatListBulletedIcon />
            </IconButton>
          </Link>
        </Tooltip>
        <Tooltip title="Favorite list">
          <Link to="/favorites">
            <StyledBadge badgeContent={favState.length} color="error">
              <IconButton>
                <FavoriteIcon />
              </IconButton>
            </StyledBadge>
          </Link>
        </Tooltip>
        <Tooltip title="Cart">
          <Link to="/cart">
            <StyledBadge badgeContent={cartState.length} color="error">
              <IconButton>
                <ShoppingCartIcon />
              </IconButton>
            </StyledBadge>
          </Link>
        </Tooltip>
        <Tooltip title={user.firstName !== "" ? `${user.firstName}` : "Login"}>
          <Link to={user.firstName !== "" ? "/user" : "/login"}>
            <IconButton>
              <AccountCircleIcon />
            </IconButton>
          </Link>
        </Tooltip>
      </div>
    </div>
  );
}
