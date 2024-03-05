import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchAllProducts, filterProductsByTitle } from '../../redux/slices/productSlice';
import ProductCards from './ProductCard';
import { useAppDispatch } from '../../redux/hooks';
import { sortProductsByPrice } from '../../utils/sortProducts';
import SearchBox from './SearchBox';
import { Box, CircularProgress, Typography, Select, MenuItem, FormControl, InputLabel, Grid, Paper } from '@mui/material';


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

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress /></Box>;
  if (error) return <Typography variant="body1" color="error" sx={{ textAlign: 'center' }}>Error fetching products: {error}</Typography>;

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 3 }}>Products</Typography>
      <Grid container spacing={2} alignItems="center" justifyContent="flex-start">
        <Grid item xs={12} sm={3} lg={2} sx={{ marginLeft: '3vw' }}>
          <FormControl fullWidth variant="outlined" size="small" sx={{ ".MuiOutlinedInput-root": { borderRadius: '50px' } }}>
            <InputLabel id="sort-order-label">Sort by</InputLabel>
            <Select
              labelId="sort-order-label"
              value={sortOrder}
              label="Sort by"
              onChange={(e) => setSortOrder(e.target.value)}
              sx={{ ".MuiSelect-select": { py: 1.5, borderRadius: '50px' }, ".MuiOutlinedInput-notchedOutline": { borderRadius: '50px' } }}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="priceAsc">Price: Low to High</MenuItem>
              <MenuItem value="priceDesc">Price: High to Low</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} lg={5} sx={{ mx: "auto" }}>
          <SearchBox onSearch={handleSearch} />
        </Grid>
      </Grid>
      {sortedProducts.length > 0 ? (
        <ProductCards products={sortedProducts} />
      ) : (
        <Typography variant="body1" sx={{ textAlign: 'center', mt: 2 }}>No results for "{searchQuery}"</Typography>
      )}
    </Box>
  );
};

export default Products;
