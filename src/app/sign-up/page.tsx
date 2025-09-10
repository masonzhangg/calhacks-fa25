"use client";
import React, { useState } from "react";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "@mui/material/styles";
import { useSignUp } from "@clerk/nextjs";
import Loader from "../components/Loader";

const SignUp: React.FC = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [code, setCode] = useState("");
  const router = useRouter();
  const theme = useTheme();

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const hasErrors = {
      email:
        formData.email === "" ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
      password:
        formData.password.length < 8 || !/[!@#$%^&*]/.test(formData.password),
    };

    setErrors(hasErrors);

    if (hasErrors.email || hasErrors.password) {
      setErrorMessage("Please fill out all fields correctly.");
      return;
    }

    setLoading(true);
    try {
      const signUpAttempt = await signUp.create({
        emailAddress: formData.email,
        password: formData.password,
      });

      if (signUpAttempt.status === "missing_requirements") {
        await signUp.prepareEmailAddressVerification({
          strategy: "email_code",
        });
        setVerifying(true);
        setSuccessMessage(
          "Verification email sent. Check your inbox for further instructions."
        );
      } else if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.push("/");
      } else {
        setErrorMessage("Unexpected error during signup.");
      }
    } catch (error) {
      console.error("Signup Error:", error);
      setErrorMessage("Failed to create an account. Please try again later.");
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const verificationAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (verificationAttempt.status === "complete") {
        await setActive({ session: verificationAttempt.createdSessionId });
        router.push("/");
      } else {
        setErrorMessage(
          "Verification failed. Please check the code and try again."
        );
      }
    } catch (error) {
      console.error("Verification Error:", error);
      setErrorMessage("Unable to verify the code. Please try again later.");
    }
  };

  if (verifying) {
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
            Verification
          </Typography>
        </Box>
        <Divider sx={{ width: "29%", marginBottom: "1rem" }} />
        <Box
          component="form"
          onSubmit={handleVerify}
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
              Verification Code
            </Typography>
            <TextField
              name="verificationCode"
              type="verificationCode"
              variant="outlined"
              fullWidth
              error={!code.trim()}
              helperText={!code.trim() ? "Enter a valid verification code" : ""}
              value={code}
              onChange={(e) => setCode(e.target.value)}
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
            sx={{
              padding: "0.75rem",
              fontWeight: "bold",
              textTransform: "none",
              borderRadius: "8px",
              height: "2.5rem",
              background: "linear-gradient(to right bottom, #8c52ff, #C17BC1)",
              color: "white",
              ":disabled": {
                color: "white",
              },
            }}
          >
            Verify
          </Button>
          {successMessage && (
            <Typography
              variant="body2"
              sx={{
                textAlign: "center",
                color: "green",
                fontSize: "0.75rem",
              }}
            >
              {successMessage}
            </Typography>
          )}
          {errorMessage && (
            <Typography
              variant="body2"
              sx={{
                textAlign: "center",
                color: "red",
                fontSize: "0.75rem",
              }}
            >
              {errorMessage}
            </Typography>
          )}
        </Box>
      </Box>
    );
  }

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
          Sign Up
        </Typography>
      </Box>
      <Divider sx={{ width: "29%", marginBottom: "1rem" }} />
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
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
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
            variant="body2"
            sx={{ fontWeight: "bold", marginBottom: "0.5rem" }}
          >
            Password
          </Typography>
          <TextField
            name="password"
            type="password"
            variant="outlined"
            fullWidth
            error={errors.password}
            helperText={errors.password ? "Enter a valid password" : ""}
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
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

        {/* Clerk CAPTCHA */}
        <div id="clerk-captcha" style={{ display: "none" }} />
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
            color: "white",
            ":disabled": {
              color: "white",
            },
          }}
        >
          {loading ? "Processing..." : "Sign Up"}
        </Button>
        {successMessage && (
          <Typography
            variant="body2"
            sx={{
              textAlign: "center",
              color: "green",
              fontSize: "0.75rem",
            }}
          >
            {successMessage}
          </Typography>
        )}
        {errorMessage && (
          <Typography
            variant="body2"
            sx={{
              textAlign: "center",
              color: "red",
              fontSize: "0.75rem",
            }}
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
          }}
        >
          Already have an account?{" "}
          <Link href="/sign-in" passHref>
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
              Log In
            </Typography>
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignUp;
