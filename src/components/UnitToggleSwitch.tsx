/**
 * Toggle switch for imperial/metric units
 */

import { Button, ButtonGroup, useColorMode } from "@chakra-ui/react";
import { useContext } from "react";

import { UnitContext } from "../contexts/UnitContext";

export const UnitToggleSwitch = () => {
  const { unit, setUnit } = useContext(UnitContext);
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const bgColor = isDark ? "gray.600" : "gray.300";
  const activeBgColor = isDark ? "teal.600" : "teal.300";

  return (
    <ButtonGroup isAttached size="xs">
      <Button
        onClick={() => setUnit("imperial")}
        isActive={unit === "imperial"}
        _active={{ bgColor: activeBgColor }}
        bgColor={bgColor}
      >
        Imperial: &deg;F, mph
      </Button>
      <Button
        onClick={() => setUnit("metric")}
        isActive={unit === "metric"}
        _active={{ bgColor: activeBgColor }}
        bgColor={bgColor}
      >
        Metric: &deg;C, m/s
      </Button>
    </ButtonGroup>
  );
};
