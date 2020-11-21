import React, { useContext } from 'react';
import axios from 'axios';
import SessionContext from '../../shared/contexts/session';
import { Grid, Typography, Button } from '@material-ui/core';

import config from '../../config.json';

const Home = () => {
  const { setAuthenticated } = useContext(SessionContext);

  const handleClick = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');

      const res = await axios.post(config.api_url + '/logout', null, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      console.log(res);

      if (res.status === 204) {
        setAuthenticated(false);
        localStorage.clear();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography>Members</Typography>
      </Grid>
      <Grid item xs={12}>
        <Button onClick={handleClick} variant="contained" color="primary">
          Logout
        </Button>
      </Grid>
    </Grid>
  );
};

export default Home;
