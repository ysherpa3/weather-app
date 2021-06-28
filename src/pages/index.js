import { createTheme, responsiveFontSizes } from "@material-ui/core"
import * as React from "react"

import CitySearch from "../components/city-search"
import { ColorModeContext } from "../components/color-mode/ToggleColorMode"
import Layout from "../components/layout"
import WeatherCard from "../components/weather-card"

const IndexPage = () => {
  const [mode, setMode] = React.useState("light")
  const [selectedCity, setselectedCity] = React.useState(null)
  const [tempUnit, setTempUnit] = React.useState("imperial")

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode(prevMode => (prevMode === "light" ? "dark" : "light"))
      },
    }),
    []
  )

  let theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            main: "#1f5e89",
          },
          secondary: {
            main: "#f7c652",
          },
          mode,
        },
        typography: {
          fontFamily: "Open Sans",
        },
      }),
    [mode]
  )

  theme = responsiveFontSizes(theme)

  return (
    <ColorModeContext.Provider value={colorMode}>
      <Layout
        theme={theme}
        checked={tempUnit === "metric"}
        onChange={e =>
          tempUnit === "imperial"
            ? setTempUnit("metric")
            : setTempUnit("imperial")
        }
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: theme.spacing(0.5),
          }}
        >
          <CitySearch
            value={selectedCity}
            onChange={(e, newValue) => setselectedCity(newValue)}
            theme={theme}
          />
          <WeatherCard
            selectedCity={selectedCity}
            tempUnit={tempUnit}
            theme={theme}
          />
        </div>
      </Layout>
    </ColorModeContext.Provider>
  )
}

export default IndexPage
