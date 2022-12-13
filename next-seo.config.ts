import { DefaultSeoProps } from "next-seo";

const config: DefaultSeoProps = {
  title: "Weather App",
  description: "View current, hourly, and daily weather of a city",
  canonical: "https://ys-weather-app.netlify.app/",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ys-weather-app.netlify.app/",
    siteName: "Weather App",
  },
};

export default config;
