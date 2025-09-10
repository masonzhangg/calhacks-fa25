"use client";
import React from "react";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const Navigation: React.FC = () => {
  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
      sx={{ borderBottom: "1px solid #eee", backgroundColor: "#fff" }}
    >
      <Toolbar sx={{ display: "flex", gap: 2 }}>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
          <Link href="/">Keycap Designer + Tester</Link>
        </Typography>
        <SignedOut>
          <Button
            href="/sign-in"
            component={Link}
            color="primary"
            variant="text"
            sx={{ textTransform: "none" }}
          >
            Sign In
          </Button>
          <Button
            href="/sign-up"
            component={Link}
            color="primary"
            variant="contained"
            sx={{ textTransform: "none" }}
          >
            Sign Up
          </Button>
        </SignedOut>
        <SignedIn>
          <Button
            href="/logout"
            component={Link}
            color="primary"
            variant="text"
            sx={{ textTransform: "none", mr: 1 }}
          >
            Sign Out
          </Button>
          <UserButton
            appearance={{
              elements: { avatarBox: { width: 32, height: 32 } },
            }}
          />
        </SignedIn>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
