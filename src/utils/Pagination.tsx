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
            color: '#ff9a3c', 
          },
          '& .Mui-selected': {
            backgroundColor: '#ff9a3c', 
            color: '#fff', 
            '&:hover': {
              backgroundColor: '#115293', 
            },
          },
          '& .MuiPaginationItem-ellipsis': {
            color: 'black', 
          },
        }}
      />
    </Stack>
  );
};

export default Pagination;
