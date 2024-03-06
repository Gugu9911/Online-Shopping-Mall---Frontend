import React, { useState, useEffect } from 'react';
import { addProduct } from '../../redux/slices/productSlice';
import { uploadFile } from '../../redux/slices/fileSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { NewProduct } from '../../types/Product';
import { fetchAllCategories } from '../../redux/slices/categorySlice';
import { CategoryState } from '../../types/Category';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, TextareaAutosize, FormControl, InputLabel, Select, MenuItem, Box, Typography, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import 'react-toastify/dist/ReactToastify.css';

const Input = styled('input')({
  display: 'none',
});

const StyledTextArea = styled(TextareaAutosize)(({ theme }) => ({
  width: '100%',
  border: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  fontSize: '0.875rem',
  fontFamily: theme.typography.fontFamily,
  transition: theme.transitions.create(['border-color', 'box-shadow']),
  '&:focus': {
    boxShadow: `${theme.palette.primary.main} 0 0 0 2px`,
    borderColor: theme.palette.primary.main,
  },
}));

const AddProduct = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state: { categories: CategoryState }) => state.categories);
  const navigate = useNavigate();

  const [newProduct, setNewProduct] = useState<NewProduct>({
    title: '',
    price: 0,
    description: '',
    categoryId: 0,
    images: [],
  });

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const uploadPromises = files.map(file => dispatch(uploadFile(file)).unwrap());

      try {
        const imageResponses = await Promise.all(uploadPromises);
        const imageUrls = imageResponses.map(response => response.location); // Assuming the response has a location property
        setNewProduct({ ...newProduct, images: imageUrls });
      } catch (error) {
        alert('Error uploading image(s)');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const productToSubmit: NewProduct = {
      ...newProduct,
      categoryId: Number(newProduct.categoryId),
      price: Number(newProduct.price),
    };
    dispatch(addProduct(productToSubmit))
      .unwrap()
      .then(() => {
        alert('Product added successfully');
        setNewProduct({
          title: '',
          price: 0,
          description: '',
          categoryId: 0,
          images: [],
        });
        navigate('/');
      })
      .catch((error) => {
        alert(`Error: ${error}`);
      });
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 4 }}>
      <Paper elevation={3} sx={{ padding: 2, margin: 'auto', maxWidth: '100%', overflow: 'hidden' }}>
        <Typography variant="h6" gutterBottom component="div" sx={{ textAlign: 'center' }}>
          Add New Product
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={newProduct.title}
                onChange={handleChange}
                required
                sx={{ marginBottom: 2 }}
              />
              <TextField
                fullWidth
                type="number"
                label="Price"
                name="price"
                value={newProduct.price}
                onChange={handleChange}
                required
                sx={{ marginBottom: 2 }}
              />
              <StyledTextArea
                minRows={3}
                placeholder="Description"
                name="description"
                value={newProduct.description}
                onChange={handleChange}
                required
              />
              <FormControl fullWidth sx={{ marginTop: 2, marginBottom: 2 }}>
                <InputLabel>Category</InputLabel>
                <Select
                  name="categoryId"
                  value={String(newProduct.categoryId)}
                  label="Category"
                  onChange={e => setNewProduct({ ...newProduct, categoryId: Number(e.target.value) })}
                  required
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {categories.categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <label htmlFor="contained-button-file">
                <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={handleFileChange} />
                <Button variant="contained" component="span" fullWidth>
                  Upload Images
                </Button>
              </label>
            </Grid>
            <Grid item xs={12} sx={{ marginTop: 2 }}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Add Product
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default AddProduct;
