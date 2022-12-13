/**
 * Displays wind direction icon
 */

import {
  WiDirectionUp,
  WiDirectionUpRight,
  WiDirectionRight,
  WiDirectionDownRight,
  WiDirectionDown,
  WiDirectionDownLeft,
  WiDirectionLeft,
  WiDirectionUpLeft,
} from "react-icons/wi";

const useWindDirection = (angle: number) => {
  const directions = [
    WiDirectionUp,
    WiDirectionUpRight,
    WiDirectionRight,
    WiDirectionDownRight,
    WiDirectionDown,
    WiDirectionDownLeft,
    WiDirectionLeft,
    WiDirectionUpLeft,
  ];

  return directions[Math.round(angle / 45) % 8];
};

export default useWindDirection;
