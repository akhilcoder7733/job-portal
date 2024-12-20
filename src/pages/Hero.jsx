import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { styled } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import Img1 from "../Images/img1.png";

function Hero() {
  const navigate = useNavigate();

  const CustomButton = styled(Button)(({ theme }) => ({
    "--color": "#2f68ba",
    "--color2": "rgb(10, 25, 30)",
    padding: "0.4em 1.75em",
    backgroundColor: "transparent",
    borderRadius: "6px",
    border: ".3px solid var(--color)",
    transition: ".5s",
    position: "relative",
    overflow: "hidden",
    cursor: "pointer",
    zIndex: 1,
    fontWeight: 600,
    fontSize: "17px",
    fontFamily: "Roboto, Segoe UI, sans-serif",
    textTransform: "uppercase",
    color: "var(--color)",
    marginLeft: "15px",
    marginTop: "10px",
    "&:hover": {
      color: "var(--color2)",
      "&::before": {
        transform: "skew(40deg) rotate(180deg) translate(-50%, -50%)",
      },
      "&::after": {
        transform: "skew(40deg) translate(-50%, -50%)",
      },
    },
    "&:active": {
      filter: "brightness(.7)",
      transform: "scale(.98)",
    },
    "&::after, &::before": {
      content: '""',
      display: "block",
      height: "100%",
      width: "100%",
      transform: "skew(90deg) translate(-50%, -50%)",
      position: "absolute",
      inset: "50%",
      left: "25%",
      zIndex: -1,
      transition: ".5s ease-out",
      backgroundColor: "var(--color)",
    },
    "&::before": {
      top: "-50%",
      left: "-25%",
      transform: "skew(90deg) rotate(180deg) translate(-50%, -50%)",
    },
  }));

  const StyledBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: "90vh",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  }));
  return (
    <StyledBox
      sx={
        {
          // backgroundImage:
          //   "linear-gradient(52deg, rgba(211,197,229,1) 19%, rgba(0,98,152,1) 50%, rgba(0,120,152,1) 80%)",
          // padding: 4,
        }
      }
    >
      <Box
        sx={{
          // display: "flex",
          // flexDirection: "column",
          // justifyContent: "center",
          // alignItems: "center",
          // backgroundImage:
          //   "linear-gradient(52deg, rgba(211,197,229,1) 19%, rgba(0,98,152,1) 50%, rgba(0,120,152,1) 80%)",
          paddingLeft: 10,
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            color: "#fff", //#00078b  #36b175
            letterSpacing: "1.5px",
            fontFamily: "Pacifico, serif",
            fontSize: "70px",
          }}
          data-aos="fade-up-right"
          data-aos-delay="100"
        >
          Terminal Options
        </Typography>
        <Typography
          variant="h5"
          sx={{
            fontFamily: "Kanit, sans-serif",
            paddingLeft: 2,
            pt: 1,
          }}
        >
          Best options to grow your career.
        </Typography>
        <CustomButton onClick={() => navigate("/courses")} data-aos="fade-up"data-aos-delay="500">
          Explore Courses
        </CustomButton>
        <Typography
          variant="subtitle2"
          sx={{
            fontFamily: "Kanit, sans-serif",
            paddingLeft: 2,
            pt: 1,
          }}
        >
          Owned By{" "}
          <span>
            <Typography
              component={Link}
              to={"/about"}
              sx={{
                fontSize: "20px",
                textDecoration: "none",
                fontFamily: "Kanit, sans-serif",
                color: "#111 ",
                "&:hover": { color: "#0096cf" },
              }}
            >
              Akhil John
            </Typography>
          </span>
        </Typography>
      </Box>

      <Box
        sx={
          {
            // display: "flex",
            // flexDirection: "column",
            // justifyContent: "center",
            // alignItems: "center",
            // height: "90vh",
            // backgroundImage:
            //   "linear-gradient(52deg, rgba(211,197,229,1) 19%, rgba(0,98,152,1) 50%, rgba(0,120,152,1) 80%)",
            // padding: 4,
          }
        }
      >
        <img
          src={Img1}
          alt="pic-1"
          style={{
            width: "40rem",
          }}
          data-aos="fade-up" 
          data-aos-delay="200"
        />
      </Box>
    </StyledBox>
  );
}

export default Hero;
