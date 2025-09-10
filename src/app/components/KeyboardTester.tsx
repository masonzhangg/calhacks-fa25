"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Box, Typography, Chip, Stack } from "@mui/material";
import { LAYOUTS } from "./layouts";
import { useDesign } from "./DesignContext";

const UNIT = 32; // Smaller unit for tester

const TestKeycap: React.FC<{
  id: string;
  label: string;
  w?: number;
  h?: number;
  isPressed: boolean;
}> = ({ id, label, w = 1, h = 1, isPressed }) => {
  return (
    <Box
      sx={{
        width: `${w * UNIT}px`,
        height: `${h * UNIT}px`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 1,
        userSelect: "none",
        backgroundColor: isPressed ? "#8c52ff" : "#f5f5f5",
        color: isPressed ? "white" : "#333",
        border: isPressed ? "2px solid #C17BC1" : "1px solid #ddd",
        transition: "all 0.1s ease",
        transform: isPressed ? "scale(0.95)" : "scale(1)",
        boxShadow: isPressed
          ? "0 4px 12px rgba(140, 82, 255, 0.3)"
          : "0 2px 4px rgba(0,0,0,0.1)",
        fontWeight: 600,
        fontSize: "0.75rem",
      }}
    >
      {label}
    </Box>
  );
};

const KeyboardTester: React.FC = () => {
  const { state } = useDesign();
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  const [lastPressed, setLastPressed] = useState<string>("");

  const layout = LAYOUTS[state.layoutId];

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const key = event.key;
    setLastPressed(key);
    setPressedKeys((prev) => new Set([...prev, key]));
  }, []);

  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    const key = event.key;
    setPressedKeys((prev) => {
      const newSet = new Set(prev);
      newSet.delete(key);
      return newSet;
    });
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  // Map common key variations to our key IDs
  const getKeyId = (key: string): string => {
    const keyMap: Record<string, string> = {
      " ": "Space",
      Enter: "Enter",
      Backspace: "Backspace",
      Tab: "Tab",
      CapsLock: "CapsLock",
      Shift: "ShiftLeft",
      Control: "Ctrl",
      Meta: "Meta",
      Alt: "Alt",
      ArrowUp: "Up",
      ArrowDown: "Down",
      ArrowLeft: "Left",
      ArrowRight: "Right",
      Escape: "Esc",
      F1: "F1",
      F2: "F2",
      F3: "F3",
      F4: "F4",
      F5: "F5",
      F6: "F6",
      F7: "F7",
      F8: "F8",
      F9: "F9",
      F10: "F10",
      F11: "F11",
      F12: "F12",
    };

    return keyMap[key] || key.toUpperCase();
  };

  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: "#fff",
        borderRadius: 2,
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      }}
    >
      <Stack spacing={3}>
        <Box>
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{ mb: 1, color: "#333" }}
          >
            Keyboard Tester
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Press keys on your physical keyboard to test them.
          </Typography>

          {lastPressed && (
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="body2" color="text.secondary">
                Last pressed:
              </Typography>
              <Chip
                label={lastPressed}
                size="small"
                sx={{
                  backgroundColor: "#8c52ff",
                  color: "white",
                  fontWeight: 600,
                }}
              />
            </Stack>
          )}
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {layout.rows.map((row, idx) => (
            <Box
              key={idx}
              sx={{ display: "flex", gap: 1, justifyContent: "center" }}
            >
              {row.map((k) => {
                const keyId = getKeyId(k.id);
                const isPressed =
                  pressedKeys.has(k.id) || pressedKeys.has(keyId);
                return (
                  <TestKeycap
                    key={k.id}
                    id={k.id}
                    label={k.label}
                    w={k.w}
                    h={k.h}
                    isPressed={isPressed}
                  />
                );
              })}
            </Box>
          ))}
        </Box>
      </Stack>
    </Box>
  );
};

export default KeyboardTester;
