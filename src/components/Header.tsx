import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { logoutUser, getAllUsers } from '../redux/slices/userSlice';
import { useAppDispatch } from '../redux/hooks';
import { Link } from 'react-router-dom';
import { User } from '../types/User';

const Header = () => {
  // Directly derive isLoggedIn from whether user object is null or not
  const user = useSelector((state: RootState) => state.user.user);
  const isLoggedIn = Boolean(user); // true if user is not null
  const username = user?.name; // Adjust the attribute name as per your user object's structure

  const [userId, setUserId] = useState(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getAllUsers())
        .unwrap()
        .then(users => {
          const user = users.find((user: User) => user.name === username);
          if (user) {
            setUserId(user.id); // Update state to store the current user's ID
          }
        })
        .catch(error => console.error('Error fetching users:', error));
    }
  }, [dispatch, isLoggedIn, username]);

  const handleLogout = () => {
    dispatch(logoutUser());
    alert('User logged out successfully');
  };

  return (
    <nav className="navbar">
      <h1>GroceryHub</h1>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/categories">Categories</Link>
        <Link to="/addProduct">Add Product</Link>
        {isLoggedIn ? (
          <>
            <span>{username}</span> {/* Show username */}
            <Link to={`/profile/${userId}`}>Profile</Link>
            <Link to="/cart">Shopping Cart</Link>
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