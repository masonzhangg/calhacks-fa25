"use client";
import React, { useState } from "react";
import {
  Box,
  Divider,
  MenuItem,
  Select,
  Stack,
  Typography,
  Tabs,
  Tab,
  Paper,
  Container,
} from "@mui/material";
import { DesignProvider, useDesign } from "./DesignContext";
import { LAYOUTS } from "./layouts";
import KeyboardGrid from "./KeyboardGrid";
import ColorControls from "./ColorControls";
import Previews from "./Previews";
import KeyboardTester from "./KeyboardTester";
import HomeNavigation from "./HomeNavigation";

const TopBar: React.FC = () => {
  const { state, setLayout } = useDesign();
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        mb: 3,
        background: "linear-gradient(135deg, #f8f9ff 0%, #f0f2ff 100%)",
        border: "1px solid #e8eaff",
        borderRadius: 3,
      }}
    >
      <Stack
        direction="row"
        spacing={3}
        alignItems="center"
        justifyContent="space-between"
      >
        <Box>
          <Typography
            variant="h5"
            fontWeight={800}
            sx={{ mb: 0.5, color: "#333" }}
          >
            Keycap Designer
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Design and test your custom keyboard layouts
          </Typography>
        </Box>
        <Box sx={{ minWidth: 200 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Keyboard Layout
          </Typography>
          <Select
            size="small"
            value={state.layoutId}
            onChange={(e) => setLayout(e.target.value as any)}
            sx={{
              width: "100%",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#d0d7ff",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#8c52ff",
              },
            }}
          >
            {Object.values(LAYOUTS).map((l) => (
              <MenuItem key={l.id} value={l.id}>
                {l.name}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Stack>
    </Paper>
  );
};

const DesignerTab: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 3,
        flexDirection: { xs: "column", lg: "row" },
      }}
    >
      <Box sx={{ flex: { xs: 1, lg: 2 } }}>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            border: "1px solid #e8eaff",
            borderRadius: 3,
            backgroundColor: "#fff",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          }}
        >
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{ mb: 2, color: "#333" }}
          >
            Keyboard Designer
          </Typography>
          <KeyboardGrid />
        </Paper>
      </Box>
      <Box sx={{ flex: 1 }}>
        <Stack spacing={3}>
          <ColorControls />
          <Previews />
        </Stack>
      </Box>
    </Box>
  );
};

const TesterTab: React.FC = () => {
  return (
    <Box>
      <KeyboardTester />
    </Box>
  );
};

const ClientShellInner: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#fafbff" }}>
      <HomeNavigation />
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <TopBar />

        <Paper
          elevation={0}
          sx={{
            border: "1px solid #e8eaff",
            borderRadius: 3,
            backgroundColor: "#fff",
            overflow: "hidden",
          }}
        >
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            sx={{
              borderBottom: "1px solid #e8eaff",
              "& .MuiTab-root": {
                textTransform: "none",
                fontWeight: 600,
                fontSize: "1rem",
                px: 4,
                py: 2,
              },
              "& .Mui-selected": {
                color: "#8c52ff !important",
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "#8c52ff",
                height: 3,
                borderRadius: "3px 3px 0 0",
              },
            }}
          >
            <Tab label="Designer" />
            <Tab label="Keyboard Tester" />
          </Tabs>

          <Box sx={{ p: 3 }}>
            {activeTab === 0 && <DesignerTab />}
            {activeTab === 1 && <TesterTab />}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

const ClientShell: React.FC = () => {
  return (
    <DesignProvider>
      <ClientShellInner />
    </DesignProvider>
  );
};

export default ClientShell;
