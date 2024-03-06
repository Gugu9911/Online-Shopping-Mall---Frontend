import React from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { removeFromCart, increaseQuantity, decreaseQuantity, emptyCart } from '../redux/slices/cartSlice';
import { RootState } from '../redux/store'; // Adjust the path as needed
import { CartItem } from '../types/Cart';
import { Button, Container, Typography, Card, CardContent, CardActions, CardMedia, Box, Stack } from '@mui/material';
import { Link } from 'react-router-dom';


const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state: RootState) => state.user.user?.id);
  const cartItems = useAppSelector((state: RootState) => userId ? state.cart.itemsByUserId[userId] : []) || [];



  const handleRemoveFromCart = (itemId: number) => {
    if (userId) dispatch(removeFromCart({ userId: String(userId), itemId }));
  };

  const handleIncreaseQuantity = (itemId: number) => {
    if (userId) dispatch(increaseQuantity({ userId: String(userId), itemId }));
  };

  const handleDecreaseQuantity = (itemId: number) => {
    if (userId) dispatch(decreaseQuantity({ userId: String(userId), itemId }));
  };

  const handleCheckout = () => {
    dispatch(emptyCart({ userId: String(userId) }));
    window.alert("Successfully shopping!");
  };

  const totalPrice = cartItems.reduce((acc: number, item: CartItem) => acc + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((acc: number, item: CartItem) => acc + item.quantity, 0);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h2" gutterBottom>
        Your Cart
      </Typography>
      <Stack spacing={2}>
        {cartItems.map((item: CartItem) => (
          <Card key={item.id} sx={{ display: 'flex', marginBottom: 2 }}>
            <Link to={`/products/${item.id}`} key={item.id} style={{ textDecoration: 'none' }}>
              <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={item.images[0]}
                alt={item.title}
              />
            </Link>
            <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h5">
                  {item.title}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  ${item.price} x {item.quantity}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => handleIncreaseQuantity(item.id)}>Increase</Button>
                <Button size="small" onClick={() => handleDecreaseQuantity(item.id)}>Decrease</Button>
                <Button size="small" onClick={() => handleRemoveFromCart(item.id)}>Remove</Button>
              </CardActions>
            </Box>
          </Card>
        ))}
      </Stack>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Typography variant="h6">Total Items: {totalItems}</Typography>
        <Typography variant="h6">Total Price: ${totalPrice.toFixed(2)}</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
        <Button variant="contained" color="primary" onClick={handleCheckout}>
          Checkout
        </Button>
      </Box>
    </Container>
  );
};

export default Cart;
