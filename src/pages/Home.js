import React from 'react';
import { Grid, Typography, Button, Card, CardContent, CardHeader, Table } from '@mui/material';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4">Admin Dashboard</Typography>
      </Grid>
      
      <Grid container spacing={2}>
        <Grid item xs={6} md={3}>
          <Card>
            <CardHeader title="Total Customers" />
            <CardContent>
              <Typography variant="h5">250</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} md={3}>
          <Card>
            <CardHeader title="Total Transactions" />
            <CardContent>
              <Typography variant="h5">$1.2M</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} md={3}>
          <Card>
            <CardHeader title="Pending Withdrawals" />
            <CardContent>
              <Typography variant="h5">$50K</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6">Live Stock Ticker</Typography>
      </Grid>
      <Grid item xs={12}>
        <Table> {/* Stock Ticker Table */} </Table>
      </Grid>

      <Grid item xs={12} container spacing={2}>
        <Grid item xs={3}>
          <Button variant="contained" fullWidth component={Link} to="/profile-management">
            Profile
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button variant="contained" fullWidth component={Link} to="/trading-summary">
            Trading Summary
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button variant="contained" fullWidth component={Link} to="/transactions">
            Transactions
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button variant="contained" fullWidth component={Link} to="/withdrawal-status">
            Withdrawal Status
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Home;