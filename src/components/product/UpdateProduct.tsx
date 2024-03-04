import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchProductById, updateProduct } from '../../redux/slices/productSlice';
import { fetchAllCategories } from '../../redux/slices/categorySlice';
import { CategoryState } from '../../types/Category';
import { UpdatedProduct, Product } from '../../types/Product';
import 'react-toastify/dist/ReactToastify.css';
import { uploadFile } from '../../redux/slices/fileSlice'; 

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
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" name="title" value={updatedProduct.title} onChange={handleChange} required />
        </div>
        <div>
          <label>Price:</label>
          <input type="number" name="price" value={updatedProduct.price} onChange={handleChange} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={updatedProduct.description} onChange={handleChange} required />
        </div>
        <div>
          <label>Category:</label>
          <select name="categoryId" value={updatedProduct.categoryId} onChange={handleChange} required>
            <option value="">Select a Category</option>
            {categories.map((category: { id: number; name: string }) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Images:</label>
          <input type="file" multiple onChange={handleFileChange} />
        </div>
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default UpdateProduct;
