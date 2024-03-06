import React, { useState } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { loginUser } from '../../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Grid, Paper, Typography, Container } from '@mui/material';

const LoginForm = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();



  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      // dispatch loginUser action and wait for the promise to resolve
      const actionResult = await dispatch(loginUser({ email, password }));
      // Check if the loginUser action was fulfilled (successful)
      if (loginUser.fulfilled.match(actionResult)) {
        navigate('/');
        alert('Login successful!');
        localStorage.getItem('token');
      } else {
        alert('Login failed: Please check your email and password!');
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
    }
  };


  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} style={{ padding: '20px', marginTop: '8%' }}>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: '1rem' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginForm;
