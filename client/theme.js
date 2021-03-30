import { createMuiTheme } from '@material-ui/core/styles'
import { blueGrey, lightGreen } from '@material-ui/core/colors'

const theme = createMuiTheme({
    palette: {
      primary: {
      light: '#90d4a2',
      main: '#90d4a2',
      dark: '#90d4a2',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ffffff',
      main: '#ffffff',
      dark: '#ffffff',
      contrastText: '#000',
    },
      openTitle: blueGrey['400'],
      protectedTitle: '#90d4a2',
      type: 'light'
    },
    breakpoints: {
      values: {
        desktop: 1280,
      }
    }
  })

  export default theme