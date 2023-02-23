import "./hero.css";

const Hero = () => {
  const video = require("../../assets/samsung.mp4");
  return (
    <div>
      <div className="hero-video">
        <video autoPlay loop muted width="100%">
          <source src={video} type="video/mp4" />
        </video>
      </div>
    </div>
  );
};
export default Hero;
