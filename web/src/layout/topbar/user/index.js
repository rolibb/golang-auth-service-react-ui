import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import style from './style';

const useStyles = makeStyles(style);
const User = ({ name, image }) => {
  const classes = useStyles();

  return (
    <>
      <Avatar
        alt="Avatar"
        src={`/images/avatar/${image}`}
        className={classes.avatar}
      />
      <span className={classes.userLabel}>{name}</span>
    </>
  );
};

User.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
}

export default User;
