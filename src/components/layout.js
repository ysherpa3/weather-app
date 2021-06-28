// Layout component

import { Box, CssBaseline, Divider } from "@material-ui/core"
import { ThemeProvider } from "@material-ui/core/styles"
import { graphql, useStaticQuery } from "gatsby"
import PropTypes from "prop-types"
import * as React from "react"

import ToggleColorMode from "./color-mode/ToggleColorMode"
import Footer from "./footer"
import Header from "./header"
import Seo from "./seo"
import ToggleUnits from "./toggle-units"

const Layout = ({ children, theme, checked, onChange }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Seo />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: "100vh",
        }}
      >
        <div>
          <Header
            siteTitle={data.site.siteMetadata?.title || `Title`}
            theme={theme}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              "& hr": {
                m: "8px 16px 8px 4px",
              },
            }}
          >
            <ToggleColorMode theme={theme} />
            <Divider orientation="vertical" variant="middle" flexItem />
            <ToggleUnits checked={checked} onChange={onChange} theme={theme} />
          </Box>
        </div>
        <main
          style={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            padding: theme.spacing(1, 0),
          }}
        >
          {children}
        </main>
        <Footer year={new Date().getFullYear() || `2021`} />
      </div>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
