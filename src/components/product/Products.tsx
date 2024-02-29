// Products.tsx
import React, { useEffect,useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchAllProducts, filterProductsByTitle } from '../../redux/slices/productSlice'; // Adjust the path as necessary
import ProductCards from './ProductCard'; // Adjust the path as necessary
import { useAppDispatch } from '../../redux/hooks';
import { sortProductsByPrice } from '../../utils/sortProducts';
import SearchBox from './SearchBox';

const Products = () => {
    
    const dispatch = useAppDispatch();
    const { products, loading, error } = useSelector((state: any) => state.products);
    const [sortOrder, setSortOrder] = useState<string>(''); // Sorting order
    const [searchQuery, setSearchQuery] = useState<string>(''); // Search query

    useEffect(() => {
        dispatch(fetchAllProducts());
    }, [dispatch]);

    // Filter products based on search query
    const handleSearch = (query: string) => {
      dispatch(filterProductsByTitle(query)); // 使用用户的查询派发action
      setSearchQuery(query); // 更新查询状态
  };

    // Sort products by price when sortOrder changes
    const sortedProducts = sortProductsByPrice(products, sortOrder);


  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error fetching products: {error}</p>;

  return (
    <div>
      <h2>Products</h2>
      <SearchBox onSearch={handleSearch} />
      <div>
        <select onChange={(e) => setSortOrder(e.target.value)}>
          <option value="">Sort by</option>
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
        </select>
      </div>
      {/* 条件渲染：根据产品列表是否为空显示不同的内容 */}
      {sortedProducts.length > 0 ? (
        <div>
          <ProductCards products={sortedProducts} />
        </div>
            ) : (
              <p>无“{searchQuery}”的结果</p> // 当没有搜索结果时显示
            )}
    </div>
  );
};

export default Products;
