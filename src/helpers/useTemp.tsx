/**
 * Depending on the unit selected, displays the temperature in F or C
 */

import { useContext } from "react";

import { UnitContext } from "../contexts/UnitContext";

const useTemp = (temp: number) => {
  const { unit } = useContext(UnitContext);

  if (unit === "metric") {
    return Math.round(temp - 273.15);
  }

  return Math.round((9 / 5) * (temp - 273) + 32);
};

export default useTemp;
