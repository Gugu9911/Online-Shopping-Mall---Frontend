import React, { useState } from 'react';
import { Button, Box, Typography, Container } from '@mui/material';

import LoginForm from "../components/user/LoginForm";
import SignupForm from "../components/user/SignUpForm";

const Login = () => {
    const [showLogin, setShowLogin] = useState(true);

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {showLogin ? (
                    <>
                        <LoginForm />
                        <Typography variant="body1" sx={{ mt: 2 }}>
                            No account? 
                            <Button 
                                variant="text"
                                onClick={() => setShowLogin(false)}
                                sx={{ ml: 1, textTransform: 'none' }}
                            >
                                Signup here
                            </Button>
                        </Typography>
                    </>
                ) : (
                    <>
                        <SignupForm />
                        <Typography variant="body1" sx={{ mt: 2 }}>
                            Have an account? 
                            <Button 
                                variant="text"
                                onClick={() => setShowLogin(true)}
                                sx={{ ml: 1, textTransform: 'none' }}
                            >
                                Login here
                            </Button>
                        </Typography>
                    </>
                )}
            </Box>
        </Container>
    );
};

export default Login;
