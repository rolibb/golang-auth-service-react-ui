import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Paper, Grid, TextField, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SessionContext from '../../shared/contexts/session';
import { loginValidate } from '../../shared/lib/utils/login-validate';
import style from './style';
import config from '../../config.json';

const useStyles = makeStyles(style);

const Login = () => {
  const classes = useStyles();

  const { setAuthenticated } = useContext(SessionContext);

  const [email, setEmail] = useState(null);
  const [message, setMessage] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);

  const handleEmail = ev => {
    setEmail(ev.target.value);
  };

  const handlePassword = ev => {
    setPassword(ev.target.value);
  };

  useEffect(() => {
    const error = loginValidate(email, password);
    setError(error);
  }, [email, password]);

  const handleLogin = async ev => {
    ev.preventDefault();
    const validate = loginValidate(email, password);
    setError(validate);

    if (validate.email === true && validate.password === true) {
      try {
        const res = await axios.post(config.api_url + '/login', {
          email,
          password,
        });

        if (res.data && res.data.AccessToken) {
          setAuthenticated(true);
          localStorage.setItem('accessToken', res.data.AccessToken);
        }
      } catch (error) {
        console.log(error);
        if (error.response.status === 401)
          setMessage('There is a error with your Email or Password');
        console.error(error);
      }
    }
  };

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid
        item
        xs={12}
        md={6}
        sm={11}
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Paper className={classes.loginContainer}>
          <Grid
            container
            spacing={3}
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid
              item
              xs={12}
              sm={12}
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={5}
            >
              <Grid
                item
                xs={12}
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid
                  item
                  xs={12}
                  sm={8}
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <span className={classes.sesionLabel}> Login</span>
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid
                  item
                  md={6}
                  xs={12}
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <TextField
                    id="email"
                    type="email"
                    label="Correo Electronico"
                    className={classes.label}
                    onChange={handleEmail}
                    fullWidth
                    required
                    error={error && (email || password) && !error.email}
                  />
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid
                  item
                  md={6}
                  xs={12}
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <TextField
                    id="password"
                    type="password"
                    label="Contraseña"
                    onChange={handlePassword}
                    className={classes.label}
                    fullWidth
                    required
                    error={error && email && !error.password}
                  />
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h3" align="center">
                  {message}
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid
                  item
                  md={6}
                  xs={12}
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                  onClick={handleLogin}
                >
                  <Button variant="contained" color="primary">
                    Login
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Login;
