/*
Material-UI Autocomplete component that lists cities with corresponding state (if available) and country.
City list and data provided by OpenWeatherMap.
Country map icons are from react-country-flag package.
*/

import {
  Autocomplete,
  CircularProgress,
  ListSubheader,
  Popper,
  TextField,
  Typography,
} from "@material-ui/core"
import {
  autocompleteClasses,
  createFilterOptions,
} from "@material-ui/core/Autocomplete"
import { styled } from "@material-ui/core/styles"
import match from "autosuggest-highlight/match"
import parse from "autosuggest-highlight/parse"
import * as React from "react"
import ReactCountryFlag from "react-country-flag"

import cityData from "../../../content/city.list.json"
import { getStateName } from "./getStateName"
import ListboxComponent from "./Listbox"

// Retrieves country/region name given a 2-letter country abbreviation
const regionName = new Intl.DisplayNames(["en"], { type: "region" })

// Filters, maps and sorts city names that have at least one alphabet
const OPTIONS = cityData
  .filter(city => city.name.match(/[a-zA-Z]/g))
  .map(city => city)
  .sort(
    (a, b) => a.name[0].toUpperCase().localeCompare(b.name[0].toUpperCase()) // Sorts cities alphabetically.
  )

const StyledPopper = styled(Popper)({
  [`& .${autocompleteClasses.listbox}`]: {
    boxSizing: "border-box",
    "& ul": {
      padding: 0,
      margin: 0,
    },
  },
})

const renderGroup = params => [
  <ListSubheader key={params.key} component="div">
    <b>{params.group}</b>
  </ListSubheader>,
  params.children,
]

const CitySearch = ({ value, onChange, theme }) => {
  const [inputValue, setInputValue] = React.useState("")
  const [options, setOptions] = React.useState([])
  const [isOpen, setIsOpen] = React.useState(false)

  const isLoading = isOpen && options.length === 0

  React.useEffect(() => {
    let isActive = true

    if (!isLoading) {
      return undefined
    }

    ;(async () => {
      if (isActive && inputValue.length > 0) {
        setOptions([...OPTIONS])
      }
    })()

    return () => {
      isActive = false
    }
  }, [isLoading, inputValue])

  React.useEffect(() => {
    if (!isOpen) {
      setOptions([])
    }
  }, [isOpen, inputValue])

  const filterOptions = createFilterOptions({
    limit: 100,
  })

  return (
    <Autocomplete
      id="city-list"
      sx={{ width: "100%", maxWidth: 600 }}
      open={isOpen}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
      loading={isLoading}
      disableListWrap
      filterOptions={filterOptions}
      options={options}
      PopperComponent={StyledPopper}
      ListboxComponent={ListboxComponent}
      renderGroup={renderGroup}
      groupBy={option => option.name[0].toUpperCase()} // Groups cities by their first letter
      renderInput={params => (
        <TextField
          {...params}
          color={theme.palette.mode === "dark" ? "secondary" : "primary"}
          label="Search for a city"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {isLoading ? (
                  <CircularProgress
                    color={
                      theme.palette.mode === "dark" ? "secondary" : "primary"
                    }
                    size={20}
                  />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
      // Returns & highlights matching cities (if any) once an input value is provided
      renderOption={(props, option, { inputValue }) => {
        const matches = match(option.name, inputValue)
        const parts = parse(option.name, matches)

        return (
          <li {...props} key={option.id}>
            <Typography
              variant="body2"
              component="span"
              color={theme.palette.mode === "dark" ? "secondary" : "primary"}
              style={{ flexGrow: 1 }}
            >
              {parts.map((part, index) => (
                <span
                  key={index}
                  style={{
                    fontWeight: part.highlight ? 700 : 400,
                  }}
                >
                  {part.text}
                </span>
              ))}
            </Typography>
            <Typography
              variant="subtitle2"
              component="span"
              style={{ paddingRight: "16px" }}
            >
              {option.state
                ? `${getStateName(option.state)}, ${option.country}`
                : `${option.country}`}
            </Typography>
            <ReactCountryFlag
              countryCode={option.country}
              svg
              title={regionName.of(option.country)}
            />
          </li>
        )
      }}
      getOptionLabel={option => option.name}
      inputValue={inputValue}
      onInputChange={(e, newValue) => setInputValue(newValue)}
      onChange={onChange}
      value={value}
    />
  )
}

export default CitySearch
