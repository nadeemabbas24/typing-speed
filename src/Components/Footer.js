import React, { useState } from "react";
import Select from "react-select";
import { themeOptions } from "../Utils/themeOptions";
import { useTheme } from "../Context/ThemeContext";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

function Footer() {
  const { setTheme, theme } = useTheme();

  const changeHandler = (e) => {
    setTheme(e.value);
    localStorage.setItem("theme", JSON.stringify(e.value));
  };

  return (
    <div className="footer">
      <div className="links">
        <MailOutlineIcon />
        <FacebookIcon />
        <TwitterIcon />
        <InstagramIcon />
      </div>
      <div className="themeButton">
        <Select
          onChange={changeHandler}
          options={themeOptions}
          menuPlacement="top"
          defaultValue={{ label: theme.label, value: theme }}
          styles={{
            control: (styles) => ({
              ...styles,
              backgroundColor: theme.background,
            }),
            menu: (styles) => ({
              ...styles,
              backgroundColor: theme.background,
            }),
            option: (styles, { isFocused }) => {
              return {
                ...styles,
                backgroundColor: !isFocused
                  ? theme.background
                  : theme.textColor,
                color: !isFocused ? theme.textColor : theme.background,
                cursor: "pointer",
              };
            },
          }}
        />
      </div>
    </div>
  );
}

export default Footer;
