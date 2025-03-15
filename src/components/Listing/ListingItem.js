import React from 'react';
import { ListItem as MUIListItem, ListItemText, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const ListItem = ({ item, onEdit, onDelete }) => {
  return (
    <MUIListItem>
      <ListItemText primary={item.name} />
      <IconButton onClick={() => onEdit(item)}>
        <Edit />
      </IconButton>
      <IconButton onClick={() => onDelete(item)}>
        <Delete />
      </IconButton>
    </MUIListItem>
  );
};

export default ListItem;