import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchAllProducts, filterProductsByTitle } from '../../redux/slices/productSlice';
import ProductCards from './ProductCard';
import { useAppDispatch } from '../../redux/hooks';
import { sortProductsByPrice } from '../../utils/sortProducts';
import SearchBox from './SearchBox';
import { Box, CircularProgress, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';


const Products = () => {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useSelector((state: any) => state.products);
  const [sortOrder, setSortOrder] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');


  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const handleSearch = (query: string) => {
    dispatch(filterProductsByTitle(query));
    setSearchQuery(query);
  };

  const sortedProducts = sortProductsByPrice(products, sortOrder);

  if (loading) return <CircularProgress />;
  if (error) return <Typography variant="body1" color="error">Error fetching products: {error}</Typography>;

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>Products</Typography>
      <SearchBox onSearch={handleSearch} />
      <FormControl fullWidth>
        <InputLabel id="sort-order-label">Sort by</InputLabel>
        <Select
          labelId="sort-order-label"
          value={sortOrder}
          label="Sort by"
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <MenuItem value="">Sort by</MenuItem>
          <MenuItem value="priceAsc">Price: Low to High</MenuItem>
          <MenuItem value="priceDesc">Price: High to Low</MenuItem>
        </Select>
      </FormControl>
      {sortedProducts.length > 0 ? (
        <ProductCards products={sortedProducts} />
        
      ) : (
        <Typography variant="body1">No results for "{searchQuery}"</Typography>
      )}
    </Box>
  );
};

export default Products;