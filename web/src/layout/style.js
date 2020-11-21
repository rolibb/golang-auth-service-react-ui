const drawerWidth = 320;
const drawerWidthMobile = 240;
const drawerWidthTablet = 88;
export default theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#FCFCFC',
  },
  toolbar: {
    height: 100,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    [theme.breakpoints.only('xs')]: {
      width: drawerWidthMobile,
    },
    [theme.breakpoints.only('sm')]: {
      width: drawerWidthTablet,
    },
  },
  drawerPaper: {
    width: drawerWidth,
    borderRight: 'none',
    '& .MuiListItem-gutters': {
      paddingLeft: 53,
      paddingRight: 16,
    },
    [theme.breakpoints.only('xs')]: {
      width: drawerWidthMobile,
      '& .MuiListItem-gutters': {
        paddingLeft: 16,
        paddingRight: 16,
      },
    },
    [theme.breakpoints.only('sm')]: {
      width: drawerWidthTablet,
      '& .MuiListItem-gutters': {
        paddingLeft: 32,
        paddingRight: 32,
      },
    },
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
});
