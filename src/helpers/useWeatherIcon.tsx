/**
 * Depending on the current weather condition, displays the appropriate icon
 */

import {
  WiDaySunny,
  WiNightClear,
  WiDayCloudy,
  WiNightCloudy,
  WiCloud,
  WiCloudy,
  WiShowers,
  WiDayRain,
  WiNightRain,
  WiThunderstorm,
  WiSnowflakeCold,
  WiFog,
} from "react-icons/wi";

const useWeatherIcon = (code: string, isDay: boolean) => {
  switch (code) {
    case "01d":
      return WiDaySunny;
    case "01n":
      return WiNightClear;
    case "02d":
      return WiDayCloudy;
    case "02n":
      return WiNightCloudy;
    case "03d":
    case "03n":
      return WiCloud;
    case "04d":
    case "04n":
      return WiCloudy;
    case "09d":
    case "09n":
      return WiShowers;
    case "10d":
      return WiDayRain;
    case "10n":
      return WiNightRain;
    case "11d":
    case "11n":
      return WiThunderstorm;
    case "13d":
    case "13n":
      return WiSnowflakeCold;
    case "50d":
    case "50n":
      return WiFog;
    default:
      return null;
  }
};

export default useWeatherIcon;
