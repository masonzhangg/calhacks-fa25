"use client";
import React, { useMemo, useRef } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { LAYOUTS } from "./layouts";
import { useDesign } from "./DesignContext";
import { getKeyFillCss } from "./utils";

const PreviewKeyboard: React.FC = () => {
  const { state } = useDesign();
  const layout = LAYOUTS[state.layoutId];
  return (
    <Box
      sx={{
        p: 1,
        border: "1px solid #eee",
        borderRadius: 1,
        backgroundColor: "#fff",
      }}
    >
      {layout.rows.map((row, i) => (
        <Box key={i} sx={{ display: "flex", gap: 0.5, mb: 0.5 }}>
          {row.map((k) => (
            <Box
              key={k.id}
              sx={{
                width: `${(k.w ?? 1) * 24}px`,
                height: `${(k.h ?? 1) * 24}px`,
                background: getKeyFillCss(state.keyFills[k.id]),
                borderRadius: 0.5,
                border: "1px solid #ddd",
              }}
            />
          ))}
        </Box>
      ))}
    </Box>
  );
};

const Previews: React.FC = () => {
  const { exportJSON, importJSON } = useDesign();
  const inputRef = useRef<HTMLInputElement>(null);

  const downloadJSON = () => {
    const data = exportJSON();
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "keycap-design.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const text = String(reader.result);
      importJSON(text);
    };
    reader.readAsText(file);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Typography variant="subtitle1" fontWeight={700}>
        Preview
      </Typography>
      <PreviewKeyboard />
      <Stack direction="row" spacing={1}>
        <Button
          onClick={downloadJSON}
          variant="outlined"
          sx={{ textTransform: "none" }}
        >
          Export JSON
        </Button>
        <Button
          onClick={() => inputRef.current?.click()}
          variant="outlined"
          sx={{ textTransform: "none" }}
        >
          Import JSON
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept="application/json"
          hidden
          onChange={onUpload}
        />
      </Stack>
    </Box>
  );
};

export default Previews;
