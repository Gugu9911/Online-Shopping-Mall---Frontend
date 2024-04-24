import { configureStore } from '@reduxjs/toolkit';
import productReducer, { fetchAllProducts, fetchProductById, addProduct, deleteProduct, updateProduct } from '../../redux/slices/productSlice';
import axios from 'axios';
import { Product, ProductState, NewProduct } from '../../types/Product';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('product slice', () => {
  const initialState: ProductState = {
    products: [],
    singleProduct: null,
    loading: false,
    error: null,
  };

  // Mock product data
  const mockProducts: Product[] = [
    { id: 1, name: 'Product 1', price: 10, description: 'Description 1', category: { id: '1', name: 'Category 1' }, image: 'image-url' },
    { id: 2, name: 'Product 2', price: 20, description: 'Description 2', category: { id: '2', name: 'Category 2' }, image: 'image-url-2' },
  ];

  // Create a new product for testing the addProduct action
const newProduct: NewProduct = {
    name: 'Product 3',
    price: 30,
    description: 'Description 3',
    category: '3', // Use the ID as a string
    image: 'image-url-3'
  };

  
  // Configure mock store
  const store = configureStore({
    reducer: productReducer
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  // Test: fetchAllProducts
  it('should handle fetchAllProducts being fulfilled', async () => {
    mockedAxios.get.mockResolvedValue({ data: mockProducts });
    const result = await store.dispatch(fetchAllProducts());

    expect(result.type).toBe('products/fetchAllProducts/fulfilled');
    expect(store.getState().products).toEqual(mockProducts);
    expect(store.getState().loading).toBeFalsy();
  });

  it('should handle fetchAllProducts being rejected', async () => {
    mockedAxios.get.mockRejectedValue(new Error('Async error'));
    const result = await store.dispatch(fetchAllProducts());

    expect(result.type).toBe('products/fetchAllProducts/rejected');
    expect(store.getState().error).toBeDefined();
  });

  // Test: fetchProductById
  it('should handle fetchProductById being fulfilled', async () => {
    const productId = '1';
    const singleProduct = mockProducts[0];
    mockedAxios.get.mockResolvedValue({ data: singleProduct });
    const result = await store.dispatch(fetchProductById(productId));

    expect(result.type).toBe('products/fetchProductById/fulfilled');
    expect(store.getState().singleProduct).toEqual(singleProduct);
  });

  // Test: addProduct
  it('should handle addProduct being fulfilled', async () => {
    mockedAxios.post.mockResolvedValue({ data: { ...newProduct, id: 3, category: { id: '3', name: 'Category 3' } } });
    const result = await store.dispatch(addProduct(newProduct));
  
    expect(result.type).toBe('products/addProduct/fulfilled');
    expect(store.getState().products).toContainEqual({ ...newProduct, id: 3, category: { id: '3', name: 'Category 3' } });
  });
  
  // Test: deleteProduct
  it('should handle deleteProduct being fulfilled', async () => {
    const productId = '1';
    mockedAxios.delete.mockResolvedValue({ data: { id: productId } });
    const result = await store.dispatch(deleteProduct(productId));

    expect(result.type).toBe('products/deleteProduct/fulfilled');
    expect(store.getState().products).not.toContainEqual({ id: productId });
  });

  // Test: updateProduct
  it('should handle updateProduct being fulfilled', async () => {
    const updatedProduct = {
      name: 'Updated Product 1',
      price: 20,
      description: 'Updated Description 1',
      category: '1', // Provide category ID as a string
      image: 'updated-image-url'
    };
  
    // Mock the API response to include the full product data including the category object
    mockedAxios.put.mockResolvedValue({
      data: {
        ...mockProducts[0],
        ...updatedProduct,
        category: { id: '1', name: 'Category 1' } // The API might still return the full category object
      }
    });
  
    const result = await store.dispatch(updateProduct({ id: '1', updatedData: updatedProduct }));
  
    expect(result.type).toBe('product/updateProduct/fulfilled');
    expect(store.getState().products.find(p => p.id === 1)).toEqual({
      ...mockProducts[0],
      ...updatedProduct,
      category: { id: '1', name: 'Category 1' } // Assuming the store updates fully returned objects
    });
  });
});  