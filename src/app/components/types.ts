export type KeyId = string;

export type FillType =
  | { kind: "solid"; color: string }
  | { kind: "gradient"; from: string; to: string; angleDeg: number }
  | { kind: "pattern"; fg: string; bg: string; pattern: "stripes" | "dots" };

export interface KeyDefinition {
  id: KeyId;
  label: string;
  w?: number; // width units
  h?: number; // height units
}

export interface KeyboardLayout {
  id: "60" | "tkl" | "full";
  name: string;
  rows: KeyDefinition[][];
}

export interface DesignState {
  layoutId: KeyboardLayout["id"];
  keyFills: Record<KeyId, FillType>;
  selectedKeyId?: KeyId;
}

export interface SavedDesign {
  id: string;
  name: string;
  state: DesignState;
  savedAt: number;
}


