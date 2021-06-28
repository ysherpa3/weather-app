// Additional weather information
// Wind speed, humidity, chance of rain, sunrise time, sunset time, UV index

import React from "react"
import {
  WiDaySunny,
  WiHumidity,
  WiShowers,
  WiStrongWind,
  WiSunrise,
  WiSunset,
} from "react-icons/wi"

import Tile from "./Tile"

const DetailTiles = ({
  theme,
  currentData,
  tempUnit,
  getUVIndex,
  dailyData,
  sunriseTime,
  sunsetTime,
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        margin: "12px -10px",
      }}
    >
      <Tile
        icon={
          <WiStrongWind
            size="2rem"
            title="wind speed"
            color={
              theme.palette.mode === "dark"
                ? theme.palette.primary.light
                : theme.palette.primary.main
            }
          />
        }
        value={Math.round(currentData.wind_speed)}
        unit={tempUnit === "imperial" ? "mph" : "m/s"}
        caption="Wind"
      />
      <Tile
        icon={
          <WiHumidity
            size="2rem"
            title="humidity"
            color={
              theme.palette.mode === "dark"
                ? theme.palette.primary.light
                : theme.palette.primary.main
            }
          />
        }
        value={currentData.humidity}
        unit="%"
        caption="Humidity"
      />
      <Tile
        icon={
          <WiShowers
            size="2rem"
            title="probability of precipitation"
            color={
              theme.palette.mode === "dark"
                ? theme.palette.primary.light
                : theme.palette.primary.main
            }
          />
        }
        value={Math.round(dailyData[0].pop * 100)}
        unit="%"
        caption="Precipitation"
      />
      <Tile
        icon={
          <WiSunrise
            size="2rem"
            title="sunrise time"
            color={
              theme.palette.mode === "dark"
                ? theme.palette.secondary.light
                : theme.palette.secondary.dark
            }
          />
        }
        value={sunriseTime.format("h:mm A")}
        caption="Sunrise"
      />
      <Tile
        icon={
          <WiSunset
            size="2rem"
            title="sunset time"
            color={
              theme.palette.mode === "dark"
                ? theme.palette.secondary.light
                : theme.palette.secondary.dark
            }
          />
        }
        value={sunsetTime.format("h:mm A")}
        caption="Sunset"
      />
      <Tile
        icon={
          <WiDaySunny
            size="2rem"
            title="uv index"
            color={
              theme.palette.mode === "dark"
                ? theme.palette.secondary.light
                : theme.palette.secondary.dark
            }
          />
        }
        value={getUVIndex(currentData.uvi)}
        caption="UV Index"
      />
    </div>
  )
}

export default DetailTiles
