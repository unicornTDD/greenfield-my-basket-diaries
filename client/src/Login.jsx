import React, { useEffect, useState } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import "./App.css";

// @MUI
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

// LOCAL COMPONENTS

// BASE URL
const BASE_URL = import.meta.env.VITE_BASE_URL;

function Login() {
  // STATE
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [showRegister, setShowRegister] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  // HANDLER FUNCTIONS
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const navigate = useNavigate();

  const handleVerifyUser = async () => {
    const response = await fetch(`${BASE_URL}/verify_user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const data = await response.json();
    if (data) {
      navigate("/");
    }
  };

  const handleCreateUser = async () => {
    const response = await fetch(`${BASE_URL}/create_user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: newEmail,
        password: newPassword,
      }),
    });
    const data = await response.json();
    if (data) {
      navigate("/diary");
    }
  };

  // RETURN
  return (
    <Box
      maxWidth={"100vw"}
      height={"100lvh"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
      sx={{
        backgroundImage: "url('src/assets/unicorn.jpg')",
        backgroundSize: "cover",
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          transition: "ease-in-out 0.2s",
        }}
      >
        <Form method="post">
          <Paper
            sx={{
              p: 1,
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography variant="h3">Welcome to Unicorn land</Typography>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormControl sx={{ width: "100%" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>

            <Button
              variant="contained"
              onClick={handleVerifyUser}
              sx={{ mt: 2 }}
            >
              Login
            </Button>

            <Button
              variant="outlined"
              onClick={() => setShowRegister((show) => !show)}
            >
              Create new account
            </Button>

            {showRegister && (
              <>
                <Divider sx={{ margin: 2 }} />

                <Typography variant="h6">Create new account</Typography>
                <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  onChange={(e) => setNewEmail(e.target.value)}
                />
                <FormControl sx={{ width: "100%" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </FormControl>

                <Button
                  color="secondary"
                  variant="contained"
                  onClick={handleCreateUser}
                  sx={{ mt: 2 }}
                >
                  Register
                </Button>
              </>
            )}
          </Paper>
        </Form>
      </Container>
    </Box>
  );
}

export default Login;
