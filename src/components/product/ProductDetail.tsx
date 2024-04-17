import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchProductById, deleteProduct } from '../../redux/slices/productSlice';
import AddToCart from '../cart/AddToCart';
import { getImageUrl } from '../../utils/imageHandler';
import { Button, CircularProgress, Container, Grid, Paper, Typography, Box } from '@mui/material';

const ProductDetail: React.FC = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { singleProduct, loading, error } = useAppSelector((state: any) => state.products);
    const userRole = useAppSelector((state: any) => state.user.user?.role);

    useEffect(() => {
        if (id) {
            dispatch(fetchProductById(id));
        }
    }, [dispatch, id]);

    const handleDelete = async (productId: string) => {
        try {
            await dispatch(deleteProduct(productId)).unwrap();
            alert('Product deleted successfully');
            navigate('/');
        } catch (error: any) {
            alert(`Deletion failed: ${error.message}`);
        }
    };

    const handleUpdate = (productId: string) => {
        navigate(`/updateproduct/${productId}`);
    };

    if (loading) return <CircularProgress />;
    if (error) return <Typography variant="body1" color="error">Error: {error}</Typography>;

    return (
        <Container maxWidth="md">
            {singleProduct ? (
                <Paper elevation={3} sx={{ p: 4, my: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Box
                                component="img"
                                sx={{
                                    width: '100%',
                                    height: 'auto',
                                    maxWidth: '300px',
                                    display: 'block',
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                }}
                                src={getImageUrl(singleProduct.image)}
                                alt={singleProduct.name}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h5" component="h3">
                                {singleProduct.name}
                            </Typography>
                            <Typography variant="body1">{singleProduct.description}</Typography>
                            <Typography variant="h6" component="p" sx={{ mt: 2, mb: 2 }}>
                                Price: ${singleProduct.price}
                            </Typography>
                            <AddToCart product={singleProduct} />
                            {userRole === 'admin' && (
                                <Box sx={{ mt: 2 }}>
                                    <Button variant="contained" color="primary" sx={{ mr: 1 }} onClick={() => handleUpdate(singleProduct.id.toString())}>
                                        Edit
                                    </Button>
                                    <Button variant="contained" color="error" onClick={() => handleDelete(singleProduct.id.toString())}>
                                        Delete
                                    </Button>
                                </Box>
                            )}
                        </Grid>
                    </Grid>
                </Paper>
            ) : (
                <Typography variant="body1">Product not found</Typography>
            )}
        </Container>
    );
};

export default ProductDetail;
