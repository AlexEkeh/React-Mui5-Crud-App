import React from "react";
import FooterItems from "./FooterItems";
import {
  Box,
  Typography,
  styled
} from "@mui/material";


const Content = styled(Box)(({ theme }) => ({
  background: "gray",
  display: "flex",
  width: "100%",
  justifyContent: "space-around",
  alignItems: "center",
  position: "fixed",
  bottom: 0,
  [theme.breakpoints.down("sm")]: {
    justifyContent: "space-between",
  },
}));

const FooterText = styled(Typography)(({ theme }) => ({
  color: "#200080",
  [theme.breakpoints.down("sm")]: {
    marginRight: "0.5rem",
  },
  "@media (max-width: 361px)": {
    display: "none",
  },
}));

const Footer = () => {
  return (
    <Content>
      <FooterItems />
      <Box>
        <FooterText variant="h6" component="div">
          &copy; 2022 Alexander Ekeh
        </FooterText>
      </Box>
    </Content>
  );
};

export default Footer;
