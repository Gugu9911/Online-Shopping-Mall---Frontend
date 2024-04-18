import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getProfile } from '../../redux/slices/userSlice';
import { useAppDispatch } from '../../redux/hooks';
import { Avatar, Box, Typography, CircularProgress, Paper } from '@mui/material';

const UserProfile = () => {
  const dispatch = useAppDispatch();

  const { user, loading, error } = useSelector((state: any) => ({
    user: state.user.user,
    loading: state.user.loading,
    error: state.user.error,
  }));

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(getProfile(token));
    }else{
      console.log('No token found');
    }
  }, [dispatch]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }
  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" p={3}>
        <Typography variant="h6" color="error">Error fetching user: {error}</Typography>
      </Box>
    );
  }
  if (!user) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" p={3}>
        <Typography variant="h6">User not found</Typography>
      </Box>
    );
  }

  // Display the user's details
  return (
    <Paper elevation={3} sx={{ maxWidth: 600, mx: 'auto', p: 4, my: 5 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        User Profile
      </Typography>
      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        <Avatar alt={user.name} src={user.avatar} sx={{ width: 100, height: 100 }} />
        <Typography variant="body1"><strong>Name:</strong> {user.name}</Typography>
        <Typography variant="body1"><strong>Email:</strong> {user.email}</Typography>
        <Typography variant="body1"><strong>Role:</strong> {user.role}</Typography>
      </Box>
    </Paper>
  );
};

export default UserProfile;
