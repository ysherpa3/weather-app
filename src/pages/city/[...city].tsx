import { Flex, Heading, Link, Stack } from "@chakra-ui/react";
import { format, utcToZonedTime } from "date-fns-tz";
import { GetServerSideProps } from "next";
import NextLink from "next/link";
import { ReactElement, useContext } from "react";

import { CurrentWeather } from "../../components/CurrentWeather";
import { DailyWeather } from "../../components/DailyWeather";
import { HourlyWeather } from "../../components/HourlyWeather";
import { Layout } from "../../components/Layout";
import { UnitContext } from "../../contexts/UnitContext";
import useTemp from "../../helpers/useTemp";
import type { NextPageWithLayout } from "../_app";

const City: NextPageWithLayout = ({
  currentData,
  hourlyData,
  dailyData,
  query,
  timezone,
}: any) => {
  const { unit } = useContext(UnitContext);

  const zonedDate = utcToZonedTime(currentData?.dt * 1000, timezone);
  const currentTime = format(zonedDate, "EEEE, MMM dd h:mm a", timezone);

  // Check if it is currently day or night at selected city
  const isDay = () => {
    const currentTime = format(zonedDate, "k", timezone);

    if (Number(currentTime) > 6 && Number(currentTime) < 18) {
      return true;
    }

    return false;
  };

  // Hourly weather data of 12 hours
  const hourlyWeatherData = hourlyData.slice(0, 12).map((data) => ({
    time:
      format(utcToZonedTime(data?.dt * 1000, timezone), "h aaa", timezone) ===
      format(zonedDate, "h aaa", timezone)
        ? "Now"
        : format(utcToZonedTime(data?.dt * 1000, timezone), "h aaa", timezone),
    temp: useTemp(data?.temp),
    pop: data?.pop * 100,
    icon: data?.weather[0].icon,
    condition: data?.weather[0].description,
    isDay: isDay(),
  }));

  // Daily weather data
  const dailyWeatherData = dailyData.map((data) => ({
    day:
      format(utcToZonedTime(data?.dt * 1000, timezone), "ccc d", timezone) ===
      format(zonedDate, "ccc d", timezone)
        ? "Today"
        : format(utcToZonedTime(data?.dt * 1000, timezone), "ccc d", timezone),
    highTemp: useTemp(data?.temp.max),
    lowTemp: useTemp(data?.temp.min),
    pop: data?.pop * 100,
    icon: data?.weather[0].icon,
    condition: data?.weather[0].description,
    isDay: isDay(),
  }));

  return (
    <Stack flexGrow="1" spacing={8} align="center" w="100%">
      <Link
        as={NextLink}
        href="/"
        color="primary"
        textDecor="underline"
        fontSize="sm"
      >
        Search for another city?
      </Link>
      <Flex maxW="24rem" w="100%">
        <CurrentWeather
          query={query}
          currentTime={currentTime}
          currentData={currentData}
          isDay={isDay}
          dailyData={dailyData}
          unit={unit}
        />
      </Flex>
      <Stack maxW="56rem" pt={8} spacing={8} w="100%">
        <Heading size="md" textAlign="center" fontWeight="semibold">
          Hourly Forecast
        </Heading>
        <HourlyWeather data={hourlyWeatherData} />
      </Stack>
      <Stack maxW="56rem" pt={8} spacing={8} w="100%">
        <Heading size="md" textAlign="center" fontWeight="semibold">
          Daily Forecast
        </Heading>
        <DailyWeather data={dailyWeatherData} />
      </Stack>
    </Stack>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const { lat, lon } = query;

  // Retrieve data from OpenWeatherMap API
  const response = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${process.env.OPENWEATHERMAP_API_KEY}`
  );

  const data = await response.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  const currentData = data?.current;
  const hourlyData = data?.hourly;
  const dailyData = data?.daily;
  const timezone = data?.timezone;

  return {
    props: {
      currentData,
      hourlyData,
      dailyData,
      query,
      timezone,
    },
  };
};

export default City;

City.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
