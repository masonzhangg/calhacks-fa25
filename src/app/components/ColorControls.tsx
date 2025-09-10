"use client";
import React, { useMemo, useState } from "react";
import {
  Box,
  Button,
  Divider,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useDesign } from "./DesignContext";

const PALETTES = [
  ["#2e3436", "#555753", "#888a85", "#babdb6", "#eeeeec"],
  ["#8c52ff", "#C17BC1", "#ffb6c1", "#ffd166", "#06d6a0"],
  ["#1b263b", "#415a77", "#778da9", "#e0e1dd", "#c1121f"],
];

type Mode = "solid" | "gradient" | "pattern";

const ColorControls: React.FC = () => {
  const { state, setKeyFill, resetDesign } = useDesign();
  const selected = state.selectedKeyId;
  const [mode, setMode] = useState<Mode>("solid");
  const [solid, setSolid] = useState("#8c52ff");
  const [from, setFrom] = useState("#8c52ff");
  const [to, setTo] = useState("#C17BC1");
  const [angle, setAngle] = useState(45);
  const [fg, setFg] = useState("#8c52ff");
  const [bg, setBg] = useState("#ececec");
  const [pattern, setPattern] = useState<"stripes" | "dots">("stripes");

  const apply = () => {
    if (!selected) return;
    if (mode === "solid") setKeyFill(selected, { kind: "solid", color: solid });
    if (mode === "gradient")
      setKeyFill(selected, { kind: "gradient", from, to, angleDeg: angle });
    if (mode === "pattern")
      setKeyFill(selected, { kind: "pattern", fg, bg, pattern });
  };

  const PaletteButtons = useMemo(
    () => (
      <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
        {PALETTES.flat().map((c) => (
          <Button
            key={c}
            onClick={() => {
              setSolid(c);
              setFrom(c);
            }}
            sx={{
              minWidth: 24,
              width: 24,
              height: 24,
              p: 0,
              border: "1px solid #ddd",
              backgroundColor: c,
            }}
          />
        ))}
      </Stack>
    ),
    []
  );

  return (
    <Box sx={{ p: 2, border: "1px solid #eee", borderRadius: 1 }}>
      <Typography variant="subtitle1" fontWeight={700}>
        Key Style
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        {selected ? `Editing: ${selected}` : "Select a key to edit"}
      </Typography>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <Select
          size="small"
          value={mode}
          onChange={(e) => setMode(e.target.value as Mode)}
        >
          <MenuItem value="solid">Solid</MenuItem>
          <MenuItem value="gradient">Gradient</MenuItem>
          <MenuItem value="pattern">Pattern</MenuItem>
        </Select>
        <Button
          onClick={apply}
          variant="contained"
          disabled={!selected}
          sx={{ textTransform: "none" }}
        >
          Apply
        </Button>
        <Button
          onClick={resetDesign}
          color="inherit"
          sx={{ textTransform: "none" }}
        >
          Reset
        </Button>
      </Stack>

      {mode === "solid" && (
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
          <TextField
            size="small"
            type="color"
            value={solid}
            onChange={(e) => setSolid(e.target.value)}
          />
          <TextField
            size="small"
            label="Hex"
            value={solid}
            onChange={(e) => setSolid(e.target.value)}
          />
        </Stack>
      )}

      {mode === "gradient" && (
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <TextField
            size="small"
            type="color"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
          <TextField
            size="small"
            type="color"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
          <TextField
            size="small"
            type="number"
            label="Angle"
            value={angle}
            onChange={(e) => setAngle(Number(e.target.value))}
            sx={{ width: 100 }}
          />
        </Stack>
      )}

      {mode === "pattern" && (
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <TextField
            size="small"
            type="color"
            value={fg}
            onChange={(e) => setFg(e.target.value)}
          />
          <TextField
            size="small"
            type="color"
            value={bg}
            onChange={(e) => setBg(e.target.value)}
          />
          <Select
            size="small"
            value={pattern}
            onChange={(e) => setPattern(e.target.value as any)}
          >
            <MenuItem value="stripes">Stripes</MenuItem>
            <MenuItem value="dots">Dots</MenuItem>
          </Select>
        </Stack>
      )}

      <Divider sx={{ my: 1 }} />
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        Palettes
      </Typography>
      {PaletteButtons}
    </Box>
  );
};

export default ColorControls;
