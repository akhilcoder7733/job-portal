import React from "react";
import { Typography, List, ListItem, ListItemText, Box } from "@mui/material";
import { styled } from "@mui/material";
import { Helmet } from "react-helmet";

const NoticesPage = () => {
  const notices = [
    "Classes exam scheduled for 25th December.",
    "New session starting from 1st January.",
    "Holiday on 24 - 26th December.",
  ];
  const StyledBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "90vh",
    backgroundImage:
      "linear-gradient(348deg, rgba(229,206,197,1) 15%, rgba(71,190,93,1) 100%)",
    padding: 4,
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  }));
  return (
    <StyledBox>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Notices - Terminal Solutions</title>
      </Helmet>
      <Typography variant="h4">Notices</Typography>
      <List>
        {notices.map((notice, index) => (
          <ListItem key={index}>
            <ListItemText primary={notice} />
          </ListItem>
        ))}
      </List>
    </StyledBox>
  );
};

export default NoticesPage;
