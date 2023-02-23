import "./hero.css";
import Back from "../../assets/hero.png";
import { Link } from "react-router-dom";

const Hero = () => {
  const video = require("../../assets/samsung.mp4");
  return (
    <div className="hero">
      <div className="hero-video">
        <video autoPlay loop muted width="100%">
          <source src={video} type="video/mp4" />
        </video>
      </div>
      <div className="hero-frame">
        <img src={Back} alt="hero" />
      </div>
      <div className="hero-text">
        <h3>Welcome to</h3>
        <h1>Mobile <span>Studio</span></h1>
        <Link to="/products"><p className="hero-start">Get Started<span /></p></Link>
      </div>
    </div>
  );
};
export default Hero;
