// src/features/categories/CategoryManagement.tsx
import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { useAppSelector } from '../../redux/hooks';
import { fetchAllCategories, createCategory, updateCategory,deleteCategory} from '../../redux/slices/categorySlice';
import { Button, TextField, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton,Box, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import { Category } from '../../types/Category';

const CategoryManagement: React.FC = () => {
    const dispatch = useAppDispatch();
    const { categories } = useAppSelector((state) => state.categories);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [editCategoryId, setEditCategoryId] = useState('');
    const [editedName, setEditedName] = useState('');

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  const handleCreate = () => {
    if (newCategoryName.trim()) {
      dispatch(createCategory({ name: newCategoryName }))
        .unwrap()
        .then(() => {
          setNewCategoryName('');  // Reset input field
          dispatch(fetchAllCategories());  // Refetch categories
        })
        .catch((error) => console.error('Creation failed:', error));
    }
  };

  const handleUpdate = (id: string) => {
    if (editedName.trim()) {
      dispatch(updateCategory({ id, name: editedName }))
        .unwrap()
        .then(() => {
          setEditCategoryId('');  // Reset editing mode
          dispatch(fetchAllCategories());
        })
        .catch((error) => console.error('Update failed:', error));
    }
  };

  const handleDelete = (id: string) => {
    dispatch(deleteCategory(id))
      .unwrap()
      .then(() => {
        dispatch(fetchAllCategories());  // Refetch categories
        console.log('Successfully deleted category');
      })
      .catch((error) => console.error('Deletion failed:', error));
  };

  return (
    <Box sx={{ padding: '1rem', maxWidth: '600px', margin: 'auto' }}>
      <Stack spacing={2}>
        <TextField
          fullWidth
          label="New Category Name"
          variant="outlined"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
        />
        <Button
          fullWidth
          onClick={handleCreate}
          color="primary"
          variant="contained"
        >
          Create Category
        </Button>
      </Stack>
      <List sx={{ marginTop: '1rem' }}>
        {categories.map((category: Category) => (
          <ListItem key={category.id} divider>
            {editCategoryId === category.id ? (
              <Box sx={{ display: 'flex', flexGrow: 1, gap: '10px', alignItems: 'center' }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                />
                <IconButton color="primary" onClick={() => handleUpdate(category.id)} sx={{marginRight:3}}>
                  <CheckIcon />
                </IconButton>
              </Box>
            ) : (
              <ListItemText primary={category.name} />
            )}
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="edit" onClick={() => {
                setEditCategoryId(category.id);
                setEditedName(category.name);
              }}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(category.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default CategoryManagement;