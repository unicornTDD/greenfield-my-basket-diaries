import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

const LoginForm = React.forwardRef(function (props, ref) {
  return (
    <div ref={ref} {...props}>
      <Typography variant="h6">Login to your account</Typography>
      <TextField
        id="outlined-basic"
        label="Email"
        variant="outlined"
        onChange={(e) => setEmail(e.target.value)}
      />
      <FormControl sx={{ width: "100%" }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
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
      <Button variant="contained" onClick={handleVerifyUser} sx={{ mt: 2 }}>
        Login
      </Button>
      <Button variant="text" onClick={() => setShowRegister((show) => !show)}>
        Create new account
      </Button>
    </div>
  );
});

export default LoginForm;
