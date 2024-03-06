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
    const { product, loading, error } = useAppSelector((state: any) => ({
        product: state.products.products.find((product: any) => product.id === parseInt(id ?? '')),
        loading: state.products.loading,
        error: state.products.error,
    }));
    const userRole = useAppSelector((state: any) => state.user.user?.role);

    useEffect(() => {
        if (id) {
            dispatch(fetchProductById(Number(id)));
        }
    }, [dispatch, id]);

    const handleDelete = async (productId: number) => {
        try {
            await dispatch(deleteProduct(productId)).unwrap();
            alert('Product deleted successfully');
            navigate('/');
        } catch (error) {
            alert(`Deletion failed: ${error}`);
        }
    };

    const handleUpdate = async (productId: number) => {
        try {
            console.log(productId);
            navigate(`/updateproduct/${productId}`);
        } catch (error) {
            alert(`Cannot navigate to the product: ${error}`);
        }
    };

    if (loading) return <CircularProgress />;
    if (error) return <Typography variant="body1" color="error">Error: {error}</Typography>;

    return (
        <Container maxWidth="md">
            {product ? (
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
                                src={getImageUrl(product.images[0])}
                                alt={product.title}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h5" component="h3">
                                {product.title}
                            </Typography>
                            <Typography variant="body1">{product.description}</Typography>
                            <Typography variant="h6" component="p" sx={{ mt: 2, mb: 2 }}>
                                Price: ${product.price}
                            </Typography>
                            <AddToCart product={product} />
                            {userRole === 'admin' && (
                                <Box sx={{ mt: 2 }}>
                                    <Button variant="contained" color="primary" sx={{ mr: 1 }} onClick={() => handleUpdate(product.id)}>
                                        Edit
                                    </Button>
                                    <Button variant="contained" color="error" onClick={() => handleDelete(product.id)}>
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
