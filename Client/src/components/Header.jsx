import React from "react";
import {
  AppBar,
  Toolbar,
  styled,
  Button,
  Tooltip,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import MobileMenu from "./MobileMenu";
import HeaderItems from "./HeaderItems";

const AppBarHeader = styled(AppBar)`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background: green;
  position: sticky;
  top: 0;
`;

const StyledLink = styled(Link)(({ theme }) => ({
  fontSize: "10px",
  textDecoration: "none",
  color: "inherit",
  marginRight: "20px",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  width: "100%",
  "& a:nth-child(4)": {
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
  "& a:nth-child(1)": {
    color: "orange",
    fontWeight: "bold",
    "&:hover": {
      transform: "translateY(-0.2rem)",
    },
  },
  "& a:nth-child(2)": {
    "&:hover": {
      transform: "translateY(-0.2rem)",
    },
  },
  "& a:nth-child(3)": {
    "&:hover": {
      transform: "translateY(-0.2rem)",
    },
  },
}));

const Header = () => {
  const theme = useTheme();

  return (
    <AppBarHeader>
      <MobileMenu />
      <StyledToolbar>
        <HeaderItems />
        <Tooltip title="Go to Home">
          <StyledLink to="/">
            <Button
              variant="contained"
              color="info"
              sx={{
                background: `${theme.palette.secondary.light}`,
              }}
            >
              <Typography sx={{ textDecoration: "none", color: "inherit" }}>
                CRUD APP: REACT - MATERIAL UI
              </Typography>
            </Button>
          </StyledLink>
        </Tooltip>
      </StyledToolbar>
    </AppBarHeader>
  );
};

export default Header;
