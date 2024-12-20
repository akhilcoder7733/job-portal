import React from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import GppGoodIcon from "@mui/icons-material/GppGood";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";

function NoticePage() {
  const StyledCard = styled(Card)(({ theme }) => ({
    display: "block",
    position: "relative",
    minWidth: "242px",
    backgroundColor: "transparent",
    borderRadius: "5px",
    // padding: '32px 24px',
    // margin: '12px',
    textDecoration: "none",
    zIndex: 0,
    overflow: "hidden",
    "&:before": {
      content: '""',
      position: "absolute",
      zIndex: -1,
      top: "-16px",
      right: "-16px",
      background: "#36b175",
      height: "32px",
      width: "32px",
      borderRadius: "32px",
      transform: "scale(1)",
      transformOrigin: "50% 50%",
      transition: "transform 0.25s ease-out",
    },

    "&:hover:before": {
      transform: "scale(21)",
    },
    "& .go-corner": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      width: "32px",
      height: "32px",
      overflow: "hidden",
      top: 0,
      right: 0,
      backgroundColor: "#00838d",
      borderRadius: "0 4px 0 32px",
    },
  }));

  const StyledTypography = styled(Typography)(({ theme }) => ({
    fontFamily: "Kanit, sans-serif",
  }));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "70vh",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          marginBottom: 4,
        }}
      >
        <Typography variant="h3" sx={{ fontFamily: "Kanit, sans-serif" }}>
          Why Terminal Options?
        </Typography>
        <Typography variant="h6" sx={{ fontFamily: "Kanit, sans-serif" }}>
          Trust | Good Teaching | Best Atmosphere
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <StyledCard data-aos="fade-in"data-aos-delay="100">
          <CardActionArea>
            <CardContent
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <ThumbUpOffAltIcon sx={{ fontSize: "100px" }} />
              <StyledTypography gutterBottom variant="h5" component="div">
                Placements
              </StyledTypography>
              <StyledTypography
                variant="body2"
                sx={{ color: "text.secondary" }}
              >
                100% Placements assured
              </StyledTypography>
            </CardContent>
          </CardActionArea>
        </StyledCard>
        <StyledCard data-aos="fade-in"data-aos-delay="200">
          <CardActionArea>
            <CardContent
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <GppGoodIcon sx={{ fontSize: "100px" }} />
              <StyledTypography gutterBottom variant="h5" component="div">
                Trust
              </StyledTypography>
              <StyledTypography
                variant="body2"
                sx={{ color: "text.secondary" }}
              >
                100% Quality Teaching
              </StyledTypography>
            </CardContent>
          </CardActionArea>
        </StyledCard>
        <StyledCard data-aos="fade-in"data-aos-delay="300">
          <CardActionArea>
            <CardContent
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <AddHomeWorkIcon sx={{ fontSize: "100px" }} />
              <StyledTypography gutterBottom variant="h5" component="div">
                Atmosphere
              </StyledTypography>
              <StyledTypography
                variant="body2"
                sx={{ color: "text.secondary" }}
              >
                Better atmosphere
              </StyledTypography>
            </CardContent>
          </CardActionArea>
        </StyledCard>
      </Box>
    </Box>
  );
}

export default NoticePage;
