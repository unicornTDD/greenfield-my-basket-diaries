import React, { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import sample from "../public/BG.mp4";
import "./Login.css";

// @MUI
import {
  Button,
  Container,
  Fade,
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
import CreateUserModal from "./components/CreateUserModal";

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
  const [showConfirmRegister, setShowConfirmRegister] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  // USE EFFECTS

  // HANDLER FUNCTIONS
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const navigate = useNavigate(); // REACT ROUTER DOM

  const handleVerifyUser = async () => {
    const response = await fetch(`${BASE_URL}/verify_user`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const data = await response.json();
    const token = data.token
    if (token) {
      localStorage.setItem('jwtToken', token);
      navigate("/diary");
    }
  };

  const handleCreateUser = async () => {
    const response = await fetch(`${BASE_URL}/create_user`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: newEmail,
        password: newPassword,
      }),
    });

    if (response.status === 201) {
      setShowRegister((show) => !show);
      setShowConfirmRegister(true);
      setTimeout(() => setShowConfirmRegister(false), 4000);
      navigate("/");
    } else {
      alert("Error, user already exists or you type the wrong email format");
    }
  };

  // RETURN
  return (
    <>
      {showConfirmRegister && (
        <CreateUserModal
          showConfirmRegister={showConfirmRegister}
          newEmail={newEmail}
          setShowConfirmRegister={setShowConfirmRegister}
        />
      )}

      <video className="videoTag" autoPlay loop muted>
        <source src={sample} type="video/mp4" />
      </video>

      <div className="background-container">
        <Container
          maxWidth="sm"

          sx={{
            transition: "ease-in-out 0.2s",
          }}
        >
          <Form method="post">
            <Paper
              sx={{

                p: 2,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: 2,
                gap: 1,
              }}
            >
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img

                  src="https://firebasestorage.googleapis.com/v0/b/my-basket-diaries.appspot.com/o/diaryEntries%2Flogo.png?alt=media&token=6c66aa6e-588a-4ca5-a826-fa6c001a15ec"

                  style={{ transform: "scale(1.7)" }}
                />
              </div>

              {!showRegister && (
                <Fade in={!showRegister} timeout={{ enter: 800, exit: 400 }}>
                  <div className="form">
                    <Typography variant="h6">Login to your account</Typography>
                    <TextField
                      id="loginEmail"
                      label="Email"
                      variant="outlined"
                      sx={{ my: 1 }}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                    <FormControl sx={{ width: "100%" }} variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password">
                        Password
                      </InputLabel>
                      <OutlinedInput
                        id="loginPassword"
                        type={showPassword ? "text" : "password"}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
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
                      sx={{ my: 1 }}
                    >
                      Login
                    </Button>
                    <Button
                      variant="text"
                      onClick={() => setShowRegister((show) => !show)}
                    >
                      Create new account
                    </Button>
                  </div>

                  {/* <LoginForm /> */}
                </Fade>
              )}
              {showRegister && (
                <Fade in={showRegister} timeout={{ enter: 800, exit: 400 }}>
                  <div className="form">
                    <Typography variant="h6">Create new account</Typography>
                    <TextField
                      id="createEmail"
                      label="Email"
                      variant="outlined"
                      sx={{ my: 1 }}
                      onChange={(e) => setNewEmail(e.target.value)}
                    />
                    <FormControl sx={{ width: "100%" }} variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password">
                        Password
                      </InputLabel>
                      <OutlinedInput
                        id="createPassword"
                        type={showPassword ? "text" : "password"}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
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
                      sx={{ my: 1 }}
                    >
                      Register
                    </Button>
                    <Button
                      color="error"
                      variant="outlined"
                      onClick={() => setShowRegister((show) => !show)}
                    >
                      Cancel
                    </Button>
                  </div>
                </Fade>

              )}
            </Paper>
          </Form>
        </Container>

      </div>

    </>
  );
}

export default Login;
