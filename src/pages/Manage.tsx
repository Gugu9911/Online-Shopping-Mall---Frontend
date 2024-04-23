
import { Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Manage = () => {
  const navigate = useNavigate();

  const handleAddProduct = () => {
    navigate('/addProduct');
  };

  const handleManageCategory = () => {
    navigate('/managecategories');
  };

  const handleManageOrders = () => {
    navigate('/manageorders');
  }



  return (
    <Box sx={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Management Dashboard
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddProduct}
        sx={{ width: '250px' }}
      >
        Add Product
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={handleManageCategory}
        sx={{ width: '250px' }}
      >
        Manage Category
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={handleManageOrders}
        sx={{ width: '250px' }}
      >
        Manage Orders
      </Button>
    </Box>
  );
};

export default Manage;