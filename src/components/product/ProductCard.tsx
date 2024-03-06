import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import AddToCart from '../cart/AddToCart';
import { getImageUrl } from '../../utils/imageHandler';
import Pagination from '../../utils/Pagination';
import { Box, Card, CardActionArea, CardContent, CardMedia, Typography, Button, CardActions, Grid } from '@mui/material';

const ProductCards = ({ products }: { products: Product[] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Grid container spacing={3} justifyContent="center">
        {currentItems.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={getImageUrl(product.images[0])}
                  alt={product.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.title}
                  </Typography>
                  {/* <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography> */}
                  <Typography variant="body1" color="text.primary">
                    Price: ${product.price}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  <Link to={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    View Details
                  </Link>
                </Button>
                <AddToCart product={product} />
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Pagination
          totalItems={products.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </Box>
    </Box>
  );
};

export default ProductCards;
