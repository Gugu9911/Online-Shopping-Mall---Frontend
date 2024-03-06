import React, { useState } from 'react';
import { createUser } from '../../redux/slices/userSlice';
import { useAppDispatch } from '../../redux/hooks';
import { useNavigate } from 'react-router-dom';
import { uploadFile } from '../../redux/slices/fileSlice';
import { Button, TextField, Box, Typography, Modal, CircularProgress, Container } from '@mui/material';
import { styled } from '@mui/material/styles';

const Input = styled('input')({
  display: 'none',
});

const SignupForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // handleFileChange and handleSubmit methods remain unchanged
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // Keep the original logic for handling file changes
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const uploadPromises = files.map(file => dispatch(uploadFile(file)).unwrap());
      try {
        const imageResponses = await Promise.all(uploadPromises);
        const imageUrls = imageResponses.map(response => response.location);
        setAvatar(imageUrls[0]);
        console.log('imageUrls', imageUrls);
      } catch (error) {
        alert('Error uploading image(s)');
      }
    }
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // Keep the original logic for handling form submission
    event.preventDefault();
    setLoading(true);

    if (password.length < 5) {
      alert('password must be at least 5 characters');
      setLoading(false);
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('invalid email');
      setLoading(false);
      return;
    }

    const avatarUrl = avatar || "https://api.lorem.space/image/face?w=640&h=480&r=867";

    const userData = { name, email, password, avatar: avatarUrl };

    try {
      const actionResult = await dispatch(createUser(userData));
      if (createUser.fulfilled.match(actionResult)) {
        console.log('Registration successful', actionResult.payload);
        alert('Registration successful!');
        setShowSuccessModal(true);
        setTimeout(() => {
          setShowSuccessModal(false);
          navigate('/loginForm');
        }, 3000); // 3 seconds
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', '& > :not(style)': { width: '100%' } }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Signup
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <label htmlFor="contained-button-file">
            <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={handleFileChange} />
            <Button variant="outlined" component="span" fullWidth sx={{ mb: 2 }}>
              Upload Avatar
            </Button>
          </label>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Username"
            name="name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Signup'}
          </Button>
        </Box>

        <Modal
          open={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4,
          }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Registration Success
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              You will be redirected to the login page shortly.
            </Typography>
          </Box>
        </Modal>
      </Box>
    </Container>
  );
};

export default SignupForm;
