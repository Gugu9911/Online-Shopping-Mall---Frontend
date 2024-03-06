// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useAppDispatch, useAppSelector } from '../../redux/hooks';
// import { fetchProductById, updateProduct } from '../../redux/slices/productSlice';
// import { fetchAllCategories } from '../../redux/slices/categorySlice';
// import { UpdatedProduct, Product } from '../../types/Product';
// import 'react-toastify/dist/ReactToastify.css';
// import { uploadFile } from '../../redux/slices/fileSlice'; 
// import { Button, TextField, TextareaAutosize, FormControl, InputLabel, Select, MenuItem, Box, Typography, Grid, Input } from '@mui/material';


// const UpdateProduct = () => {
//   const { productId } = useParams<{ productId: string }>();
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();

//   const categories = useAppSelector((state: any) => state.categories.categories);
//   const product = useAppSelector((state: any) => state.products.singleProduct);

//   const [updatedProduct, setUpdatedProduct] = useState<UpdatedProduct>({
//     title: '',
//     price: 0,
//     description: '',
//     categoryId: 0,
//     images: [],
//   });

//   useEffect(() => {
//     if (productId) dispatch(fetchProductById(Number(productId)));
//   }, [dispatch, productId]);

//   useEffect(() => {
//     dispatch(fetchAllCategories());
//   }, [dispatch]);

//   useEffect(() => {
//     if (product) {
//       setUpdatedProduct({
//         title: product.title,
//         price: product.price,
//         description: product.description,
//         categoryId: product.category.id,
//         images: product.images,
//       });
//     }
//   }, [product]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setUpdatedProduct((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       const files = Array.from(e.target.files);
//       const uploadPromises = files.map(file => dispatch(uploadFile(file)).unwrap());

//       try {
//         const imageResponses = await Promise.all(uploadPromises);
//         const imageUrls = imageResponses.map(response => response.location); // Assuming the response has a location property
//         setUpdatedProduct({ ...updatedProduct, images: imageUrls });
//       } catch (error) {
//         alert('Error uploading image(s)'); 
//       }
//     }
//   };


//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!productId) return;

//     const productToUpdate: UpdatedProduct = {
//       ...updatedProduct,
//       categoryId: Number(updatedProduct.categoryId),
//       price: Number(updatedProduct.price),
//     };

//     dispatch(updateProduct({ id: Number(productId), updatedData: productToUpdate }))
//       .unwrap()
//       .then(() => {
//         alert('Product updated successfully');
//         navigate('/');
//       })
//       .catch((error) => {
//         alert(`Error: ${error.message}`);
//       });
//   };


// return (
//   <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
//     <Grid container spacing={2}>
//       <Grid item xs={12}>
//         <TextField
//           fullWidth
//           label="Title"
//           name="title"
//           value={updatedProduct.title}
//           onChange={handleChange}
//           required
//           variant="outlined"
//         />
//       </Grid>
//       <Grid item xs={12}>
//         <TextField
//           fullWidth
//           label="Price"
//           type="number"
//           name="price"
//           value={updatedProduct.price}
//           onChange={handleChange}
//           required
//           variant="outlined"
//         />
//       </Grid>
//       <Grid item xs={12}>
//         <InputLabel htmlFor="description">Description</InputLabel>
//         <TextareaAutosize
//           minRows={3}
//           style={{ width: '100%' }}
//           name="description"
//           value={updatedProduct.description}
//           onChange={handleChange}
//           required
//         />
//       </Grid>
//       <Grid item xs={12}>
//       <div>
//           <label>Category:</label>
//           <select name="categoryId" value={updatedProduct.categoryId} onChange={handleChange} required>
//             <option value="">Select a Category</option>
//             {categories.map((category: { id: number; name: string }) => (
//               <option key={category.id} value={category.id}>
//                 {category.name}
//               </option>
//             ))}
//           </select>
//         </div>
//       </Grid>
//       <Grid item xs={12}>
//         <Typography variant="h6" gutterBottom component="div">
//           Images:
//         </Typography>
//         <Input
//           type="file"
//           inputProps={{
//             multiple: true,
//           }}
//           onChange={handleFileChange}
//         />
//       </Grid>
//     </Grid>
//     <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
//       Update Product
//     </Button>
//   </Box>
// );
// };

// export default UpdateProduct;

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchProductById, updateProduct } from '../../redux/slices/productSlice';
import { fetchAllCategories } from '../../redux/slices/categorySlice';
import { UpdatedProduct, Product } from '../../types/Product';
import { uploadFile } from '../../redux/slices/fileSlice';
import { Button, TextField, TextareaAutosize, FormControl, InputLabel, Select, MenuItem, Box, Typography, Grid, Input, Paper, Container, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import  { SelectChangeEvent } from '@mui/material/Select';


const UpdateProduct = () => {
  const { productId } = useParams<{ productId: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const categories = useAppSelector((state: any) => state.categories.categories);
  const product = useAppSelector((state: any) => state.products.singleProduct);

  const [updatedProduct, setUpdatedProduct] = useState<UpdatedProduct>({
    title: '',
    price: 0,
    description: '',
    categoryId: 0,
    images: [],
  });

  useEffect(() => {
    if (productId) dispatch(fetchProductById(Number(productId)));
  }, [dispatch, productId]);

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  useEffect(() => {
    if (product) {
      setUpdatedProduct({
        title: product.title,
        price: product.price,
        description: product.description,
        categoryId: product.category.id,
        images: product.images,
      });
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUpdatedProduct((prev) => ({ ...prev, [name]: value }));
  };

  // New handleCategoryChange specifically for the Material-UI Select component
  const handleCategoryChange = (event: SelectChangeEvent) => {
    const name = 'categoryId';
    const value = event.target.value;
    setUpdatedProduct((prev) => ({
      ...prev,
      [name]: Number(value) // Convert string value to number here
    }));
  };



  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const uploadPromises = files.map(file => dispatch(uploadFile(file)).unwrap());

      try {
        const imageResponses = await Promise.all(uploadPromises);
        const imageUrls = imageResponses.map(response => response.location); // Assuming the response has a location property
        setUpdatedProduct({ ...updatedProduct, images: imageUrls });
      } catch (error) {
        alert('Error uploading image(s)');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!productId) return;

    const productToUpdate: UpdatedProduct = {
      ...updatedProduct,
      categoryId: Number(updatedProduct.categoryId),
      price: Number(updatedProduct.price),
    };

    dispatch(updateProduct({ id: Number(productId), updatedData: productToUpdate }))
      .unwrap()
      .then(() => {
        alert('Product updated successfully');
        navigate('/');
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
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Title"
                  name="title"
                  value={updatedProduct.title}
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
                    value={updatedProduct.categoryId?.toString()}
                    onChange={handleCategoryChange}
                    required
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {categories.map((category: { id: number; name: string }) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom component="div">
                  Images:
                </Typography>
                <Button variant="contained" component="label" sx={{ mr: 2 }}>
                  Upload File
                  <input
                    hidden
                    accept="image/*"
                    multiple
                    type="file"
                    onChange={handleFileChange}
                  />
                </Button>
                {updatedProduct.images?.map((image, index) => (
                  <Box key={index} component="img" src={image} sx={{ width: 100, height: 100, mr: 2 }} />
                ))}
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
