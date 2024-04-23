import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getOrdersByUserId, deleteOrder } from '../redux/slices/orderSlice';
import { Masonry } from '@mui/lab';
import { Card, CardContent, CardMedia, Typography, Box, CircularProgress, Button } from '@mui/material';
import { RootState } from '../redux/store';
import { Order, OrderItem } from '../types/Order';

const OrdersPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { user, loading: userLoading, error: userError } = useAppSelector((state: RootState) => state.user);
    const { orders, loading: ordersLoading, error: ordersError } = useAppSelector((state: RootState) => state.order);

    useEffect(() => {
        if (user) {
            dispatch(getOrdersByUserId(user.id)).unwrap()
                .then(() => { // Assuming the resolved value is the fetched orders
                    console.log('Orders fetched successfully');
                })
                .catch((error) => {
                    console.error('Failed to fetch orders:', error);
                });
        }
    }, [dispatch, user]);


    const handleDelete = (orderId: string) => {
        dispatch(deleteOrder(orderId)).unwrap()
            .then(() => {
                console.log('Successfully deleted order');
                window.alert("Successfully deleted order");
            })
            .catch((error) => {
                console.error('Failed to delete order:', error);
            });
    };


    const formTime = (time: string) => {
        return new Date(time).toLocaleString();
    }

    if (userLoading || ordersLoading) return <CircularProgress />;
    if (userError) return <Typography color="error">User Error: {userError}</Typography>;
    if (!orders || orders.length === 0) return <Typography>No Orders yet</Typography>;
    if (ordersError) return <Typography color="error">Orders Error: {ordersError}</Typography>;

    const calculateTotalItems = (items: OrderItem[]) => {
        return items.reduce((total, item) => total + item.quantity, 0);
    };

    const calculateTotalPrice = (items: OrderItem[]) => {
        return items.reduce((total, item) => total + (item.quantity * (item.product?.price || 0)), 0);
    };


    return (
        <Box sx={{ flexGrow: 1, padding: 2 }}>
            <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={2}>
                {orders.map((order: Order) => (
                    <Card raised key={order.id}>
                        <CardContent>
                            <Typography gutterBottom>
                                Order ID: {order.id}
                            </Typography>
                            <Typography color="textSecondary" gutterBottom>
                                Created At: {formTime(order.createdAt)}
                            </Typography>
                            <Typography color="textSecondary" gutterBottom>
                                Total Items: {calculateTotalItems(order.items)}
                            </Typography>
                            <Typography color="textSecondary" gutterBottom>
                                Total Price: ${calculateTotalPrice(order.items).toFixed(2)}
                            </Typography>
                        </CardContent>
                        {order.items.map((item: OrderItem, index) => (
                            <CardContent
                                key={item.id}
                                sx={{
                                    display: 'flex', // Set display to flex to align children side by side
                                    alignItems: 'center', // Align items vertically at the center
                                    borderBottom: index !== order.items.length - 1 ? '1px solid #ccc' : '',
                                    padding: 2
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    sx={{ width: 120, height: 120, marginRight: 2 }} // Control size and add margin
                                    image={item.product?.image}
                                    alt={item.product?.name}
                                />
                                <Box sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h6" component="div">
                                        {item.product?.name}
                                    </Typography>
                                    <Typography variant="body1" color="text.primary">
                                        Quantity: {item.quantity}
                                    </Typography>
                                    <Typography variant="body1" color="text.primary">
                                        Price: $ {item.product?.price * item.quantity} 
                                    </Typography>
                                </Box>
                            </CardContent>
                        ))}
                        {(user?.role === 'admin' || user?.id === order.user?.id) && (
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => handleDelete(order.id)}
                                sx={{ margin: 2, alignSelf: 'flex-start' }}
                            >
                                Delete Order
                            </Button>
                        )}

                    </Card>
                ))}
            </Masonry>
        </Box>
    );

};

export default OrdersPage;