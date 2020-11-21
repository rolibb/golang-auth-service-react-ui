export default theme => ({
  loginContainer: {
    paddingTop: 50,
    paddingBottom: 50,
  },
  label: {
    color: '#2E75E680',
    '& .MuiInput-underline:before': {
      borderBottomColor: theme.palette.primary.main,
    },
    '& label': {
      color: theme.palette.primary.main,
    },
  },
  schoolLogo: {
    height: 135,
  },
  welcome: {
    fontSize: 24,
    color: theme.palette.text.primary,
    [theme.breakpoints.only('xs')]: {
      fontSize: 21,
    },
  },
  schoolTitle: {
    fontSize: 55,
    color: theme.palette.text.primary,
    paddingTop: 16,
    [theme.breakpoints.only('xs')]: {
      fontSize: 30,
      fontWeight: 'bold',
    },
  },
  sesionLabel: {
    fontSize: 32,
    color: theme.palette.text.primary,
    [theme.breakpoints.only('xs')]: {
      fontSize: 20,
      fontWeight: 'bold',
    },
  },
});
