import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  TextField,
  Tabs,
  Tab,
  Box,
  AppBar,
  Snackbar,
  Alert,
} from '@mui/material';
import { db } from '../firebaseConfig';
import { collection, getDocs, addDoc, doc, updateDoc } from 'firebase/firestore';
import { Helmet } from 'react-helmet';

const DashboardPage = () => {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [value, setValue] = useState(0); // For managing the tabs
  const [newCourse, setNewCourse] = useState('');
  const [courseDuration, setCourseDuration] = useState('');
  const [courseCost, setCourseCost] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false); // For snackbar visibility
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersSnapshot = await getDocs(collection(db, 'users'));
      const studentsList = [];
      const teachersList = [];
      usersSnapshot.forEach((doc) => {
        const userData = doc.data();
        if (userData.role === 'student') {
          studentsList.push(userData);
        } else if (userData.role === 'teacher') {
          teachersList.push(userData);
        }
      });
      setStudents(studentsList);
      setTeachers(teachersList);
    };

    fetchUsers();
  }, []);

  const fetchLeaveRequests = async () => {
    const snapshot = await getDocs(collection(db, 'leaveRequests'));
    const requests = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setLeaveRequests(requests);
  };

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const handleLeaveAction = async (id, status) => {
    const requestRef = doc(db, 'leaveRequests', id);
    const userRef = doc(db, 'users', id);
  
    // Update the leave status
    await updateDoc(requestRef, { status });
    await updateDoc(userRef, { leaveStatus: status });
  
    fetchLeaveRequests(); // Refresh the leave requests after approval or rejection
  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleCourseSubmit = async () => {
    if (
      newCourse.trim() !== '' &&
      courseDuration.trim() !== '' &&
      courseCost.trim() !== '' &&
      courseDescription.trim() !== ''
    ) {
      await addDoc(collection(db, 'courses'), {
        name: newCourse,
        duration: courseDuration,
        cost: courseCost,
        description: courseDescription,
      });

      // Clear form after submission
      setNewCourse('');
      setCourseDuration('');
      setCourseCost('');
      setCourseDescription('');

      // Show the snackbar
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        minHeight: '90vh',
        backgroundImage:
          'linear-gradient(52deg, rgba(211,197,229,1) 19%, rgba(98,112,143,1) 50%, rgba(38,70,79,1) 100%)',
        paddingTop: 4,
      }}
    >
      <Helmet>
        <meta charSet="utf-8" />
        <title>Dashboard - Terminal Solutions</title>
      </Helmet>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', marginBottom: 3 }}>
        Admin Dashboard
      </Typography>

      <AppBar
        position="static"
        sx={{
          width: '100vh',
          borderRadius: '20px',
          backgroundColor: 'transparent',
          boxShadow: 'none',
        }}
      >
        <Tabs
          value={value}
          onChange={handleTabChange}
          centered
          TabIndicatorProps={{ style: { backgroundColor: 'black' } }} // Tab underline color
        >
          <Tab
            label="Manage Courses"
            sx={{ color: 'black', fontWeight: 'bold' }}
          />
          <Tab
            label="Manage Attendance"
            sx={{ color: 'black', fontWeight: 'bold' }}
          />
          <Tab
            label="Manage Results"
            sx={{ color: 'black', fontWeight: 'bold' }}
          />
        </Tabs>
      </AppBar>

      <Box sx={{ paddingTop: 2 }}>
        {value === 0 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Manage Courses
            </Typography>
            <Paper sx={{ padding: 2, backgroundColor: 'transparent', }}>
              <TextField
                label="Course Name"
                variant="outlined"
                fullWidth
                value={newCourse}
                onChange={(e) => setNewCourse(e.target.value)}
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Duration (e.g. 3 months)"
                variant="outlined"
                fullWidth
                value={courseDuration}
                onChange={(e) => setCourseDuration(e.target.value)}
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Cost (e.g. $300)"
                variant="outlined"
                fullWidth
                value={courseCost}
                onChange={(e) => setCourseCost(e.target.value)}
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Course Description"
                variant="outlined"
                fullWidth
                value={courseDescription}
                onChange={(e) => setCourseDescription(e.target.value)}
                sx={{ marginBottom: 2 }}
              />
              <Button
                variant="contained"
                sx={{
                  "&:hover": {
                    backgroundColor: "#303f9f", // Darken on hover
                  },
                  padding: "12px",
                  fontWeight: "bold",
                  minWidth: "60vh",
                }}
                onClick={handleCourseSubmit}
                fullWidth
              >
                Add Course
              </Button>
            </Paper>
          </Box>
        )}

        {value === 1 && (
          <Box sx={{ color: '#111' }}>
            <Typography variant="h6" gutterBottom>
              Students
            </Typography>
            <Paper sx={{ padding: 2, marginBottom: 2 , backgroundColor: 'transparent', boxShadow: 0}}>
              <List>
                {students.map((student, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={student.name} />
                  </ListItem>
                ))}
              </List>
            </Paper>

            <Typography variant="h6" gutterBottom>
              Teachers
            </Typography>
            <Paper sx={{ padding: 2, backgroundColor: 'transparent', boxShadow:0}}>
              <List>
                {teachers.map((teacher, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={teacher.name} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Box>
        )}

        {value === 2 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Manage Results
            </Typography>
            <Paper sx={{ padding: 2 , backgroundColor: 'transparent',}}>
              <Typography variant="body1">
                Results management features will be implemented here.
              </Typography>
            </Paper>
          </Box>
        )}
      </Box>

      <Typography variant="h4" gutterBottom align="center">
        Leave Applications
      </Typography>
      <Paper sx={{ padding: 3 }}>
        <List>
          {leaveRequests.map((request) => (
            <ListItem key={request.id} divider>
              <ListItemText
                primary={`${request.name} - ${request.date}`}
                secondary={`Reason: ${request.reason}`}
              />
              <Box>
                {request.status === 'Approved' || request.status === 'Declined' ? (
                  <Typography variant="body1" color={request.status === 'Approved' ? 'green' : 'red'}>
                    {request.status}
                  </Typography>
                ) : (
                  <>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleLeaveAction(request.id, 'Approved')}
                      sx={{ marginRight: 1 }}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleLeaveAction(request.id, 'Declined')}
                    >
                      Decline
                    </Button>
                  </>
                )}
              </Box>
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Snackbar for success message */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
          Leave status updated successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default DashboardPage;