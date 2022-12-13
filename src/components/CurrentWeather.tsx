/**
 * Card component that displays current weather information
 */

import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import {
  WiHumidity,
  WiRaindrop,
  WiStrongWind,
  WiThermometer,
} from "react-icons/wi";

import useSpeed from "../helpers/useSpeed";
import { useStateName } from "../helpers/useStateName";
import useTemp from "../helpers/useTemp";
import useWeatherIcon from "../helpers/useWeatherIcon";
import useWindDirection from "../helpers/useWindDirection";

export const CurrentWeather = ({
  query,
  currentTime,
  currentData,
  isDay,
  dailyData,
  unit,
}) => (
  <Card size="lg" boxShadow="lg" w="100%" bgColor="bg">
    <CardHeader>
      <Heading size="lg" color="primary">
        {query?.city[0]}
      </Heading>
      <Text fontSize="md">
        {query?.state
          ? `${useStateName(query.state)}, ${query.country}`
          : `${query.country}`}
      </Text>
      <Text fontSize="sm">{currentTime}</Text>
    </CardHeader>
    <CardBody>
      <HStack justify="center">
        <Icon
          as={useWeatherIcon(currentData?.weather[0].icon, isDay())}
          color="icon"
          w={20}
          h={20}
        />
        <Text fontSize="lg">{currentData?.weather[0].main}</Text>
      </HStack>
      <Flex justify="space-between" align="center">
        <Text fontSize={["4rem", "6rem", "8rem"]} color="primary">
          {useTemp(currentData?.temp)}&deg;
        </Text>
        <Stack divider={<StackDivider />}>
          <Text fontSize="xl">
            {useTemp(dailyData[0]?.temp.max)}&deg;{" "}
            {unit === "imperial" ? "F" : "C"}
          </Text>
          <Text fontSize="xl">
            {useTemp(dailyData[0]?.temp.min)}&deg;{" "}
            {unit === "imperial" ? "F" : "C"}
          </Text>
        </Stack>
      </Flex>
      <SimpleGrid columns={2} spacing={4}>
        <HStack align="center" spacing={4}>
          <Icon as={WiThermometer} w={6} h={6} color="icon" />
          <Box>
            <Text fontSize={["xs", "sm"]}>Feels like</Text>
            <Text fontSize={["sm", "md"]} fontWeight="semibold" color="primary">
              {useTemp(currentData?.feels_like)}&deg;
            </Text>
          </Box>
        </HStack>
        <HStack align="center" spacing={4}>
          <Icon as={WiStrongWind} w={6} h={6} color="icon" />
          <Box>
            <Text fontSize={["xs", "sm"]}>Wind</Text>
            <Flex align="center">
              <Icon
                as={useWindDirection(currentData?.wind_deg)}
                w={6}
                h={6}
                color="primary"
              />
              <Text
                fontSize={["sm", "md"]}
                fontWeight="semibold"
                color="primary"
              >
                {useSpeed(currentData?.wind_speed)}{" "}
                {unit === "imperial" ? "mph" : "m/s"}
              </Text>
            </Flex>
          </Box>
        </HStack>
        <HStack align="center" spacing={4}>
          <Icon as={WiRaindrop} w={6} h={6} color="icon" />
          <Box>
            <Text fontSize={["xs", "sm"]}>Precipitation</Text>
            <Text fontSize={["sm", "md"]} fontWeight="semibold" color="primary">
              {Math.round(dailyData[0]?.pop * 100)}%
            </Text>
          </Box>
        </HStack>
        <HStack align="center" spacing={4}>
          <Icon as={WiHumidity} w={6} h={6} color="icon" />
          <Box>
            <Text fontSize={["xs", "sm"]}>Humidity</Text>
            <Text fontSize={["sm", "md"]} fontWeight="semibold" color="primary">
              {Math.round(currentData?.humidity)}%
            </Text>
          </Box>
        </HStack>
      </SimpleGrid>
    </CardBody>
  </Card>
);
