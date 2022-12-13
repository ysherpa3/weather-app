/**
 * Displays hourly weather information of the next 12 hours
 */

import {
  Flex,
  HStack,
  Icon,
  Stack,
  StackDivider,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { WiRaindrop } from "react-icons/wi";
import useWeatherIcon from "../helpers/useWeatherIcon";

export const HourlyWeather = ({ data }) => {
  const popCheck = data.filter((item) => Math.round(item.pop) >= 1).length;

  return (
    <HStack
      justify="space-between"
      overflowX="auto"
      bgColor="bg"
      divider={<StackDivider />}
      p={4}
      boxShadow="lg"
      borderRadius="8px"
    >
      {data?.map((item, index) => (
        <Stack
          key={index}
          align="center"
          minW="50px"
          minH={popCheck ? "125px" : "auto"}
        >
          <Text fontSize="sm">{item.time}</Text>
          <Text fontSize="md" fontWeight="semibold" color="primary">
            {item.temp}&deg;
          </Text>
          <Tooltip label={item.condition}>
            <span>
              <Icon
                as={useWeatherIcon(item.icon, item.isDay)}
                w={8}
                h={8}
                color="icon"
              />
            </span>
          </Tooltip>
          {popCheck && (
            <Flex align="center">
              {Math.round(item.pop) >= 1 && (
                <Icon as={WiRaindrop} color="blue.500" />
              )}
              <Text fontSize="xs">
                {Math.round(item.pop) >= 1 ? `${Math.round(item.pop)}%` : ""}
              </Text>
            </Flex>
          )}
          )
        </Stack>
      ))}
    </HStack>
  );
};
