import React, { useState, useEffect } from 'react';
import { addProduct } from '../../redux/slices/productSlice'; 
import { uploadFile } from '../../redux/slices/fileSlice'; 
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch,useAppSelector } from '../../redux/hooks';
import { NewProduct } from '../../types/Product'; 
import { fetchAllCategories } from '../../redux/slices/categorySlice';
import { CategoryState } from '../../types/Category';
import { useNavigate } from 'react-router-dom';

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
  

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  // Handle file input for images, upload them, and update state with URLs
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const uploadPromises = files.map(file => dispatch(uploadFile(file)).unwrap());
  
      try {
        const imageResponses = await Promise.all(uploadPromises);
        const imageUrls = imageResponses.map(response => response.location); // Assuming the response has a location property
        setNewProduct({ ...newProduct, images: imageUrls });
      } catch (error) {
        alert('Error uploading image(s)'); // 使用 alert 替代 toast.error
      }
    }
  };
  

// Submit the new product with image URLs
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const productToSubmit: NewProduct = {
    ...newProduct,
    categoryId: Number(newProduct.categoryId),
    price: Number(newProduct.price)
  };
  dispatch(addProduct(productToSubmit))
    .unwrap()
    .then(() => {
      alert('Product added successfully'); // 使用 alert 替代 toast.success
      // Reset the form by setting the state back to its initial values
      setNewProduct({
        title: '',
        price: 0,
        description: '',
        categoryId: 0,
        images: [],
      });
      navigate('/');
      // Optionally redirect the user
    })
    .catch((error) => {
      alert(`Error: ${error}`); // 使用 alert 替代 toast.error
    });
};

  

  // Change handler for the category dropdown
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setNewProduct({ ...newProduct, categoryId: Number(value) });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" name="title" value={newProduct.title} onChange={handleChange} required />
        </div>
        <div>
          <label>Price:</label>
          <input type="number" name="price" value={newProduct.price} onChange={handleChange} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={newProduct.description} onChange={handleChange} required />
        </div>
        <div>
          <label>Category:</label>
          <select name="categoryId" value={newProduct.categoryId} onChange={handleCategoryChange} required>
            <option value="">Select a Category</option>
            {categories.categories.map((category) => (
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
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
