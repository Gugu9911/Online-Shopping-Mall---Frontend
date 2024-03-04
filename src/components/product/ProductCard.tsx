import { Link } from 'react-router-dom'; // Import Link component
import { Product } from '../../types/Product'; // Adjust the path as necessary
import AddToCart from '../cart/AddToCart';
import { getImageUrl } from '../../utils/imageHandler';


const ProductCards = ({ products }: { products: Product[] }) => {

  return (
    <div className="product-cards-container">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <img src={getImageUrl(product.images[0])} alt={product.title} style={{ width: '100px', height: '100px' }} />
          {/* Add a Link or button to navigate to the product detail page */}
          <Link to={`/products/${product.id}`} className="product-detail-link">View Details</Link>
          <AddToCart product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductCards;
