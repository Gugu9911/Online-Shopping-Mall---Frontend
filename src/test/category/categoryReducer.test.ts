import { configureStore } from '@reduxjs/toolkit';
import categoryReducer, { fetchAllCategories, createCategory, updateCategory, deleteCategory } from '../../redux/slices/categorySlice';
import axios from 'axios';
import { Category, CategoryState } from '../../types/Category';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('category slice', () => {
  let initialState: CategoryState = {
    categories: [],
    loading: false,
    error: null,
  };

  // Configure mock store
  const store = configureStore({
    reducer: categoryReducer
  });

  afterEach(() => {
    jest.resetAllMocks();
    store.dispatch({ type: 'reset' }); // Clear store after each test
  });

  // Test: fetchAllCategories
  it('should handle fetchAllCategories being fulfilled', async () => {
    const mockCategories: Category[] = [
      { id: '1', name: 'Electronics' },
      { id: '2', name: 'Books' }
    ];
    mockedAxios.get.mockResolvedValue({ data: mockCategories });
    const result = await store.dispatch(fetchAllCategories());

    expect(result.type).toBe('categories/fetchAllCategories/fulfilled');
    expect(store.getState().categories).toEqual(mockCategories);
    expect(store.getState().loading).toBeFalsy();
  });

  it('should handle fetchAllCategories being rejected', async () => {
    mockedAxios.get.mockRejectedValue(new Error('Async error'));
    const result = await store.dispatch(fetchAllCategories());

    expect(result.type).toBe('categories/fetchAllCategories/rejected');
    expect(store.getState().error).toBeDefined();
  });

  // Test: createCategory
  it('should handle createCategory being fulfilled', async () => {
    const newCategory: Category = { id: '3', name: 'Clothing' };
    mockedAxios.post.mockResolvedValue({ data: newCategory });
    const result = await store.dispatch(createCategory({ name: 'Clothing' }));

    expect(result.type).toBe('categories/createCategory/fulfilled');
    expect(store.getState().categories).toContainEqual(newCategory);
  });

  // Test: updateCategory
  it('should handle updateCategory being fulfilled', async () => {
    const updatedCategory = { id: '1', name: 'Updated Electronics' };
    mockedAxios.put.mockResolvedValue({ data: updatedCategory });
    await store.dispatch(createCategory({ name: 'Electronics' })); // Add category first
    const result = await store.dispatch(updateCategory({ id: '1', name: 'Updated Electronics' }));

    expect(result.type).toBe('categories/updateCategory/fulfilled');
    expect(store.getState().categories.find(c => c.id === '1')).toEqual(updatedCategory);
  });

  // Test: deleteCategory
  it('should handle deleteCategory being fulfilled', async () => {
    const categoryId = '1';
    mockedAxios.delete.mockResolvedValue({ data: {} }); // Assuming no specific data returned
    await store.dispatch(createCategory({ name: 'Electronics' })); // Add category first
    const result = await store.dispatch(deleteCategory(categoryId));

    expect(result.type).toBe('categories/deleteCategory/fulfilled');
    expect(store.getState().categories.find(c => c.id === categoryId)).toBeUndefined();
  });
});
