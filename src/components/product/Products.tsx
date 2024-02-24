// Products.tsx
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchAllProducts } from '../../redux/slices/productSlice'; // Adjust the path as necessary
import ProductCards from './ProductCard'; // Adjust the path as necessary
import { useAppDispatch } from '../../redux/hooks';

const Products = () => {
    
    const dispatch = useAppDispatch();
    const { products, loading, error } = useSelector((state: any) => state.products);

    useEffect(() => {
        dispatch(fetchAllProducts());
    }, [dispatch]);


  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error fetching products: {error}</p>;

  return (
    <div>
      <h2>Products</h2>
      <ProductCards products={products} />
    </div>
  );
};

export default Products;
