import MenuSimple from "./Menu";
import "./Header.css";
import { Typography } from "@mui/material";

const Header = () => {
  return (
    <div className="header">
      <Typography variant="h4">GREEN FIELD MY BASKET DIARY</Typography>
      <MenuSimple className="MenuSimple" />
    </div>
  );
};

export default Header;
