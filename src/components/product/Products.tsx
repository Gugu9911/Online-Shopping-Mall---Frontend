// Products.tsx
import React, { useEffect,useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchAllProducts } from '../../redux/slices/productSlice'; // Adjust the path as necessary
import ProductCards from './ProductCard'; // Adjust the path as necessary
import { useAppDispatch } from '../../redux/hooks';
import { sortProductsByPrice } from '../../utils/sortProducts';

const Products = () => {
    
    const dispatch = useAppDispatch();
    const { products, loading, error } = useSelector((state: any) => state.products);
    const [sortOrder, setSortOrder] = useState<string>(''); // Sorting order

    useEffect(() => {
        dispatch(fetchAllProducts());
    }, [dispatch]);

    // Sort products by price when sortOrder changes
    const sortedProducts = sortProductsByPrice(products, sortOrder);


  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error fetching products: {error}</p>;

  return (
    <div>
      <h2>Products</h2>
      <div>
        <select onChange={(e) => setSortOrder(e.target.value)}>
          <option value="">Sort by</option>
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
        </select>
      </div>
      <ProductCards products={sortedProducts} />
    </div>
  );
};

export default Products;
