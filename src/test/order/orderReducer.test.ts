import { configureStore } from '@reduxjs/toolkit';
import orderReducer, { createOrder, getOrdersByUserId, deleteOrder, getAllOrders } from '../../redux/slices/orderSlice';
import axios from 'axios';
import { Order, OrderState } from '../../types/Order';
import { CartItem } from '../../types/Cart';
import { User } from '../../types/User';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('order slice', () => {
  let initialState: OrderState = {
    orders: [],
    loading: false,
    error: null,
  };

  // Configure mock store
  const store = configureStore({
    reducer: orderReducer
  });

  beforeEach(() => {
    initialState = {
      orders: [],
      loading: false,
      error: null,
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  // Test: createOrder
  it('should handle createOrder being fulfilled', async () => {
    const mockOrder = {
      id: '1',
      user: { id: 'user1', firstname: 'John', lastname: 'Doe', password: 'password', email: 'john@example.com', userName: 'johndoe', role: 'user', avatar: 'avatar.png' },
      items: [{ id: 'item1', product: { id: 1, name: 'Product 1', price: 10, description: 'Description', category: { id: '1', name: 'Category' }, image: 'url' }, quantity: 2 }],
      createdAt: '2020-01-01'
    };
    mockedAxios.post.mockResolvedValue({ data: mockOrder });
    const cartItems: CartItem[] = [
        {
          id: 1, // Product ID
          name: 'Product 1',
          price: 10,
          description: 'Description for Product 1',
          category: { id: '1', name: 'Electronics' }, // Category is an object
          image: 'image-url-1',
          quantity: 2 // Quantity added to the cart
        }
      ];
      
      const user: User = {
        id: 'user1',
        firstName: 'John',
        lastName: 'Doe',
        password: 'password',
        email: 'john@example.com',
        userName: 'johndoe',
        role: 'user',
        avatar: 'avatar.png'
      };
    const result = await store.dispatch(createOrder({ cartItems, user }));

    expect(result.type).toBe('order/createOrder/fulfilled');
    expect(store.getState().orders).toContainEqual(mockOrder);
  });

  // Test: getOrdersByUserId
  it('should handle getOrdersByUserId being fulfilled', async () => {
    const mockOrders = [
      {
        id: '2',
        user: { id: 'user1', firstname: 'John', lastname: 'Doe', password: 'password', email: 'john@example.com', userName: 'johndoe', role: 'user', avatar: 'avatar.png' },
        items: [],
        createdAt: '2020-01-02'
      }
    ];
    mockedAxios.get.mockResolvedValue({ data: mockOrders });
    const result = await store.dispatch(getOrdersByUserId('user1'));

    expect(result.type).toBe('order/getOrdersByUserId/fulfilled');
    expect(store.getState().orders).toEqual(mockOrders);
  });

  // Test: deleteOrder
  it('should handle deleteOrder being fulfilled', async () => {
    const orderId = '1';
    mockedAxios.delete.mockResolvedValue({ status: 200 });
    await store.dispatch(deleteOrder(orderId));

    expect(store.getState().orders).toEqual(expect.not.arrayContaining([{ id: orderId }]));
  });

  // Test: getAllOrders
  it('should handle getAllOrders being fulfilled', async () => {
    const mockOrders = [
      {
        id: '3',
        user: { id: 'user2', firstname: 'Jane', lastname: 'Doe', password: 'password', email: 'jane@example.com', userName: 'janedoe', role: 'admin', avatar: 'avatar.jpg' },
        items: [],
        createdAt: '2020-01-03'
      }
    ];
    mockedAxios.get.mockResolvedValue({ data: mockOrders });
    const result = await store.dispatch(getAllOrders());

    expect(result.type).toBe('order/getAllOrders/fulfilled');
    expect(store.getState().orders).toEqual(mockOrders);
  });
});
