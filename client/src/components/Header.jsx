import MenuSimple from "./Menu";
import "./Header.css";
import { Typography } from "@mui/material";

const Header = () => {
  return (
    <div className="header">
      <img
        src="/public/logo.png"
        style={{ transform: "scale(1.5) translate(30px)" }}
      />
      <MenuSimple className="MenuSimple" />
    </div>
  );
};

export default Header;
