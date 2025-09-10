import { DEFAULT_FILL } from "./layouts";
import type { FillType } from "./types";

export const getKeyFillCss = (fill: FillType = DEFAULT_FILL): string => {
  switch (fill.kind) {
    case "solid":
      return fill.color;
    case "gradient":
      return `linear-gradient(${fill.angleDeg}deg, ${fill.from}, ${fill.to})`;
    case "pattern":
      if (fill.pattern === "stripes") {
        return `repeating-linear-gradient(45deg, ${fill.bg} 0 8px, ${fill.fg} 8px 16px)`;
      }
      return `radial-gradient(${fill.fg} 10%, ${fill.bg} 11%)`;
  }
};
