module.exports = {
  siteMetadata: {
    title: `Gatsby Weather App`,
    description: `Simple weather information displaying app built using GatsbyJs, Material-UI and OpenWeatherMap API.`,
    author: `Yogesh Sherpa <ysherpa37@gmail.com>`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `weather-app`,
        short_name: `weather`,
        start_url: `/`,
        background_color: `#f5f5f5`,
        theme_color: `#455a64`,
        display: `minimal-ui`,
        icon: `src/images/weather-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-gatsby-cloud`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
