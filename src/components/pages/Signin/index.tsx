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
} from "@mui/material";

// Yup Signin Schema
import { loginSchema } from "@/validation/authSchema";

// External Libraries
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// Constants API End points
import { END_POINTS } from "@/constants/endPoints";

// Styles
import { theme } from "@/styles/theme";
import { StyledSignIn } from "./style";

import CustomAlert from "@/components/atoms/CustomAlert";
import CustomLink from "@/components/atoms/CustomLink";

const Signin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      const res = await axios.post(
        `https://react-tt-api.onrender.com/api/users${END_POINTS.LOGIN}`,
        data
      );
      setIsLoading(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
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
            padding: "20px 50px",
            borderColor: "#e1e8e1",
            borderRadius: "12px",
            boxShadow: "0 0 5px#dbe4db",
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              fontWeight: "600",
              marginBottom: "20px",
              color: `${theme.colors.primary}`,
            }}
          >
            Log in to Upwork
          </Typography>

          <form className="signup_form" onSubmit={handleSubmit(onSubmit)}>
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
              {isLoading ? "Loading ..." : "Sign In"}
            </Button>
            {error && (
              <CustomAlert severity="error">
                Unauthorized: Access is denied.
              </CustomAlert>
            )}
            <p className="line">Dont have an Upwork account?</p>

            <Button
              type="submit"
              variant="outlined"
              className="go_to_signup"
              sx={{
                display: "block",
                width: "218px",
                borderColor: "#108a00",
                borderRadius: "50px",
                margin: "20px auto",
                "&:hover": {
                  background: "#f2f7f2",
                  borderColor: "#0e6d02",
                },
              }}
            >
              <CustomLink href="/signup">Sign Up</CustomLink>
            </Button>
          </form>
        </Box>
      </Container>
    </StyledSignIn>
  );
};

export default Signin;
