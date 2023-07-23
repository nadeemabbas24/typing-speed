import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useTheme } from "../Context/ThemeContext";
import { auth } from "../firebaseConfig";
import { toast } from "react-toastify";

const LoginForm = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { theme } = useTheme();

  const handleSubmit = () => {
    if (!email || !password) {
      toast.warning("all fields are mandatory!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    auth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        toast.success("user logged in!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        handleClose();
      })
      .catch((err) => {
        toast.error("wrong credentials!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
  };

  return (
    <Box
      p={3}
      style={{ display: "flex", flexDirection: "column", gap: "20px" }}
    >
      <TextField
        variant="outlined"
        type="email"
        label="Enter Your Email"
        onChange={(e) => setEmail(e.target.value)}
        InputLabelProps={{
          style: {
            color: theme.textColor,
          },
        }}
        inputProps={{
          style: {
            color: theme.textColor,
          },
        }}
      />
      <TextField
        variant="outlined"
        type="password"
        label="Enter Your Password"
        onChange={(e) => setPassword(e.target.value)}
        InputLabelProps={{
          style: {
            color: theme.textColor,
          },
        }}
        inputProps={{
          style: {
            color: theme.textColor,
          },
        }}
      />
      <Button
        variant="contained"
        size="large"
        style={{ background: theme.textColor, color: theme.background }}
        onClick={handleSubmit}
      >
        Login
      </Button>
    </Box>
  );
};

export default LoginForm;
