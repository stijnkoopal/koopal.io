const colors = {
  grey: {
    white: '#fff',
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#eeeeee',
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
    999: '#111',
    black: '#000',
  },
  visualizations: [
    '#f5a34c',
    '#f27074',
    '#47adb9',
    '#a1b973',
    '#7f7f7f',
    '#bbdd31',
    '#1b89e1',
  ],
  primary: '#00413c',
}

const text = {
  primary: colors.grey['200'],
  secondary: colors.grey['400'],
  contrast: colors.grey['900'],
}

const fontFamily = '"Roboto", "Helvetica", "Arial", sans-serif'
const theme = {
  palette: {
    colors,
    text,
    background: {
      default: `radial-gradient(ellipse at bottom, ${colors.primary} 0%, ${colors.grey['999']} 100%)`,
    },
  },
  typography: {
    fontFamily,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    display4: {
      fontSize: '7rem',
      fontWeight: 300,
      fontFamily,
      letterSpacing: '-.04em',
      lineHeight: '1.14286em',
      marginLeft: '-.04em',
      color: text.primary,
    },
    display3: {
      fontSize: '3.5rem',
      fontWeight: 400,
      fontFamily,
      letterSpacing: '-.02em',
      lineHeight: '1.30357em',
      marginLeft: '-.02em',
      color: text.primary,
    },
    display2: {
      fontSize: '2.8125rem',
      fontWeight: 400,
      fontFamily,
      lineHeight: '1.13333em',
      marginLeft: '-.02em',
      color: text.primary,
    },
    display1: {
      fontSize: '2.125rem',
      fontWeight: 400,
      fontFamily,
      lineHeight: '1.20588em',
      color: text.primary,
    },
    headline: {
      fontSize: '1.5rem',
      fontWeight: 400,
      fontFamily,
      lineHeight: '1.35417em',
      color: text.primary,
    },
    title: {
      fontSize: '1.3125rem',
      fontWeight: 500,
      fontFamily,
      lineHeight: '1.16667em',
      color: text.primary,
    },
    subheading: {
      fontSize: '1rem',
      fontWeight: 400,
      fontFamily,
      lineHeight: '1.5em',
      color: text.primary,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      fontFamily,
      lineHeight: '1.71429em',
      color: text.primary,
    },
    body1: {
      fontSize: '0.875rem',
      fontWeight: 400,
      fontFamily,
      lineHeight: '1.46429em',
      color: text.primary,
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      fontFamily,
      lineHeight: '1.375em',
      color: text.secondary,
    },
    button: {
      fontSize: '0.875rem',
      textTransform: 'lowercase',
      fontWeight: 500,
      fontFamily,
      color: text.primary,
    },
  },
  spacing: {
    unit: 8,
  },
  transitions: {
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
  },
}

export default theme;
