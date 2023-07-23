import React from "react";
import AccountCircle from "./AccountCircle";
import KeyboardOutlinedIcon from "@mui/icons-material/KeyboardOutlined";

const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <KeyboardOutlinedIcon style={{ transform: "scale(3)" }} /> Gyro Typing
      </div>
      <div className="user-icon">
        <AccountCircle />
      </div>
    </div>
  );
};

export default Header;
