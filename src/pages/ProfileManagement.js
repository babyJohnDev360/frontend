import React, { useState, useEffect } from 'react';
import { TextField, Button, Table, TableHead, TableRow, TableCell, TableBody, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import Loader from '../components/common/Loader';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import apiService from '../api/apiService';

function ProfileManagement() {
  const [loading, setLoading] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentProfile, setCurrentProfile] = useState({ id: null, name: '', email: '', phone: '', bankDetails: { accountNo: '', branch: '', ifsc: '' }, panNumber: '' });

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    setLoading(true);
    try {
      const response = await apiService.listUsers();
      setProfiles(response.users);
    } catch (error) {
      console.error('Error fetching profiles:', error);
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('bankDetails')) {
      const bankField = name.split('.')[1];
      setCurrentProfile({ ...currentProfile, bankDetails: { ...currentProfile.bankDetails, [bankField]: value } });
    } else {
      setCurrentProfile({ ...currentProfile, [name]: value });
    }
  };

  const handleAddProfile = async () => {
    try {
      if (currentProfile.id) {
        await apiService.updateUser(currentProfile);
      } else {
        await apiService.createUser(currentProfile);
      }
      fetchProfiles();
      setOpen(false);
      setCurrentProfile({ id: null, name: '', email: '', phone: '', bankDetails: { accountNo: '', branch: '', ifsc: '' }, panNumber: '' });
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const handleEditProfile = (profile) => {
    setCurrentProfile(profile);
    setOpen(true);
  };

  const handleDeleteProfile = async (id) => {
    try {
      await apiService.deleteUser(id);
      fetchProfiles();
    } catch (error) {
      console.error('Error deleting profile:', error);
    }
  };

  return (
    <div>
      <Typography variant="h5">Profile Management</Typography>
      {loading ? (
        <Loader />
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Bank Account</TableCell>
              <TableCell>Branch</TableCell>
              <TableCell>IFSC</TableCell>
              <TableCell>PAN Number</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {profiles.map(profile => (
              <TableRow key={profile._id}>
                <TableCell>{profile.name}</TableCell>
                <TableCell>{profile.email}</TableCell>
                <TableCell>{profile.phone}</TableCell>
                <TableCell>{profile.bankDetails ? profile.bankDetails.accountNo : ''}</TableCell>
                <TableCell>{profile.bankDetails ? profile.bankDetails.branch : ''}</TableCell>
                <TableCell>{profile.bankDetails ? profile.bankDetails.ifsc : ''}</TableCell>
                <TableCell>{profile.panNumber}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEditProfile(profile)}><EditIcon /></IconButton>
                  <IconButton color="secondary" onClick={() => handleDeleteProfile(profile._id)}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>Add Customer</Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{currentProfile.id ? 'Edit Customer' : 'Add Customer'}</DialogTitle>
        <DialogContent>
          <TextField label="Name" name="name" value={currentProfile.name} onChange={handleInputChange} fullWidth />
          <TextField label="Email" name="email" value={currentProfile.email} onChange={handleInputChange} fullWidth />
          <TextField label="Phone" name="phone" value={currentProfile.phone} onChange={handleInputChange} fullWidth />
          <TextField label="Account Number" name="bankDetails.accountNo" value={currentProfile.bankDetails.accountNo} onChange={handleInputChange} fullWidth />
          <TextField label="Branch" name="bankDetails.branch" value={currentProfile.bankDetails.branch} onChange={handleInputChange} fullWidth />
          <TextField label="IFSC" name="bankDetails.ifsc" value={currentProfile.bankDetails.ifsc} onChange={handleInputChange} fullWidth />
          <TextField label="PAN Number" name="panNumber" value={currentProfile.panNumber} onChange={handleInputChange} fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">Cancel</Button>
          <Button onClick={handleAddProfile} color="primary">{currentProfile.id ? 'Save' : 'Add'}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ProfileManagement;