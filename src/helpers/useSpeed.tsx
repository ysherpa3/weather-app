/**
 * Depending on the unit selected, displays the wind speed in mph or m/s
 */

import { useContext } from "react";

import { UnitContext } from "../contexts/UnitContext";

const useSpeed = (speed: number) => {
  const { unit } = useContext(UnitContext);

  if (unit === "imperial") {
    return Math.round(speed * 2.236936);
  }

  return Math.round(speed);
};

export default useSpeed;
