"use client";
import React, { useMemo } from "react";
import { Box } from "@mui/material";
import { LAYOUTS, DEFAULT_FILL } from "./layouts";
import { useDesign } from "./DesignContext";
import { getKeyFillCss } from "./utils";

const UNIT = 48; // px per 1u

const Keycap: React.FC<{
  id: string;
  label: string;
  w?: number;
  h?: number;
}> = ({ id, label, w = 1, h = 1 }) => {
  const { state, selectKey } = useDesign();
  const fill = state.keyFills[id] ?? DEFAULT_FILL;
  const isSelected = state.selectedKeyId === id;

  return (
    <Box
      onClick={() => selectKey(id)}
      sx={{
        width: `${w * UNIT}px`,
        height: `${h * UNIT}px`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 1,
        cursor: "pointer",
        userSelect: "none",
        background: getKeyFillCss(fill),
        boxShadow:
          "0 2px 0 rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.3)",
        transform: "perspective(600px) rotateX(5deg)",
        border: isSelected ? "2px solid #8c52ff" : "1px solid #cfcfcf",
        transition: "border 120ms ease",
        fontWeight: 600,
      }}
    >
      {label}
    </Box>
  );
};

export const KeyboardGrid: React.FC = () => {
  const { state } = useDesign();
  const layout = LAYOUTS[state.layoutId];

  const rows = useMemo(() => layout.rows, [layout]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {rows.map((row, idx) => (
        <Box key={idx} sx={{ display: "flex", gap: 1 }}>
          {row.map((k) => (
            <Keycap key={k.id} id={k.id} label={k.label} w={k.w} h={k.h} />
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default KeyboardGrid;
