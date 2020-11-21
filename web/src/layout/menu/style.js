export default theme => ({
  link: {
    textDecoration: 'none',
  },
  currentUrl: {
    backgroundColor: '#2E75E619',
    '& span': {
      color: '#2E75E6 !important',
    },
  },
  badge: {
    height: 20,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 4,
    paddingBottom: 4,
    color: theme.palette.primary.main,
    flexWrap: 'wrap',
    fontSize: '0.75rem',
    minWidth: 20,
    boxSizing: 'border-box',
    transition: 'transform 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    alignItems: 'center',
    fontWeight: 600,
    alignContent: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: '#2E75E619',
    justifyContent: 'center',
  },
});
