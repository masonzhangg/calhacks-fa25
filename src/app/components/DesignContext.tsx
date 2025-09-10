"use client";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { DEFAULT_FILL, LAYOUTS } from "./layouts";
import type { DesignState, FillType, KeyId } from "./types";

const STORAGE_KEY = "keycap-designer-state-v1";

type DesignContextValue = {
  state: DesignState;
  setLayout: (id: DesignState["layoutId"]) => void;
  setKeyFill: (keyId: KeyId, fill: FillType) => void;
  selectKey: (keyId?: KeyId) => void;
  resetDesign: () => void;
  exportJSON: () => string;
  importJSON: (json: string) => void;
};

const DesignContext = createContext<DesignContextValue | undefined>(undefined);

export const DesignProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<DesignState>(() => {
    if (typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) return JSON.parse(raw) as DesignState;
      } catch {}
    }
    const firstLayout = LAYOUTS["60"].id;
    return { layoutId: firstLayout, keyFills: {} };
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }, [state]);

  const setLayout = useCallback((id: DesignState["layoutId"]) => {
    setState((prev) => ({ ...prev, layoutId: id }));
  }, []);

  const setKeyFill = useCallback((keyId: KeyId, fill: FillType) => {
    setState((prev) => ({
      ...prev,
      keyFills: { ...prev.keyFills, [keyId]: fill },
    }));
  }, []);

  const selectKey = useCallback((keyId?: KeyId) => {
    setState((prev) => ({ ...prev, selectedKeyId: keyId }));
  }, []);

  const resetDesign = useCallback(() => {
    setState((prev) => ({ ...prev, keyFills: {} }));
  }, []);

  const exportJSON = useCallback(() => JSON.stringify(state, null, 2), [state]);

  const importJSON = useCallback((json: string) => {
    try {
      const parsed = JSON.parse(json) as DesignState;
      if (!parsed || !parsed.layoutId || !parsed.keyFills)
        throw new Error("invalid");
      setState(parsed);
    } catch {}
  }, []);

  const value = useMemo(
    () => ({
      state,
      setLayout,
      setKeyFill,
      selectKey,
      resetDesign,
      exportJSON,
      importJSON,
    }),
    [
      state,
      setLayout,
      setKeyFill,
      selectKey,
      resetDesign,
      exportJSON,
      importJSON,
    ]
  );

  return (
    <DesignContext.Provider value={value}>{children}</DesignContext.Provider>
  );
};

export const useDesign = () => {
  const ctx = useContext(DesignContext);
  if (!ctx) throw new Error("useDesign must be used within DesignProvider");
  return ctx;
};

