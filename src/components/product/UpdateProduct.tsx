import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchProductById, updateProduct } from '../../redux/slices/productSlice';
import { fetchAllCategories } from '../../redux/slices/categorySlice';
import { UpdatedProduct } from '../../types/Product';
import { Button, TextField, FormControl, InputLabel, Select, MenuItem, Box, Typography, Grid, Paper, Container, CssBaseline, Avatar } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { uploadImage } from '../../misc/uploadFileService';


const UpdateProduct = () => {
  const { productId } = useParams<{ productId: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [image, setImage] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  const categories = useAppSelector((state: any) => state.categories.categories);
  const product = useAppSelector((state: any) => state.products.singleProduct);

  const [updatedProduct, setUpdatedProduct] = useState<UpdatedProduct>({
    name: '',
    price: 0,
    description: '',
    category: '',
    image: '',
  });

  useEffect(() => {
    if (productId) dispatch(fetchProductById(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  useEffect(() => {
    if (product) {
      setUpdatedProduct({
        name: product.name,
        price: product.price,
        description: product.description,
        category: product.category,
        image: product.image,
      });
      setImagePreview(product.image);
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUpdatedProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string; // Assuming category IDs are strings
    setUpdatedProduct(prev => ({
      ...prev,
      category: value
    }));
  };


  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      if (file.size > 5000000) { // restrict file size to 5MB
        alert('File size should be less than 5MB');
        return;
      }
      try {
        const imageUrl = await uploadImage(file);
        setImage(imageUrl);
        setImagePreview(URL.createObjectURL(file)); // setting preview from the local file
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Error uploading image: ' + ((error as Error).message || 'Unknown error'));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!productId) return;

    const productToUpdate: UpdatedProduct = {
      ...updatedProduct,
      category: updatedProduct.category,
      price: updatedProduct.price,
      image: image || updatedProduct.image,
    };

    dispatch(updateProduct({ id: productId, updatedData: productToUpdate }))
      .unwrap()
      .then(() => {
        alert('Product updated successfully');
        navigate(`/products/${productId}`);
      })
      .catch((error) => {
        alert(`Error: ${error.message}`);
      });
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Paper elevation={3} sx={{ my: 4, p: 3 }}>
        <Typography component="h1" variant="h5" align="center">
          Update Product
        </Typography>
        <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" alignItems="center" gap={2}>

          <Avatar src={imagePreview || updatedProduct.image} sx={{ width: 300, height: 300, borderRadius: 0 }} />
          <Grid item xs={12}>
            <Button variant="contained" component="label" sx={{ minBlockSize: 2 }}>
              Upload Product Picture
              <input
                hidden
                accept="image/*"
                multiple
                type="file"
                onChange={handleImageUpload}
              />
            </Button>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={updatedProduct.name}
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Price"
                type="number"
                name="price"
                value={updatedProduct.price}
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                multiline
                rows={4}
                value={updatedProduct.description}
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  label="Category"
                  name="categoryId"
                  value={updatedProduct.category}
                  onChange={handleCategoryChange}
                  required
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {categories.map((category: { id: string; name: string }) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Update Product
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default UpdateProduct;
