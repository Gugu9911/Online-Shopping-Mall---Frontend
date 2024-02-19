import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { logout } from '../redux/features/userSlice';

const Navbar = () => {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="navbar">
      <h1>GroceryHub</h1>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/cart">Shopping Cart</Link>
        <Link to="/post">Post an Item</Link>
        {isLoggedIn ? (
          <>
            <Link to="/cart">Shopping Cart</Link>
            <Link to="/checkout">Purchase</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
