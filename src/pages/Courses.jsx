import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { styled } from "@mui/system";
import { Helmet } from "react-helmet";
import LocalImg from "../Images/hi (2).jpg";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const CustomButton = styled(Button)(({ theme }) => ({
    backgroundColor: "#0F1B4C",
    color: "#ffffff",
    fontWeight: "700",
    fontSize: "14px",
    cursor: "pointer",
    padding: "0.7rem 2rem",
    borderRadius: "7px",
    textTransform: "none",
    display: "block",
    marginTop: "10px",
    marginLeft: 0,
    border: "2px solid transparent",
    transition: "background-color 0.3s, color 0.3s, borderColor 0.3s",
    // width:"24rem",
    "&:hover": {
      backgroundColor: "white",
      color: "black",
      borderColor: "#0F1B4C",
      animation: `${theme.transitions.create(
        ["background-color", "color", "border-color"],
        {
          duration: theme.transitions.duration.short,
        }
      )} custom-hover-animation`,
    },
  }));

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      const coursesSnapshot = await getDocs(collection(db, "courses"));
      const coursesList = [];
      coursesSnapshot.forEach((doc) => {
        const courseData = doc.data();
        coursesList.push({ id: doc.id, ...courseData });
      });
      setCourses(coursesList);
      setLoading(false);
    };

    fetchCourses();
  }, []);

  const handleDialogOpen = (course) => {
    setSelectedCourse(course);
  };

  const handleDialogClose = () => {
    setSelectedCourse(null);
  };

  const CourseBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(1),
    alignItems: "center",
    minWidth: "50%",
    justifyContent: "center",
  }));

  const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    backgroundColor: "#00b448",
    boxShadow: theme.shadows[3],
    marginBottom: theme.spacing(2),
    transition: "all 0.3s ease-in-out", // Smooth transition for hover effects
    "&:hover": {
      backgroundColor: "#73f1a5",
      transform: "translateY(-5px)", // Move slightly up
      boxShadow: theme.shadows[6], // Optional: Add a more pronounced shadow
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    [theme.breakpoints.up("sm")]: {
      width: "70%",
    },
  }));

  const ImageBox = styled(Box)(({ theme }) => ({
    display: "flex",
    // flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
      minHeight: "50vh",
      marginTop: "10vh",
    },
  }));

  const StyledContainer = styled(Container)(({ theme }) => ({
    minHeight: "90vh",
    display: "flex",
    flexDirection: "row", // Default to row
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(to bottom, #dae2f8, #d6a4a4)",
    padding: theme.spacing(4),
    minWidth: "100%",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      width: "100%",
    },
    [theme.breakpoints.up("sm")]: {
      width: "70%",
      flexDirection: "column",
    },
  }));

  return (
    <StyledContainer>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Courses - Terminal Solutions</title>
      </Helmet>

      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="50vh"
        >
          <CircularProgress size={60} />
        </Box>
      ) : (
        <CourseBox>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              textAlign: "center",
              marginBottom: 2,
              fontFamily: "Kanit, sans-serif",
            }}
          >
            Available Courses
          </Typography>
          <List
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {courses.map((course, index) => (
              <StyledPaper
                key={course.id}
                data-aos="fade-up"
                data-aos-delay={`${index * 100}`}
              >
                <ListItem
                  sx={{
                    "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
                    transition: "background-color 0.3s ease",
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", color: "#0d47a1" }}
                      >
                        {course.name}
                      </Typography>
                    }
                  />
                  <CustomButton onClick={() => handleDialogOpen(course)}>
                    View Details
                  </CustomButton>
                </ListItem>
              </StyledPaper>
            ))}
          </List>
        </CourseBox>
      )}

      {/* Dialog Box */}
      {selectedCourse && (
        <Dialog
          open={!!selectedCourse}
          onClose={handleDialogClose}
          maxWidth="sm"
          fullWidth
        >
          <Box
            sx={{
              backgroundImage:
                "linear-gradient(0deg, rgba(197,229,197,1) 53%, rgba(0,195,77,1) 97%)",
            }}
          >
            <DialogTitle>{selectedCourse.name}</DialogTitle>
            <DialogContent>
              <Typography variant="body1" sx={{ marginBottom: 2 }}>
                <strong>Duration:</strong> {selectedCourse.duration}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 2 }}>
                <strong>Cost:</strong> {selectedCourse.cost}
              </Typography>
              <Typography variant="body1">
                <strong>Description:</strong> {selectedCourse.description}
              </Typography>
            </DialogContent>
            <DialogActions>
              <CustomButton
                onClick={handleDialogClose}
                // variant="contained"
                // color="secondary"
              >
                Close
              </CustomButton>
            </DialogActions>
          </Box>
        </Dialog>
      )}
      <ImageBox data-aos="fade-in" data-aos-delay="100">
        <img
          src={LocalImg}
          alt="Signup Illustration"
          style={{ width: "60%", height: "auto", borderRadius: "20px" }} // Adjust styles as needed
        />
      </ImageBox>
    </StyledContainer>
  );
}

export default Courses;
