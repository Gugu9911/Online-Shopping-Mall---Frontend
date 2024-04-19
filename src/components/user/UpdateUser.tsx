import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/hooks';
import { TextField, Button, Paper, Typography, Box, Avatar } from '@mui/material';
import { updateUserProfile } from '../../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { uploadImage } from '../../misc/uploadFileService';
import { styled } from '@mui/material/styles';

export default function UpdateUserProfile() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [avatar, setAvatar] = useState('');
  const [avatarPreview, setAvatarPreview] = useState('');

  const { user } = useSelector((state: any) => ({
    user: state.user.user,
  }));

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    userName: '',
    avatar: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        userName: user.userName || '',
        avatar: user.avatar || '',
      });
      setAvatarPreview(user.avatar || '');
    }
  }, [user]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      if (file.size > 5000000) { // restrict file size to 5MB
        alert('File size should be less than 5MB');
        return;
      }
      try {
        const imageUrl = await uploadImage(file);
        setAvatar(imageUrl);
        setAvatarPreview(URL.createObjectURL(file)); // setting preview from the local file
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Error uploading image: ' + ((error as Error).message || 'Unknown error'));
      }
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!user || !user.id) {
      console.error('User data is undefined or lacks an ID:', user);
      return;
    }

    const updatedUserData = {
      ...user,
      ...formData,
      avatar: avatar || user.avatar, // Ensure updated avatar is submitted
    };

    dispatch(updateUserProfile({ token: token ?? '', user: updatedUserData }))
      .unwrap()
      .then(() => {
        alert('Profile updated successfully!');
        navigate(`/profile/${user.id}`);
      })
      .catch((error) => {
        alert('Failed to update profile: ' + (error.message || 'Unknown error'));
      });
  };

  const Input = styled('input')({
    display: 'none',
  });

  return (
    <Paper elevation={3} sx={{ maxWidth: 600, mx: 'auto', p: 4, my: 5 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Update Profile
      </Typography>
      <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" alignItems="center" gap={2}>
        <Avatar alt={formData.userName} src={avatarPreview || formData.avatar} sx={{ width: 100, height: 100 }} />
        <label htmlFor="contained-button-file">
          <Input accept="image/*" id="contained-button-file" type="file" onChange={handleImageUpload} />
          <Button variant="outlined" component="span" fullWidth sx={{ mb: 2 }}>
            Upload Avatar
          </Button>
        </label>
        <TextField
          label="First Name"
          variant="outlined"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Last Name"
          variant="outlined"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Email"
          variant="outlined"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Username"
          variant="outlined"
          name="userName"
          value={formData.userName}
          onChange={handleChange}
          fullWidth
        />
        <Button variant="contained" type="submit" sx={{ mt: 2 }}>
          Update Profile
        </Button>
      </Box>
    </Paper>
  );
}
