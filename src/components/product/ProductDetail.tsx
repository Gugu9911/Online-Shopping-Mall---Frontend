import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../../redux/slices/productSlice';
import { useAppDispatch } from '../../redux/hooks';

const ProductDetail: React.FC = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams<{ id: string }>();

    const { product, loading, error } = useSelector((state: any) => ({
        product: state.products.products.find((product: any) => product.id === parseInt(id ?? '')),
        loading: state.products.loading,
        error: state.products.error,
    }));

    useEffect(() => {
        if (id) {
            dispatch(fetchProductById(Number(id)));
        }
    }, [dispatch, id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            {product ? (
                <div>
                    <h3>{product.title}</h3>
                    <p>{product.description}</p>
                    <p>Price: ${product.price}</p>
                    <img src={product.images[0]} alt={product.title} style={{ width: '100px', height: '100px' }} />
                </div>
            ) : (
                <p>Product not found</p>
            )}
        </div>
    );
};

export default ProductDetail;
