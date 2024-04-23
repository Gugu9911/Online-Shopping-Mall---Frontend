// src/App.tsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux'; 
import { store } from './redux/store';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from './utils/theme'; // 引入主题配置
import Home from './pages/Home';
import Header from './components/Header';
import Login from "./pages/Login";
import Footer from "./components/Footer";
import LoginForm from './components/user/LoginForm';
import SingleProduct from './pages/SingleProduct';
import Category from './pages/Category';
import AddProduct from './components/product/AddProduct';
import UserProfile from './components/user/UserProfile';
import Cart from './pages/Cart';
import UpdateProduct from './components/product/UpdateProduct';
import UpdateUserProfile from './components/user/UpdateUser';
import Manage from './pages/Manage';
import ManageCategories from './components/category/ManageCategory';
import { CssBaseline, Container } from '@mui/material';

const App = () => {
  const [theme, setTheme] = useState(lightTheme); 

  const toggleTheme = () => {
    setTheme(theme.palette.mode === 'dark' ? lightTheme : darkTheme);
  };

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Container>
            <Header toggleTheme={toggleTheme} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/header" element={<Header />} />
              <Route path="/login" element={<Login/>} />
              <Route path="/loginForm" element={<LoginForm/>} />
              <Route path='/products/:id' element={<SingleProduct />} />
              <Route path='/categories' element={<Category />} />
              <Route path='/addProduct' element={<AddProduct />} />
              <Route path='/profile/:userId' element={<UserProfile />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/updateproduct/:productId' element={<UpdateProduct />} />
              <Route path='/updateuser/:userId' element={<UpdateUserProfile />} />
              <Route path='/manage' element={<Manage />} />
              <Route path='/managecategories' element={<ManageCategories />} />
            </Routes>
            <Footer />
          </Container>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
