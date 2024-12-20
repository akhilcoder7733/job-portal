import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Paper, TextField, Button, Box, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert } from '@mui/material';
import { auth, db } from '../firebaseConfig';
import { getDoc, doc, updateDoc, setDoc, Timestamp } from 'firebase/firestore';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Helmet } from 'react-helmet';

// Dark theme for the entire page
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
  },
});

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [editableData, setEditableData] = useState({ name: '', address: '', pincode: '', qualification: '' });
  const [loading, setLoading] = useState(true);
  const [leaveDialogOpen, setLeaveDialogOpen] = useState(false);
  const [leaveData, setLeaveData] = useState({ date: '', reason: '' });
  const [leaveStatus, setLeaveStatus] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserData(data);
          setEditableData({
            name: data.name || '',
            address: data.address || '',
            pincode: data.pincode || '',
            qualification: data.qualification || '',
          });
          setLeaveStatus(data.leaveStatus || ''); // Set the leave status
        }
      }
      setLoading(false); // Stop loading once data is fetched
    };

    fetchUserData();
  }, []);

  const handleLeaveSubmit = async () => {
    const user = auth.currentUser;
    if (leaveData.date && leaveData.reason) {
      await setDoc(doc(db, 'leaveRequests', user.uid), {
        name: userData.name,
        email: userData.email,
        date: leaveData.date,
        reason: leaveData.reason,
        status: 'Pending',
        appliedAt: Timestamp.now(),
      });

      await updateDoc(doc(db, 'users', user.uid), {
        leaveStatus: 'Pending Approval',
      });

      setLeaveStatus('Pending Approval');
      setAlertOpen(true);
      setLeaveDialogOpen(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    const user = auth.currentUser;
    await updateDoc(doc(db, 'users', user.uid), editableData);
    setUserData((prevData) => ({
      ...prevData,
      ...editableData,
    }));
  };

  // Show Spinner while loading
  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundImage: 'linear-gradient(9deg, rgba(229,206,197,1) 15%, rgba(48,198,255,1) 100%)',
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Profile - Terminal Solutions</title>
      </Helmet>
      <Container maxWidth="xl" sx={{ paddingTop: 4, backgroundImage: 'linear-gradient(9deg, rgba(229,206,197,1) 15%, rgba(48,198,255,1) 100%)' }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontFamily: 'Kanit, sans-serif' }}>
          Student Profile
        </Typography>
        <Typography variant="h3" align="center" sx={{ fontWeight: 'bold', marginBottom: 3, fontFamily: 'Kanit, sans-serif' }}>
          {userData.name}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ padding: 3, backgroundColor: '#2a9fcc' }}>
              <Typography variant="h6" sx={{ fontFamily: 'Kanit, sans-serif' }}>
                <span style={{ fontSize: '15px' }}>Email:</span> {userData.email}
              </Typography>
              <Typography variant="h6" sx={{ fontFamily: 'Kanit, sans-serif' }}>
                <span style={{ fontSize: '15px' }}>Role:</span> {userData.role}
              </Typography>
              <Typography>Leave Status: {leaveStatus}</Typography>
              {leaveStatus !== 'Approved' && (
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setLeaveDialogOpen(true)}
                    disabled={leaveStatus === 'Pending Approval'}
                  >
                    Apply for Leave
                  </Button>
                </Grid>
              )}
            </Paper>
          </Grid>

          {/* Leave Dialog */}
          <Dialog open={leaveDialogOpen} onClose={() => setLeaveDialogOpen(false)}>
            <DialogTitle>Apply for Leave</DialogTitle>
            <DialogContent>
              <TextField
                type="date"
                fullWidth
                margin="dense"
                label="Leave Date"
                InputLabelProps={{ shrink: true }}
                onChange={(e) => setLeaveData((prev) => ({ ...prev, date: e.target.value }))}
              />
              <TextField
                label="Reason"
                multiline
                fullWidth
                margin="dense"
                onChange={(e) => setLeaveData((prev) => ({ ...prev, reason: e.target.value }))}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setLeaveDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleLeaveSubmit} variant="contained">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          {/* Alert */}
          <Snackbar open={alertOpen} autoHideDuration={4000}>
            <Alert severity="success">Leave application submitted. Please wait for admin approval.</Alert>
          </Snackbar>

          <Grid item xs={12} md={6}>
            <Paper sx={{ padding: 3 }}>
              <Typography variant="h6" gutterBottom>
                Personal Details
              </Typography>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                value={editableData.name}
                onChange={handleInputChange}
                name="name"
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Address"
                variant="outlined"
                fullWidth
                value={editableData.address}
                onChange={handleInputChange}
                name="address"
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Pincode"
                variant="outlined"
                fullWidth
                value={editableData.pincode}
                onChange={handleInputChange}
                name="pincode"
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Qualification"
                variant="outlined"
                fullWidth
                value={editableData.qualification}
                onChange={handleInputChange}
                name="qualification"
                sx={{ marginBottom: 2 }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSaveChanges}
                  sx={{ marginTop: 2 }}
                >
                  Save Changes
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default ProfilePage;
