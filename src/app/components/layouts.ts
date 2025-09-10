import { KeyboardLayout } from "./types";

// Simple unit grid widths. Real layouts simplified for MVP.
export const LAYOUTS: Record<string, KeyboardLayout> = {
  "60": {
    id: "60",
    name: "60%",
    rows: [
      [
        { id: "Esc", label: "Esc" },
        ...Array.from({ length: 12 }, (_, i) => ({
          id: `F${i + 1}`,
          label: `F${i + 1}`,
        })),
      ],
      [
        { id: "`", label: "`" },
        ..."1234567890-=".split("").map((c) => ({ id: c, label: c })),
        { id: "Backspace", label: "Backspace", w: 2 },
      ],
      [
        { id: "Tab", label: "Tab", w: 1.5 },
        ..."qwertyuiop[]"
          .toUpperCase()
          .split("")
          .map((c) => ({ id: c, label: c })),
        { id: "\\", label: "\\" },
      ],
      [
        { id: "CapsLock", label: "Caps", w: 1.75 },
        ..."asdfghjkl;'"
          .toUpperCase()
          .split("")
          .map((c) => ({ id: c, label: c })),
        { id: "Enter", label: "Enter", w: 2.25 },
      ],
      [
        { id: "ShiftLeft", label: "Shift", w: 2.25 },
        ..."zxcvbnm,./"
          .toUpperCase()
          .split("")
          .map((c) => ({ id: c, label: c })),
        { id: "ShiftRight", label: "Shift", w: 2.75 },
      ],
      [
        { id: "Ctrl", label: "Ctrl", w: 1.25 },
        { id: "Meta", label: "Win", w: 1.25 },
        { id: "Alt", label: "Alt", w: 1.25 },
        { id: "Space", label: "Space", w: 6.25 },
        { id: "AltGr", label: "Alt", w: 1.25 },
        { id: "Menu", label: "Menu", w: 1.25 },
        { id: "CtrlRight", label: "Ctrl", w: 1.25 },
      ],
    ],
  },
  tkl: {
    id: "tkl",
    name: "TKL",
    rows: [
      [
        { id: "Esc", label: "Esc" },
        ...Array.from({ length: 12 }, (_, i) => ({
          id: `F${i + 1}`,
          label: `F${i + 1}`,
        })),
        { id: "PrtSc", label: "PrtSc" },
        { id: "Scroll", label: "ScrLk" },
        { id: "Pause", label: "Pause" },
      ],
      [
        { id: "`", label: "`" },
        ..."1234567890-=".split("").map((c) => ({ id: c, label: c })),
        { id: "Backspace", label: "Backspace", w: 2 },
        { id: "Ins", label: "Ins" },
        { id: "Home", label: "Home" },
        { id: "PgUp", label: "PgUp" },
      ],
      [
        { id: "Tab", label: "Tab", w: 1.5 },
        ..."qwertyuiop[]"
          .toUpperCase()
          .split("")
          .map((c) => ({ id: c, label: c })),
        { id: "\\", label: "\\" },
        { id: "Del", label: "Del" },
        { id: "End", label: "End" },
        { id: "PgDn", label: "PgDn" },
      ],
      [
        { id: "CapsLock", label: "Caps", w: 1.75 },
        ..."asdfghjkl;'"
          .toUpperCase()
          .split("")
          .map((c) => ({ id: c, label: c })),
        { id: "Enter", label: "Enter", w: 2.25 },
      ],
      [
        { id: "ShiftLeft", label: "Shift", w: 2.25 },
        ..."zxcvbnm,./"
          .toUpperCase()
          .split("")
          .map((c) => ({ id: c, label: c })),
        { id: "ShiftRight", label: "Shift", w: 2.75 },
        { id: "Up", label: "↑" },
      ],
      [
        { id: "Ctrl", label: "Ctrl", w: 1.25 },
        { id: "Meta", label: "Win", w: 1.25 },
        { id: "Alt", label: "Alt", w: 1.25 },
        { id: "Space", label: "Space", w: 6.25 },
        { id: "AltGr", label: "Alt", w: 1.25 },
        { id: "Menu", label: "Menu", w: 1.25 },
        { id: "CtrlRight", label: "Ctrl", w: 1.25 },
        { id: "Left", label: "←" },
        { id: "Down", label: "↓" },
        { id: "Right", label: "→" },
      ],
    ],
  },
  full: {
    id: "full",
    name: "Full-Size",
    rows: [
      [
        { id: "Esc", label: "Esc" },
        ...Array.from({ length: 12 }, (_, i) => ({
          id: `F${i + 1}`,
          label: `F${i + 1}`,
        })),
        { id: "PrtSc", label: "PrtSc" },
        { id: "Scroll", label: "ScrLk" },
        { id: "Pause", label: "Pause" },
        { id: "NumLock", label: "Num" },
        { id: "/", label: "/" },
        { id: "*", label: "*" },
        { id: "-", label: "-" },
      ],
      [
        { id: "`", label: "`" },
        ..."1234567890-=".split("").map((c) => ({ id: c, label: c })),
        { id: "Backspace", label: "Backspace", w: 2 },
        { id: "Ins", label: "Ins" },
        { id: "Home", label: "Home" },
        { id: "PgUp", label: "PgUp" },
        { id: "N7", label: "7" },
        { id: "N8", label: "8" },
        { id: "N9", label: "9" },
        { id: "N+", label: "+", h: 2 },
      ],
      [
        { id: "Tab", label: "Tab", w: 1.5 },
        ..."qwertyuiop[]"
          .toUpperCase()
          .split("")
          .map((c) => ({ id: c, label: c })),
        { id: "\\", label: "\\" },
        { id: "Del", label: "Del" },
        { id: "End", label: "End" },
        { id: "PgDn", label: "PgDn" },
        { id: "N4", label: "4" },
        { id: "N5", label: "5" },
        { id: "N6", label: "6" },
      ],
      [
        { id: "CapsLock", label: "Caps", w: 1.75 },
        ..."asdfghjkl;'"
          .toUpperCase()
          .split("")
          .map((c) => ({ id: c, label: c })),
        { id: "Enter", label: "Enter", w: 2.25 },
        { id: "N1", label: "1" },
        { id: "N2", label: "2" },
        { id: "N3", label: "3" },
        { id: "NEnter", label: "Enter", h: 2 },
      ],
      [
        { id: "ShiftLeft", label: "Shift", w: 2.25 },
        ..."zxcvbnm,./"
          .toUpperCase()
          .split("")
          .map((c) => ({ id: c, label: c })),
        { id: "ShiftRight", label: "Shift", w: 2.75 },
        { id: "Up", label: "↑" },
        { id: "N0", label: "0", w: 2 },
        { id: "N.", label: "." },
      ],
      [
        { id: "Ctrl", label: "Ctrl", w: 1.25 },
        { id: "Meta", label: "Win", w: 1.25 },
        { id: "Alt", label: "Alt", w: 1.25 },
        { id: "Space", label: "Space", w: 6.25 },
        { id: "AltGr", label: "Alt", w: 1.25 },
        { id: "Menu", label: "Menu", w: 1.25 },
        { id: "CtrlRight", label: "Ctrl", w: 1.25 },
        { id: "Left", label: "←" },
        { id: "Down", label: "↓" },
        { id: "Right", label: "→" },
      ],
    ],
  },
};

export const DEFAULT_FILL = { kind: "solid" as const, color: "#ececec" };
