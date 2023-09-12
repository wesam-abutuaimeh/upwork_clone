"use client";
import React, { useState } from "react";

// MUI Component
import {
  Container,
  Box,
  Typography,
  Button,
  TextField,
  OutlinedInput,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Select,
  SelectChangeEvent,
} from "@mui/material";

// Custom Component
import CustomLink from "@/components/atoms/CustomLink";
import CustomAlert from "@/components/atoms/CustomAlert";

// Yup Signup Schema
import { registrationSchema } from "@/validation/authSchema";

// External Libraries
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// Constants API End points
import { END_POINTS } from "@/constants/endPoints";

// Styles
import { theme } from "@/styles/theme";
import { StyledSignIn } from "./style";

// Hooks
import {} from "@/hooks/useAuth";
import { useAuthContext } from "@/contexts/AuthContext";

const Signup = () => {
  const { handleAUTHENTICATE }: any = useAuthContext();

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };
  const handlelastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };
  const fullName: string = `${firstName} ${lastName}`;

  const [personName, setPersonName] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };

  const NAMES = [
    "Palestinian territories",
    "Saudi arabia",
    "costa rica",
    "Egypt",
    "Emarat",
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registrationSchema),
  });

  const onSubmit = async (data: any) => {
    data = { ...data, name: fullName };
    await handleAUTHENTICATE(END_POINTS.SIGNUP, data);
  };

  return (
    <StyledSignIn>
      <Container
        component="main"
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          className="signup-box"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "800px",
            padding: "20px",
            borderColor: "#e1e8e1",
            borderRadius: "12px",
            boxShadow: "0 0 5px#dbe4db",
          }}
        >
          <Typography
            variant="h2"
            gutterBottom
            sx={{
              fontSize: "36px",
              fontWeight: "500",
              marginBottom: "20px",
              color: `${theme.colors.primary}`,
            }}
          >
            Sign up to find work you love
          </Typography>

          <form className="signup_form" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="First Name"
              type="text"
              value={firstName}
              onChange={handleFirstName}
              required
              id="first_name"
              autoComplete="text"
              margin="normal"
              sx={{ width: "360px" }}
            />
            <TextField
              label="Last Name"
              type="text"
              value={lastName}
              onChange={handlelastName}
              id="last_name"
              required
              autoComplete="text"
              margin="normal"
              sx={{ width: "360px", marginLeft: "40px" }}
            />

            <TextField
              label="Email"
              type="email"
              id="email"
              autoComplete="email"
              required
              fullWidth
              {...register("email")}
            />
            {errors.email && (
              <CustomAlert severity="error">
                {errors.email?.message}
              </CustomAlert>
            )}

            <TextField
              label="Password ( 8 or more characters )"
              type="password"
              id="password"
              required
              fullWidth
              autoComplete="current-password"
              margin="normal"
              {...register("password")}
            />
            {errors.password && (
              <CustomAlert severity="error">
                {errors.password?.message}
              </CustomAlert>
            )}

            <Select
              fullWidth
              displayEmpty
              value={personName}
              onChange={handleChange}
              input={<OutlinedInput />}
              renderValue={(selected) => {
                if (selected.length === 0)
                  return <p>Palestinian Territories</p>;
                return selected.join(", ");
              }}
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem disabled value="">
                <em>Placeholder</em>
              </MenuItem>
              {NAMES.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>

            <FormControlLabel
              sx={{ marginTop: "10px" }}
              control={<Checkbox value="remember" color="success" />}
              label="Send me helpful emails to find rewarding work and job leads."
              defaultChecked
              checked
            />

            <FormControlLabel
              sx={{ marginTop: "10px" }}
              control={
                <Checkbox
                  value="remember"
                  color="success"
                  name="agreement"
                  id="agreement"
                />
              }
              label="Yes, I understand and agree to the Upwork Terms of Service, including the User Agreement and Privacy Policy ."
            />
            <Button
              fullWidth
              type="submit"
              sx={{
                display: "block",
                borderRadius: "50px",
                margin: "20px 0",
                backgroundColor: "#108a00",
                color: "#fff",
                "&:hover": {
                  background: "#117903",
                },
              }}
            >
              {isLoading ? "Loading ..." : "Create My Account"}
            </Button>

            <span className="login_with_exist_account">
              Already have an account?
              <CustomLink href="/signin">Log In</CustomLink>
            </span>
          </form>
        </Box>
      </Container>
    </StyledSignIn>
  );
};

export default Signup;
