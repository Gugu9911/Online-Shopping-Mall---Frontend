import React, { useState, useEffect } from 'react';
import { addProduct } from '../../redux/slices/productSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { NewProduct } from '../../types/Product';
import { fetchAllCategories } from '../../redux/slices/categorySlice';
import { CategoryState } from '../../types/Category';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, TextareaAutosize, FormControl, InputLabel, Select, MenuItem, Box, Typography, Grid, Paper, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { uploadImage } from '../../misc/uploadFileService';
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
  const [image, setImage] = useState('');

  const [newProduct, setNewProduct] = useState<NewProduct>({
    name: '',
    price: 0,
    description: '',
    category: '',
    image: '',
  });

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  // handleFileChange and handleSubmit methods remain unchanged
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      try {
        const file = files[0];
        const imageUrl = await uploadImage(file);
        console.log('imageUrl:', imageUrl);
        setImage(imageUrl);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const productToSubmit: NewProduct = {
      ...newProduct,
      category: newProduct.category,
      price: newProduct.price,
    };

    const imageUrl = image || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMdb1SV8txyHe0RSMikSkGbch9-EF5cnlxpw&s';

    productToSubmit.image = imageUrl;

    dispatch(addProduct(productToSubmit))
      .unwrap()
      .then(() => {
        alert('Product added successfully');
        setNewProduct({
          name: '',
          price: 0,
          description: '',
          category: '',
          image: '',
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
                label="Name"
                name="name"
                value={newProduct.name}
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
                  value={newProduct.category}
                  label="Category"
                  onChange={e => setNewProduct({ ...newProduct, category: (e.target.value) })}
                  required
                >
                  <MenuItem value="">
                    <em>Please select a category:</em>
                  </MenuItem>
                  {categories.categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Avatar
                src={image || "https://via.placeholder.com/150"} 
                sx={{ width: 150, height: 150, mb: 2 , marginLeft: 'auto', marginRight: 'auto'}}
                alt="User Avatar"
              />
              <label htmlFor="contained-button-file">
                <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={handleImageUpload} />
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
