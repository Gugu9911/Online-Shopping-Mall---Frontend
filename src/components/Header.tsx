import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { logoutUser, getAllUsers } from '../redux/slices/userSlice';
import { useAppDispatch } from '../redux/hooks';
import { Link as RouterLink } from 'react-router-dom';
import { User } from '../types/User';
import { AppBar, Toolbar, Typography, Button, IconButton, Link, Menu, MenuItem, useMediaQuery, useTheme, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

interface HeaderProps {
  toggleTheme?: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleTheme }) => {
  const user = useSelector((state: RootState) => state.user.user);
  const isLoggedIn = Boolean(user);
  const username = user?.name;
  const [userId, setUserId] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getAllUsers())
        .unwrap()
        .then(users => {
          const user = users.find((user: User) => user.name === username);
          if (user) {
            setUserId(user.id);
          }
        })
        .catch(error => console.error('Error fetching users:', error));
    }
  }, [dispatch, isLoggedIn, username]);

  const handleLogout = () => {
    dispatch(logoutUser());
    alert('User logged out successfully');
  };

  const userRole = useSelector((state: any) => state.user.user?.role);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link component={RouterLink} to="/" color="inherit" underline="none">
            GroceryHub
          </Link>
        </Typography>
        {isMobile ? (
          <>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleClick}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleClose} component={RouterLink} to="/">Home</MenuItem>
              <MenuItem onClick={handleClose} component={RouterLink} to="/categories">Categories</MenuItem>
              {isLoggedIn && (
                <>
                  {userRole === 'admin' && <MenuItem onClick={handleClose} component={RouterLink} to="/addProduct">Add Product</MenuItem>}
                  <MenuItem onClick={handleClose} component={RouterLink} to="/cart">Shopping Cart</MenuItem>
                  <MenuItem onClick={handleClose} component={RouterLink} to={`/profile/${userId}`}>Profile</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  {toggleTheme && <MenuItem onClick={toggleTheme}>Toggle Theme</MenuItem>}
                </>
              )}
              {!isLoggedIn && (
                <>
                  <MenuItem onClick={handleClose} component={RouterLink} to="/login">Login</MenuItem>
                </>
              )}
            </Menu>
          </>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
            <Link component={RouterLink} to="/" color="inherit" sx={{ m: 1 }}>Home</Link>
            <Link component={RouterLink} to="/categories" color="inherit" sx={{ m: 1 }}>Categories</Link>
            {isLoggedIn && (
              <>
                {userRole === 'admin' && <Link component={RouterLink} to="/addProduct" color="inherit" sx={{ m: 1 }}>Add Product</Link>}
                <Link component={RouterLink} to="/cart" color="inherit" sx={{ m: 1 }}>Shopping Cart</Link>
                <Link component={RouterLink} to={`/profile/${userId}`} color="inherit" sx={{ m: 1 }}>Profile</Link>
                <Typography sx={{ m: 1 }}>Welcome! {username}</Typography>
                <Button onClick={handleLogout} color="inherit" sx={{ m: 1 }}>Logout</Button>
              </>
            )}
            {!isLoggedIn && (
              <Link component={RouterLink} to="/login" color="inherit" sx={{ m: 1 }}>Login</Link>
            )}
            {toggleTheme && <Button onClick={toggleTheme} color="inherit" sx={{ m: 1 }}>Toggle Theme</Button>}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
