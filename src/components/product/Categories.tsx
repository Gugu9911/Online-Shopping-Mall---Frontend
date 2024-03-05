import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchAllCategories } from '../../redux/slices/categorySlice';
import { fetchProductsByCategoryId, fetchAllProducts } from '../../redux/slices/productSlice';
import ProductCards from './ProductCard';
import { CategoryState } from '../../types/Category';
import { ProductState } from '../../types/Product';
import { sortProductsByPrice } from '../../utils/sortProducts';
import { Button, CircularProgress, Select, MenuItem, Box, Typography, Container, Grid } from '@mui/material';

const Categories = () => {
  const dispatch = useAppDispatch();
  const { categories, loading: categoriesLoading, error: categoriesError } = useAppSelector((state: { categories: CategoryState }) => state.categories);
  const { products, loading: productsLoading, error: productsError } = useAppSelector((state: { products: ProductState }) => state.products);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [sortOrder, setSortOrder] = useState<string>('');

  useEffect(() => {
    dispatch(fetchAllCategories());
    dispatch(fetchAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (selectedCategory !== null) {
      dispatch(fetchProductsByCategoryId(selectedCategory));
    }
  }, [selectedCategory, dispatch]);

  const sortedProducts = sortProductsByPrice(products, sortOrder);

  const displayedCategories = categories.slice(0, 4);
  const moreCategories = categories.slice(4);

  if (categoriesLoading) return <CircularProgress />;
  if (categoriesError) return <Typography variant="body1">Error fetching categories: {categoriesError}</Typography>;
  if (productsLoading) return <CircularProgress />;
  if (productsError) return <Typography variant="body1">Error fetching products: {productsError}</Typography>;

  return (
    <Container>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', my: 2 }}>
        {displayedCategories.map(category => (
          <Button key={category.id} variant="contained" onClick={() => setSelectedCategory(category.id)} sx={{ m: 1 }}>
            {category.name}
          </Button>
        ))}
        {moreCategories.length > 0 && (
          <div>
            <Button onClick={() => setShowDropdown(!showDropdown)} variant="contained" sx={{ m: 1 }}>
              More
            </Button>
            {showDropdown && (
              <Box className="dropdown-menu" sx={{ position: 'absolute', backgroundColor: 'white', boxShadow: 3 }}>
                {moreCategories.map(category => (
                  <Button key={category.id} onClick={() => setSelectedCategory(category.id)} sx={{ display: 'block', my: 0.5 }}>
                    {category.name}
                  </Button>
                ))}
              </Box>
            )}
          </div>
        )}
      </Box>
      <Box sx={{ minWidth: 120, my: 2 }}>
        <Select
          fullWidth
          displayEmpty
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="">
            <em>Sort by</em>
          </MenuItem>
          <MenuItem value="priceAsc">Price: Low to High</MenuItem>
          <MenuItem value="priceDesc">Price: High to Low</MenuItem>
        </Select>
      </Box>
      <Grid container spacing={2}>
        <ProductCards products={sortedProducts} />
      </Grid>
    </Container>
  );
};

export default Categories;
