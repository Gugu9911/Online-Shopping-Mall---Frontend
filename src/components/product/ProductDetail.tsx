import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../../redux/slices/productSlice';
import { useAppDispatch } from '../../redux/hooks';
import { deleteProduct } from '../../redux/slices/productSlice';
import { useNavigate } from 'react-router-dom';

const ProductDetail: React.FC = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate(); 

    // Fetching the product details as you already are
    const { product, loading, error } = useSelector((state: any) => ({
        product: state.products.products.find((product: any) => product.id === parseInt(id ?? '')),
        loading: state.products.loading,
        error: state.products.error,
    }));

    // Fetching the current user's role
    const userRole = useSelector((state: any) => state.user.user?.role);

    useEffect(() => {
        if (id) {
            dispatch(fetchProductById(Number(id)));
        }
    }, [dispatch, id]);

    // Function to handle product deletion
    const handleDelete = async (productId: number) => {
        try {
            await dispatch(deleteProduct(productId)).unwrap(); // Use .unwrap() to handle the promise result
            alert('Product deleted successfully'); // Notify the user
            navigate('/'); // Redirect to a safe route after deletion
        } catch (error) {
            alert(`Deletion failed: ${error}`); // Notify the user in case of error
        }
    };

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
                    {/* Conditionally render modify/delete buttons for admin users */}
                    {userRole === 'admin' && (
                        <div>
                            <button>Edit</button>
                            <button onClick={() => handleDelete(product.id)}>Delete</button>
                        </div>
                    )}
                </div>
            ) : (
                <p>Product not found</p>
            )}
        </div>
    );
};

export default ProductDetail;
