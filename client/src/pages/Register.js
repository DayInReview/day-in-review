import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Typography, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import RegisterAPI from './RegisterAPI';

export default function Register(props) {
  const [email, setEmail] = useState(props.location.state.email || "");
  const [password, setPassword] = useState(props.location.state.password || "");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({});
  const [isRegistered, setIsRegistered] = useState(false);

  const registerUser = async (e) => {
    e.preventDefault();
    const res = await RegisterAPI.register(name, email, password, password2);
    if (res.success) {
      setIsRegistered(true);
    } else {
      setErrors(res.data);
    }
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '50ch',
      },
      '& .MuiButton-root': {
        margin: theme.spacing(1),
      },
    },
  }));
  const classes = useStyles();

  if (isRegistered) {
    return <Redirect to={{
      pathname: "/login",
      state: { email, password }
    }}
  />
  }

  return (
    <form className={classes.root} onSubmit={(e) => registerUser(e)}>
      <Typography variant='h4'>
        Register
      </Typography>
      <div>
        <TextField
          label="Name"
          error={!!errors.name}
          helperText={errors.name}
          onChange={({ target }) => setName(target.value)}
        />
      </div>
      <div>
        <TextField
          label="Email"
          error={!!errors.email}
          helperText={errors.email}
          value={email}
          onChange={({ target }) => setEmail(target.value)}
        />
      </div>
      <div>
        <TextField
          label="Password"
          error={!!errors.password}
          helperText={errors.password}
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <div>
        <TextField
          label="Confirm Password"
          error={!!errors.password2}
          helperText={errors.password2}
          type="password"
          onChange={({ target }) => setPassword2(target.value)}
        />
      </div>
      <span>
        <Button variant="contained" color="primary" type="submit">Register</Button>
      </span>
    </form>
  );
}