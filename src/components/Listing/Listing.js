import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import CreateItem from './CreateItem';
import Search from "./Search.js"
import ConfirmationDialog from "../common/ConfirmationDialog"
const dummyData = [
  { id: 1, name: 'Item 1', description: 'Description 1' },
  { id: 2, name: 'Item 2', description: 'Description 2' },
  { id: 3, name: 'Item 3', description: 'Description 3' },
];

const Listing = () => {
  const [items, setItems] = useState(dummyData);
  const [searchTerm, setSearchTerm] = useState('');
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    // This is where you would fetch data from the API
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleCreate = (newItem) => {
    setItems([...items, newItem]);
  };

  const handleEdit = (editedItem) => {
    setItems(
      items.map((item) => (item.id === editedItem.id ? editedItem : item))
    );
  };

  const handleDelete = (itemId) => {
    setItems(items.filter((item) => item.id !== itemId));
    setItemToDelete(null);
  };

  const confirmDelete = (item) => {
    setItemToDelete(item);
    setConfirmationOpen(true);
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Item Listing
      </Typography>
      <Search onSearch={handleSearch} />
      <CreateItem onCreate={handleCreate} />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(item)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => confirmDelete(item)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ConfirmationDialog
        open={confirmationOpen}
        onClose={() => setConfirmationOpen(false)}
        onConfirm={() => handleDelete(itemToDelete.id)}
        title="Confirm Deletion"
        content={`Are you sure you want to delete ${itemToDelete?.name}?`}
      />
    </Container>
  );
};

export default Listing;