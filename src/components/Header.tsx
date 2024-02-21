import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { logout } from '../redux/slices/userSlice';

const Header = () => {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const username = useSelector((state: RootState) => state.user.username); // 获取用户名
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="navbar">
      <h1>GroceryHub</h1>
      <div className="nav-links">
        <Link to="/">Home</Link>
        {isLoggedIn ? (
          <>
            <span>{username}</span> {/* 显示用户名 */}
            <Link to="/cart">Shopping Cart</Link>
            <Link to="/checkout">Purchase</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
