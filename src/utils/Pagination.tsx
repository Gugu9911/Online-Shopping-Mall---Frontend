import React from 'react';
import { Pagination as MUIPagination, Stack } from '@mui/material';
import { PaginationProps } from '../types/Product';

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }: PaginationProps) => {
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    onPageChange(page);
  };

  return (
    <Stack spacing={2} justifyContent="center" alignItems="center" padding={2}>
      <MUIPagination
        count={pageCount}
        page={currentPage}
        onChange={handleChange}
        variant="outlined"
        shape="rounded"
        // Apply custom CSS styles using the sx prop
        sx={{
          '& .MuiPaginationItem-root': {
            color: '#1976d2', // Change the color of the pagination items
          },
          '& .Mui-selected': {
            backgroundColor: '#1976d2', // Change the background color of the selected item
            color: '#fff', // Change the text color of the selected item
            '&:hover': {
              backgroundColor: '#115293', // Darken the background color on hover
            },
          },
          '& .MuiPaginationItem-ellipsis': {
            color: 'black', // Change the color of the ellipsis
          },
        }}
      />
    </Stack>
  );
};

export default Pagination;
