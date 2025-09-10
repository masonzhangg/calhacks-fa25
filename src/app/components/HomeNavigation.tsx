"use client";
import React from "react";
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
} from "@mui/material";
import { UserButton, useClerk } from "@clerk/nextjs";
import { Logout } from "@mui/icons-material";

const HomeNavigation: React.FC = () => {
  const { signOut } = useClerk();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
      sx={{
        borderBottom: "1px solid #e0e0e0",
        backgroundColor: "#fff",
        backdropFilter: "blur(10px)",
        background: "rgba(255, 255, 255, 0.95)",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 800,
            background: "linear-gradient(135deg, #8c52ff 0%, #C17BC1 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-0.02em",
          }}
        >
          Spool
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <UserButton
            appearance={{
              elements: {
                avatarBox: { width: 40, height: 40 },
                userButtonPopoverCard: {
                  boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                },
              },
            }}
          />
          <Button
            variant="outlined"
            startIcon={<Logout />}
            onClick={handleSignOut}
            sx={{
              textTransform: "none",
              borderRadius: 2,
              px: 3,
              py: 1,
              borderColor: "#e0e0e0",
              color: "#666",
              "&:hover": {
                borderColor: "#8c52ff",
                color: "#8c52ff",
                backgroundColor: "rgba(140, 82, 255, 0.04)",
              },
            }}
          >
            Sign Out
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default HomeNavigation;
