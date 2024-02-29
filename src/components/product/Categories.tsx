import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/hooks';
import { fetchAllCategories } from '../../redux/slices/categorySlice'; // Adjust import paths as necessary
import { fetchProductsByCategoryId, fetchAllProducts } from '../../redux/slices/productSlice'; // Import your async thunk
import ProductCards from './ProductCard'; // Ensure correct import
import { CategoryState } from '../../types/Category'; // Adjust import paths
import { ProductState } from '../../types/Product'; // Adjust import paths
import { sortProductsByPrice } from '../../utils/sortProducts';


const Categories = () => {
  const dispatch = useAppDispatch();
  const { categories, loading: categoriesLoading, error: categoriesError } = useSelector((state: { categories: CategoryState }) => state.categories);
  const { products, loading: productsLoading, error: productsError } = useSelector((state: { products: ProductState }) => state.products);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [showDropdown, setShowDropdown] = useState(false); // Control the display of the dropdown menu
  const [sortOrder, setSortOrder] = useState<string>(''); // Sorting order

  // Fetch all categories and products on component mount
  useEffect(() => {
    dispatch(fetchAllCategories());
    dispatch(fetchAllProducts());
  }, [dispatch]);

  // Fetch products by category when selectedCategory changes
  useEffect(() => {
    if (selectedCategory !== null) {
      dispatch(fetchProductsByCategoryId(selectedCategory));
    }
  }, [selectedCategory, dispatch]);

  // Sort products by price when sortOrder changes
  const sortedProducts = sortProductsByPrice(products, sortOrder);


  // Derived state: unique categories (assuming categories are unique by default)
  const displayedCategories = categories.slice(0, 4);
  const moreCategories = categories.slice(4);

  if (categoriesLoading) return <div>Loading categories...</div>;
  if (categoriesError) return <div>Error fetching categories: {categoriesError}</div>;
  if (productsLoading) return <div>Loading products...</div>;
  if (productsError) return <div>Error fetching products: {productsError}</div>;

  return (
    <div>
      <nav className="categories-nav">
        {displayedCategories.map(category => (
          <button key={category.id} onClick={() => setSelectedCategory(category.id)}>
            {category.name}
          </button>
        ))}
        {moreCategories.length > 0 && (
          <div>
            <button onClick={() => setShowDropdown(!showDropdown)}>More</button>
            {showDropdown && (
              <div className="dropdown-menu">
                {moreCategories.map(category => (
                  <button key={category.id} onClick={() => setSelectedCategory(category.id)}>
                    {category.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </nav>
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

export default Categories;
