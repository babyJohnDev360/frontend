import React, { useState, useEffect } from 'react';
import {
  TextField, Button, Table, TableHead, TableRow, TableCell, TableBody, Dialog,
  DialogActions, DialogContent, DialogTitle, IconButton, Typography, Box,
  InputAdornment
} from '@mui/material';
import Loader from '../components/common/Loader';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import apiService from '../api/apiService';

function ProfileManagement() {
  const [loading, setLoading] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentProfile, setCurrentProfile] = useState({
    id: null,
    name: '',
    email: '',
    password: '',
    phone: '',
    panNo: '',
    bankDetails: { name: '', accountNo: '', branch: '', ifsc: '' },
    isActive: false
  });

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    setLoading(true);
    try {
      const response = await apiService.listUsers();
      setProfiles(response?.users);
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

  const handleSaveProfile = async () => {
    try {
      if (isEditMode) {
        console.log("innerHeight",currentProfile);
        
        await apiService.updateUser(currentProfile);
      } else {
        await apiService.createUser(currentProfile);
      }
      fetchProfiles();
      setOpen(false);
      setCurrentProfile({
        id: null,
        name: '',
        email: '',
        password: '',
        phone: '',
        panNo: '',
        bankDetails: { name: '', accountNo: '', branch: '', ifsc: '' },
        isActive: false
      });
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const handleEditProfile = (profile) => {
    setCurrentProfile(profile);
    setIsEditMode(true);
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

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
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
              <TableCell>PAN Number</TableCell>
              <TableCell>Bank Account</TableCell>
              <TableCell>Branch</TableCell>
              <TableCell>IFSC</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {profiles?.length>0 && profiles.map(profile => (
              <TableRow key={profile?._id}>
                <TableCell>{profile.name}</TableCell>
                <TableCell>{profile.email}</TableCell>
                <TableCell>{profile.phone || '-'}</TableCell>
                <TableCell>{profile.panNo || profile.panNumber || '-'}</TableCell>
                <TableCell>{profile.bankDetails?.accountNo || '-'}</TableCell>
                <TableCell>{profile.bankDetails?.branch || '-'}</TableCell>
                <TableCell>{profile.bankDetails?.ifsc || '-'}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEditProfile(profile)}><EditIcon /></IconButton>
                  <IconButton color="secondary" onClick={() => handleDeleteProfile(profile._id)}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={() => { setIsEditMode(false); setOpen(true);setCurrentProfile({
        id: null,
        name: '',
        email: '',
        password: '',
        phone: '',
        panNo: '',
        bankDetails: { name: '', accountNo: '', branch: '', ifsc: '' },
        isActive: false
      }); }}>Add Customer</Button>
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{isEditMode ? 'Edit Customer' : 'Add Customer'}</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} p={1}>
            <TextField label="Name" name="name" value={currentProfile.name} onChange={handleInputChange} fullWidth />
            <TextField label="Email" name="email" value={currentProfile.email} onChange={handleInputChange} fullWidth />
            {!isEditMode && (
              <TextField
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={currentProfile.password}
                onChange={handleInputChange}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            )}
            <TextField label="Phone" name="phone" value={currentProfile.phone} onChange={handleInputChange} fullWidth />
            <TextField label="PAN Number" name="panNo" value={currentProfile.panNo || currentProfile.panNumber} onChange={handleInputChange} fullWidth />
            <TextField label="Account Holder Name" name="bankDetails.name" value={currentProfile.bankDetails.name} onChange={handleInputChange} fullWidth />
            <TextField label="Account Number" name="bankDetails.accountNo" value={currentProfile.bankDetails.accountNo} onChange={handleInputChange} fullWidth />
            <TextField label="Branch" name="bankDetails.branch" value={currentProfile.bankDetails.branch} onChange={handleInputChange} fullWidth />
            <TextField label="IFSC" name="bankDetails.ifsc" value={currentProfile.bankDetails.ifsc} onChange={handleInputChange} fullWidth />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">Cancel</Button>
          <Button onClick={handleSaveProfile} color="primary">{isEditMode ? 'Save' : 'Add'}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ProfileManagement;