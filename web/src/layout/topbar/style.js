export default theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#FCFCFC',
    boxShadow: 'none',
  },
  toolbar: {
    height: 100,
  },
  topbarIcon: {
    height: 32,
    width: 32,
    [theme.breakpoints.only('xs')]: {
      height: 20,
      width: 20,
    },
  },
  avatar: {
    height: 66,
    width: 66,
    marginRight: 15,
    marginLeft: 10,
    [theme.breakpoints.only('xs')]: {
      height: 29,
      width: 29,
      marginRight: 2,
      marginLeft: 2,
    },
  },
  userLabel: {
    color: theme.palette.text.primary,
    fontWeight: 'bold',
    fontSize: 24,
    textTransform: 'capitalize !important',
    paddingRight: 16,
    [theme.breakpoints.only('xs')]: {
      fontSize: 12,
      fontWeight: 'bold',
    },
    [theme.breakpoints.only('sm')]: {
      paddingRight: 5,
    },
  },
  icon: {
    marginRight: 30,
    [theme.breakpoints.only('xs')]: {
      marginRight: 2,
    },
    [theme.breakpoints.only('sm')]: {
      marginRight: 5,
    },
  },
  language: {
    fontSize: 29,
    color: theme.palette.text.primary,
  },
  menuIcon: {
    color: theme.palette.primary.main,
  },
  logo: {
    height: 52,
    paddingLeft: 33,
    [theme.breakpoints.only('xs')]: {
      height: 35,
      paddingLeft: 3,
    },
    [theme.breakpoints.only('sm')]: {
      paddingLeft: 16,
    },
  },
  expand: {
    color: theme.palette.primary.main,
  },
});
