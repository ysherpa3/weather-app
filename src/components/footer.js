// Footer component

import { Typography } from "@material-ui/core"
import PropTypes from "prop-types"
import * as React from "react"

const Footer = ({ year }) => (
  <footer
    style={{
      flexShrink: 0,
      width: "100%",
      minHeight: "2.5rem",
    }}
  >
    <Typography align="center">© {year}</Typography>
  </footer>
)

Footer.propTypes = {
  year: PropTypes.number,
}

Footer.defaultProps = {
  year: ``,
}

export default Footer
