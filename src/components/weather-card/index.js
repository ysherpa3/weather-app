// Card component with weather information of the selected city

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  lighten,
  Typography,
} from "@material-ui/core"
import dayjs from "dayjs"
import isToday from "dayjs/plugin/isToday"
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"
import fetch from "isomorphic-fetch"
import * as React from "react"

import DailyWeather from "./DailyWeather"
import DetailTiles from "./DetailTiles"
import { getRainChanceIcon } from "./getRainChanceIcon"
import { getUVIndex } from "./getUVIndex"
import HourlyWeather from "./HourlyWeather"

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(isToday)

const WeatherCard = ({ selectedCity, tempUnit, theme }) => {
  const [weatherData, setWeatherData] = React.useState(null)
  const [showHourly, setShowHourly] = React.useState(false)
  const [showDaily, setShowDaily] = React.useState(false)

  // Retrieves country/region name given a 2-letter country abbreviation
  const regionName = new Intl.DisplayNames(["en"], { type: "region" })

  // Fetch weather data from OpenWeatherMap One Call API
  React.useEffect(() => {
    if (selectedCity) {
      fetch(
        `${process.env.GATSBY_OWM_API_URL}?lat=${selectedCity.coord.lat}&lon=${selectedCity.coord.lon}&exclude=minutely,alerts&units=${tempUnit}&appid=${process.env.GATSBY_OWM_API_KEY}`
      )
        .then(response => response.json())
        .then(data => setWeatherData(data))
    }
  }, [selectedCity, tempUnit])

  const currentData = weatherData ? weatherData.current : null
  const hourlyData = weatherData ? weatherData.hourly : null
  const dailyData = weatherData ? weatherData.daily : null

  const currentDateTime =
    weatherData && dayjs(currentData.dt * 1000).tz(weatherData.timezone)
  const sunriseTime =
    weatherData && dayjs(currentData.sunrise * 1000).tz(weatherData.timezone)
  const sunsetTime =
    weatherData && dayjs(currentData.sunset * 1000).tz(weatherData.timezone)

  return (
    selectedCity &&
    weatherData && (
      <Card
        elevation={1}
        sx={{
          margin: theme.spacing(3, 0),
          maxWidth: 600,
          width: "100%",
          backgroundColor:
            theme.palette.mode === "dark"
              ? theme.palette.background.paper
              : lighten(theme.palette.primary.light, 0.75),
        }}
      >
        {/* Displays selected city name, state name (if located in the United States), country name */}
        <CardHeader
          title={selectedCity.name}
          subheader={
            selectedCity.state
              ? `${selectedCity.state}, ${regionName.of(selectedCity.country)}`
              : regionName.of(selectedCity.country)
          }
        />
        <CardContent>
          {/* Displays current day of the week & time of the selected city */}
          <Typography variant="subtitle1">
            {currentDateTime.format("dddd, h:mm A")}
          </Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              padding: theme.spacing(1, 0),
              margin: theme.spacing(1, 0),
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              {/* Displays the current temperature of the selected city */}
              <Typography variant="h1">
                {Math.round(currentData.temp)}°
              </Typography>
              {/* Displays what the temperature will feel like for the selected city, depending on the wind chill or heat index */}
              <Typography variant="caption">
                Feels like {Math.round(currentData.feels_like)}°
              </Typography>
            </div>
            {/* Displays icon of current weather condition of the selected city */}
            <img
              src={`${process.env.GATSBY_OWN_ICON_URL}/${currentData.weather[0].icon}@2x.png`}
              alt={currentData.weather[0].description}
              title={currentData.weather[0].description}
            />
          </div>
          <DetailTiles
            theme={theme}
            currentData={currentData}
            tempUnit={tempUnit}
            getUVIndex={getUVIndex}
            dailyData={dailyData}
            sunriseTime={sunriseTime}
            sunsetTime={sunsetTime}
          />
          {/* Hourly weather data for 24 hours */}
          <div style={{ textAlign: "center", margin: theme.spacing(2, 0) }}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => setShowHourly(!showHourly)}
              color={theme.palette.mode === "dark" ? "secondary" : "primary"}
              sx={{ textTransform: "none" }}
            >
              {showHourly ? "Hide Hourly Weather" : "Show Hourly Weather"}
            </Button>
          </div>
          {showHourly ? (
            <HourlyWeather
              hourlyData={hourlyData}
              theme={theme}
              dayjs={dayjs}
              weatherData={weatherData}
              getRainChanceIcon={getRainChanceIcon}
            />
          ) : null}
          {/* Daily weather data for 1 week */}
          <div style={{ textAlign: "center", margin: theme.spacing(2, 0) }}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => setShowDaily(!showDaily)}
              color={theme.palette.mode === "dark" ? "secondary" : "primary"}
              sx={{ textTransform: "none" }}
            >
              {showDaily ? "Hide Daily Weather" : "Show Daily Weather"}
            </Button>
          </div>
          {showDaily ? (
            <DailyWeather
              dailyData={dailyData}
              theme={theme}
              dayjs={dayjs}
              weatherData={weatherData}
              getRainChanceIcon={getRainChanceIcon}
            />
          ) : null}
        </CardContent>
      </Card>
    )
  )
}

export default WeatherCard
