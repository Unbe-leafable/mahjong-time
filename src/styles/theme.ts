import { createTheme } from '@mui/material';

export const colors = {
  purple: '#262957',
  darkPurple: '#1D1E3F',
  backgroundPurple: '#08091E',
  lightPurple: '#9295C9',
  borderPurple: '#323161',
  lightRed: '#FFC4B4',
  red: '#FE744D',
  darkRed: '#912E14',
  disablePurple: '#36374D',
  lightGreen: '#5AFFFB',
  black50: 'rgba(0, 0, 0, 0.5)',
  playerTileBackground: '#736BCE1A',
  playerTileBackgroundActive: '#08091D4D',
  white: '#FFFFFF',
};

export const theme = createTheme({
  palette: {
    primary: {
      main: colors.purple,
      light: colors.lightPurple,
      dark: colors.darkPurple,
    },
    secondary: {
      main: colors.playerTileBackground,
      light: colors.lightRed,
      dark: colors.playerTileBackgroundActive,
    },
    background: {
      default: colors.backgroundPurple,
    },
    text: {
      primary: colors.lightPurple,
      secondary: colors.lightRed,
    },
    success: {
      main: colors.lightGreen,
    },
    info: {
      main: colors.borderPurple,
      light: colors.lightPurple,
      dark: colors.darkPurple,
    },
    error: {
      main: colors.red,
      light: colors.lightRed,
    },
  },
  typography: {
    fontFamily: `'Roboto', Arial, sans-serif`,
    h3: {
      fontSize: '48px',
      fontWeight: 700,
      lineHeight: '56.02px',
    },
    h5: {
      fontSize: '24px',
      fontWeight: 400,
      lineHeight: '32.02px',
    },
    body1: {
      fontSize: '30px',
      fontWeight: 500,
      lineHeight: '26px',
    },
    body2: {
      fontSize: '24px',
      fontWeight: 400,
      lineHeight: '32.02px',
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          borderRadius: '6px',
          padding: '8px 22px',
          border: `1px solid transparent`,
          textShadow: `1px 1px 1px ${colors.black50}`,
          textTransform: 'initial',
        },
        containedPrimary: {
          background: `linear-gradient(${colors.purple}, ${colors.purple}) padding-box,
          linear-gradient(to bottom, #434486, #191C40) border-box`,
          color: colors.lightPurple,
          textTransform: 'uppercase',
          '&:active': {
            background: `linear-gradient(${colors.darkPurple}, ${colors.darkPurple}) padding-box,
            linear-gradient(to bottom, #3D3C7C, #101535) border-box`,
            textShadow: 'none',
          },
          '&.Mui-disabled': {
            background: `linear-gradient(${colors.disablePurple}, ${colors.disablePurple}) padding-box,
            linear-gradient(to bottom, #4D4D81, #22243A) border-box`,
            colors: colors.purple,
            textShadow: 'none',
          },
        },
        outlinedPrimary: {
          background: 'transparent',
          border: `1px solid ${colors.lightPurple}`,
          color: colors.lightPurple,
          '&:active': {
            background: colors.black50,
          },
        },
        containedSecondary: {
          background: '#736BCE1A',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid',
          borderImageSlice: '1',
          borderRadius: '6px',
          borderImageSource: 'linear-gradient(to bottom, #434486, #191C40)',
          color: colors.lightPurple,
          height: '140px',
          textShadow: 'none',
          width: '100%',
          '&:active': {
            background: colors.playerTileBackgroundActive,
          },
        },
        containedWarning: {
          background: `linear-gradient(${colors.red}, ${colors.red}) padding-box,
          linear-gradient(to bottom, #CB5434, #BC4227) border-box`,
          border: `1px solid transparent`,
          color: colors.lightRed,
          textTransform: 'uppercase',
          '&:active': {
            background: `linear-gradient(${colors.darkRed}, ${colors.darkRed}) padding-box,
            linear-gradient(to bottom, #AF5035, #A23E22) border-box`,
            textShadow: 'none',
          },
        },
      },
    },
    MuiButtonGroup: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          userSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none',
          WebkitUserSelect: 'none',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: 'none',
          textAlign: 'center',
          height: '32px',
          margin: '10px',
          width: '25%',
          background: 'transparent',
        },
      },
    },
  },
});
