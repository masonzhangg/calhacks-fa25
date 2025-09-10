"use client";
import React from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Loader from "../components/Loader";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import Link from "next/link";

const SignInPage: React.FC = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  if (!isLoaded) {
    return <Loader />;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailError =
      formData.email === "" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    const passwordError = formData.password === "";

    setErrors({ email: emailError, password: passwordError });

    if (!emailError && !passwordError) {
      setLoading(true);
      try {
        const signInAttempt = await signIn.create({
          identifier: formData.email,
          password: formData.password,
        });

        if (signInAttempt.status === "complete") {
          await setActive({ session: signInAttempt.createdSessionId });
          router.push("/");
        } else {
          setErrorMessage("Invalid login credentials. Please try again.");
        }
      } catch (error) {
        console.error("SignIn Error:", error);
        setErrorMessage("Failed to sign in. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "rgba(240, 240, 240, 0.9)",
        padding: "2rem",
        color: "black",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "400px",
          textAlign: "left",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            marginBottom: "1rem",
            fontWeight: "bold",
            fontFamily: "Inter",
            fontSize: "1.5rem",
          }}
        >
          Log In
        </Typography>
      </Box>
      <Divider sx={{ width: "30%", marginBottom: "1rem" }} />
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <Box>
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", marginBottom: "0.5rem" }}
          >
            Email
          </Typography>
          <TextField
            name="email"
            type="email"
            variant="outlined"
            fullWidth
            error={errors.email}
            helperText={errors.email ? "Enter a valid email" : ""}
            value={formData.email}
            onChange={handleChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                height: "2rem",
              },
              "& :-webkit-autofill": {
                WebkitBoxShadow: "0 0 0 1000px transparent inset",
                transition: "background-color 5000s ease-in-out 0s",
              },
            }}
          />
        </Box>
        <Box>
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", marginBottom: "0.5rem" }}
          >
            Password
          </Typography>
          <TextField
            name="password"
            type="password"
            fullWidth
            variant="outlined"
            error={errors.password}
            helperText={errors.password ? "A password is required" : ""}
            value={formData.password}
            onChange={handleChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                height: "2rem",
              },
              "& :-webkit-autofill": {
                WebkitBoxShadow: "0 0 0 1000px transparent inset",
                transition: "background-color 5000s ease-in-out 0s",
              },
            }}
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
          sx={{
            padding: "0.75rem",
            fontWeight: "bold",
            textTransform: "none",
            borderRadius: "8px",
            height: "2.5rem",
            background: "linear-gradient(to right bottom, #8c52ff, #C17BC1)",
            ":disabled": {
              color: "white",
            },
          }}
        >
          {loading ? "Signing in..." : "Sign In"}
        </Button>
        {errorMessage && (
          <Typography
            variant="body2"
            color="error"
            sx={{ textAlign: "center", marginTop: "0.5rem" }}
          >
            {errorMessage}
          </Typography>
        )}
        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            marginTop: "0.5rem",
            color: "gray",
            fontSize: "1rem",
            marginBottom: "-0.5rem",
          }}
        >
          Don't have an account?{" "}
          <Link href="/sign-up" passHref>
            <Typography
              component="a"
              sx={{
                color: "#C17BC1",
                cursor: "pointer",
                textDecoration: "underline",
                ":hover": { color: "#C17BC1" },
                fontSize: "1rem",
              }}
            >
              Sign Up
            </Typography>
          </Link>
        </Typography>

        <Link href="/reset-password" passHref>
          <Typography
            variant="body2"
            sx={{
              color: "#C17BC1",
              cursor: "pointer",
              alignContent: "center",
              textAlign: "center",
              textDecoration: "underline",
              ":hover": { color: "#C17BC1" },
              fontSize: "1rem",
            }}
          >
            Forgot Password?{" "}
          </Typography>
        </Link>
      </Box>
    </Box>
  );
};

export default SignInPage;
