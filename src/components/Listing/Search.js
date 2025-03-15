import React, { useState } from 'react';
import { TextField } from '@mui/material';

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <TextField
      label="Search"
      value={searchTerm}
      onChange={handleChange}
      fullWidth
      margin="normal"
    />
  );
};

export default Search;