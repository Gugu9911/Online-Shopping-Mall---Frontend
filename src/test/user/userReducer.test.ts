import { configureStore } from '@reduxjs/toolkit';
import userReducer, { createUser, loginUser, logoutUser, getAllUsers, fetchUserById, updateUserProfile } from '../../redux/slices/userSlice';
import axios from 'axios';
import { User, SignupUser, UserInitialState } from '../../types/User';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('user slice', () => {
  const initialState: UserInitialState = {
    user: null,
    users: [],
    loading: false,
    error: null,
  };

  // Mock user data
  const mockUsers: User[] = [
    { id: '1', firstname: 'John', lastname: 'Doe', password: 'password1', email: 'john.doe@example.com', userName: 'johndoe', role: 'admin', avatar: 'avatar-url-1' },
    { id: '2', firstname: 'Jane', lastname: 'Smith', password: 'password2', email: 'jane.smith@example.com', userName: 'janesmith', role: 'user', avatar: 'avatar-url-2' },
  ];

  const newUser: SignupUser = {
    firstName: 'Alice',
    lastName: 'Wonderland',
    userName: 'alice',
    email: 'alice@example.com',
    password: 'password3',
    avatar: 'avatar-url-3'
  };

  // Configure mock store
  const store = configureStore({
    reducer: userReducer
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  // Test: createUser
  it('should handle createUser being fulfilled', async () => {
    mockedAxios.post.mockResolvedValue({ data: { ...newUser, id: '3' } });
    const result = await store.dispatch(createUser(newUser));

    expect(result.type).toBe('user/createUser/fulfilled');
    expect(store.getState().users).toContainEqual({ ...newUser, id: '3' });
    expect(store.getState().loading).toBeFalsy();
  });

  it('should handle createUser being rejected', async () => {
    mockedAxios.post.mockRejectedValue(new Error('Async error'));
    const result = await store.dispatch(createUser(newUser));

    expect(result.type).toBe('user/createUser/rejected');
    expect(store.getState().error).toBeDefined();
  });

  // Test: loginUser
  it('should handle loginUser being fulfilled', async () => {
    const loginDetails = { email: 'john.doe@example.com', password: 'password1' };
    mockedAxios.post.mockResolvedValue({ data: 'token-12345' });
    const result = await store.dispatch(loginUser(loginDetails));

    expect(result.type).toBe('user/loginUser/fulfilled');
    expect(store.getState().user).toBeDefined();
  });

  // Test: logoutUser
  it('should handle logoutUser being fulfilled', async () => {
    const result = await store.dispatch(logoutUser());

    expect(result.type).toBe('user/logoutUser/fulfilled');
    expect(store.getState().user).toBeNull();
  });

  // Test: getAllUsers
  it('should handle getAllUsers being fulfilled', async () => {
    mockedAxios.get.mockResolvedValue({ data: mockUsers });
    const result = await store.dispatch(getAllUsers());

    expect(result.type).toBe('user/getAllUsers/fulfilled');
    expect(store.getState().users).toEqual(mockUsers);
  });

  // Test: fetchUserById
  it('should handle fetchUserById being fulfilled', async () => {
    const userId = '1';
    mockedAxios.get.mockResolvedValue({ data: mockUsers[0] });
    const result = await store.dispatch(fetchUserById(userId));

    expect(result.type).toBe('user/fetchUserById/fulfilled');
    expect(store.getState().user).toEqual(mockUsers[0]);
  });

  // Test: updateUserProfile
  it('should handle updateUserProfile being fulfilled', async () => {
    const updatedUser = { ...mockUsers[0], firstname: 'John Updated' };
    mockedAxios.put.mockResolvedValue({ data: updatedUser });
    const result = await store.dispatch(updateUserProfile({ token: 'token-12345', user: updatedUser }));

    expect(result.type).toBe('user/updateUser/fulfilled');
    expect(store.getState().user).toEqual(updatedUser);
  });
});
