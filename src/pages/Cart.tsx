import React from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { removeFromCart, increaseQuantity, decreaseQuantity, emptyCart } from '../redux/slices/cartSlice';
import { RootState } from '../redux/store'; // Adjust the path as needed
import { CartItem } from '../types/Cart';

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
    dispatch(emptyCart({userId: String(userId)}));
    window.alert("Successfully shopping!");
  };

const totalPrice = cartItems.reduce((acc: number, item: CartItem) => acc + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((acc: number, item: CartItem) => acc + item.quantity, 0);

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.map((item: CartItem) => (
        <div key={item.id}>
          <h3>{item.title}</h3>
          <p>${item.price} x {item.quantity}</p>
          <p>
            <img src={item.images[0]} alt={item.title} style={{width: '100px', height: '100px'}} />
          </p>
          <button onClick={() => handleIncreaseQuantity(item.id)}>Increase</button>
          <button onClick={() => handleDecreaseQuantity(item.id)}>Decrease</button>
          <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
        </div>
      ))}
      <div>
        <p>Total Items: {totalItems}</p>
        <p>Total Price: ${totalPrice.toFixed(2)}</p>
        <button onClick={handleCheckout}>Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
