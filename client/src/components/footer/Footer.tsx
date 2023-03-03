import { AppBar, Box, Toolbar, IconButton, Typography } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import CopyrightIcon from "@mui/icons-material/Copyright";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Link } from "react-router-dom";
import "./footer.css";

export default function Footer() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        position: "relative",
        textAlign: "center",
      }}
    >
      <AppBar
        position="static"
        sx={{
          backgroundColor: "black",
          height: "100px",
          position: "relative",
          bottom: 0,
          left: 0,
          zIndex: 100,
        }}
      >
        <Toolbar className="footer">
          <Typography
            variant="body1"
            noWrap
            component="div"
            sx={{ display: "block", margin: "0 20px" }}
          >
            Copyright <CopyrightIcon fontSize="small" /> Mobile Studio | Created
            by{" "}
            <Link to="https://github.com/Hamidswed" target="_blank">
              <span>Hamid</span>
            </Link>
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ margin: "0 20px" }}>
            <Link to="https://www.instagram.com/hrddesigner/" target="_blank">
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                color="inherit"
              >
                <InstagramIcon />
              </IconButton>
            </Link>
            <Link to="https://www.instagram.com/hrddesigner/" target="_blank">
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                color="inherit"
              >
                <FacebookIcon />
              </IconButton>
            </Link>
            <Link to="mailto:delshad.swdn@gmail.com" target="_blank">
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                color="inherit"
              >
                <EmailIcon />
              </IconButton>
            </Link>
            <Link to="https://wa.me/0046735883889" target="_blank">
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                color="inherit"
              >
                <WhatsAppIcon />
              </IconButton>
            </Link>
            <Link
              to="https://www.linkedin.com/in/hamidreza-delshad/"
              target="_blank"
            >
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                color="inherit"
              >
                <LinkedInIcon />
              </IconButton>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
