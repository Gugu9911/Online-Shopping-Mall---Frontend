import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { fetchUserById } from '../../redux/slices/userSlice';
import { useAppDispatch } from '../../redux/hooks';
import { User } from '../../types/User'; 
import { Avatar } from '@mui/material';



const UserProfile = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const { user, loading, error } = useSelector((state: any) => ({
    user: state.user.users.find((user: User) => user.id === parseInt(id ?? '')),
    loading: state.user.loading,
    error: state.user.error,
}));

  useEffect(() => {
    if (id) {
      dispatch(fetchUserById(parseInt(id)));
    }
  }, [dispatch, id]);

  if (loading) {
    return <div>Loading user...</div>;
  }
  if (error) {
    return <div>Error fetching user: {error}</div>;
  }
  if (!user) {
    return <div>User not found</div>;
  }

  // Display the user's details
  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
      <Avatar alt={user.name} src={user.avatar} />
    </div>
  );
};

export default UserProfile;
