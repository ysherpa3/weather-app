// 404 not found error page

import { Button, Typography } from "@material-ui/core"
import { navigate } from "gatsby"
import * as React from "react"

const NotFoundPage = () => (
  <>
    <Typography variant="h1" align="center">
      404
    </Typography>
    <Typography variant="h6" align="center" paragraph>
      Oops! Page not found
    </Typography>
    <Typography variant="subtitle2" align="center" paragraph>
      We cannot find the page you are looking for! Click the button below to go
      back to the homepage.
    </Typography>
    <Typography align="center">
      <Button
        variant="contained"
        onClick={e => {
          e.preventDefault()
          navigate("/")
        }}
        sx={{ textTransform: "none" }}
      >
        Go to Homepage
      </Button>
    </Typography>
  </>
)

export default NotFoundPage
