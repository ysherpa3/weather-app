import { createContext } from "react";

export type UnitState = {
  unit: string;
  setUnit: React.Dispatch<React.SetStateAction<string>>;
};

export const UnitContext = createContext({
  unit: "imperial",
  setUnit: () => {},
} as UnitState);
