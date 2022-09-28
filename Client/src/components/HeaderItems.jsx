import React from "react";
import { Tooltip, Button, Link, styled } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ReadIcon from "@mui/icons-material/Slideshow";
import CreateIcon from "@mui/icons-material/PersonAdd";

const Items = [
  {
    title: "Go To Home Page",
    link: "/",
    variant: "contained",
    color: "primary",
    size: "small",
    icon: <HomeIcon />,
    label: "Home",
  },
  {
    title: "View All Users",
    link: "/all",
    variant: "contained",
    color: "secondary",
    size: "small",
    icon: <ReadIcon />,
    label: "All Users",
  },
  {
    title: "Add New User",
    link: "/add",
    variant: "contained",
    color: "warning",
    size: "small",
    icon: <CreateIcon />,
    label: "Add User",
  },
];

const StyledLink = styled(Link)(({ theme }) => ({
  fontSize: "10px",
  textDecoration: "none",
  color: "inherit",
  marginRight: "20px",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const HeaderItems = () => {
  return (
    <>
      {Items.map((item, index) => {
        return (
          <Tooltip title={item.title} key={index}>
            <StyledLink href={item.link}>
              <Button
                variant={item.variant}
                color={item.color}
                size={item.size}
                startIcon={item.icon}
              >
                {item.label}
              </Button>
            </StyledLink>
          </Tooltip>
        );
      })}
    </>
  );
};

export default HeaderItems;
