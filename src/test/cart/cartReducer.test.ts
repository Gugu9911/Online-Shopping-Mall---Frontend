import { configureStore } from '@reduxjs/toolkit';
import cartReducer, {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  emptyCart,
} from '../../redux/slices/cartSlice';
import { CartItem, CartState } from '../../types/Cart';

describe('cart reducer', () => {
  // Initial state for the cart
  const initialState: CartState = {
    itemsByUserId: {},
  };

  // Mock category data
  const mockCategory = {
    id: '1',
    name: 'Electronics',
  };

  // Mock data for cart items
  const mockCartItem: CartItem = {
    id: 1,
    name: 'Product 1',
    price: 10,
    description: 'A sample product',
    category: mockCategory,
    image: 'image-url',
    quantity: 1,
  };

  // Test: initial state
test('should return the initial state', () => {
    expect(cartReducer(undefined, { type: '' })).toEqual(initialState);
});

// Test: addToCart action
test('should add a product to the cart', () => {
    const state = cartReducer(initialState, addToCart({
        userId: 'user1',
        item: mockCartItem,
    }));
    expect(state.itemsByUserId['user1']).toEqual([mockCartItem]);
});

  // Test: removeFromCart action
  test('should remove a product from the cart', () => {
    const stateWithItem = {
      ...initialState,
      itemsByUserId: {
        'user1': [mockCartItem],
      },
    };
    const state = cartReducer(stateWithItem, removeFromCart({
      userId: 'user1',
      itemId: 1,
    }));
    expect(state.itemsByUserId['user1']).toEqual([]);
  });

  // Test: increaseQuantity action
  test('should increase the quantity of an item in the cart', () => {
    const initialStateWithItem = {
      itemsByUserId: {
        'user1': [{ ...mockCartItem }],
      },
    };
    const state = cartReducer(initialStateWithItem, increaseQuantity({
      userId: 'user1',
      itemId: 1,
    }));
    expect(state.itemsByUserId['user1'][0].quantity).toBe(2);
  });

  // Test: decreaseQuantity action
  test('should decrease the quantity of an item in the cart if quantity is more than one', () => {
    const initialStateWithItem = {
      itemsByUserId: {
        'user1': [{ ...mockCartItem, quantity: 2 }],
      },
    };
    const state = cartReducer(initialStateWithItem, decreaseQuantity({
      userId: 'user1',
      itemId: 1,
    }));
    expect(state.itemsByUserId['user1'][0].quantity).toBe(1);
  });

  // Test: emptyCart action
  test('should empty the cart for a user', () => {
    const initialStateWithItems = {
      itemsByUserId: {
        'user1': [{ ...mockCartItem }],
        'user2': [{ ...mockCartItem }],
      },
    };
    const state = cartReducer(initialStateWithItems, emptyCart({
      userId: 'user1',
    }));
    expect(state.itemsByUserId['user1']).toEqual([]);
    expect(state.itemsByUserId['user2']).toHaveLength(1); // Ensure other carts are untouched
  });
});
