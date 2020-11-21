export default theme => ({
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
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'capitalize !important',
    paddingRight: 16,
    [theme.breakpoints.only('xs')]: {
      fontSize: 12,
    },
  },
});
