import React from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addToCart } from '../../redux/slices/cartSlice'; // 根据你的文件结构调整路径
import { Product } from '../../types/Product'; // 根据你的文件结构调整路径

interface AddToCartProps {
  product: Product;
}

const AddToCart: React.FC<AddToCartProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  // get user from the store
  const user = useAppSelector((state) => state.user.user);


  // Add the user ID to the addToCart action
  const handleAddToCart = () => {
    if (!user) {
      alert("Please log in to add items to cart");
      return;
    }
    const cartItem = { ...product, quantity: 1 };
    // dispatch the addToCart action with the user ID and the cart item
    dispatch(addToCart({ userId: user.id.toString(), item: cartItem }));
    alert("Item added to cart successfully!");
  };


  // if the user is not logged in, show a login prompt
  if (!user) {
    // if the user is not logged in, show a login prompt
    return <button onClick={() => alert("Please log in to add items to cart")}>Login to Add to Cart</button>;
  } else {
    // if the user is logged in, show the Add to Cart button
    return <button onClick={handleAddToCart}>Add to Cart</button>;
  }
};


export default AddToCart;
