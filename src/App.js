import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import NoticesPage from "./pages/NoticesPage";
import ProfilePage from "./pages/ProfilePage";
import Header from "./pages/Header";
import { auth, db } from "./firebaseConfig";
import { getDoc, doc } from "firebase/firestore";
import NotFound from "./pages/NotFound";
import Courses from "./pages/Courses";
import Footer from "./pages/Footer";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import NoticePage from "./pages/NoticePage";
import "aos/dist/aos.css";
import AOS from "aos";
import About from "./pages/About";

function App() {
  const theme = createTheme();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      easing: "ease-in-out", // Animation easing
      once: true, // Whether animation should happen only once
    });
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setRole(userDoc.data().role);
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
      <Header role={role} />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/job-portal" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/*" element={<NotFound />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/notices" element={<NoticesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/notices" element={<NoticePage />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/dashboard"
          element={
            role === "admin" ? <DashboardPage /> : <Navigate to="/" replace />
          }
        />
      </Routes>
      <Footer/>
    </Router>
    </ThemeProvider>
  );
}

export default App;
