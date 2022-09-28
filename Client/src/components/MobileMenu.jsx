import React, { useState } from "react";
import Image from "./mui.png";
import {
  Box,
  Tooltip,
  Divider,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import ReadIcon from "@mui/icons-material/Slideshow";
import CreateIcon from "@mui/icons-material/PersonAdd";
import { useTheme, styled } from "@mui/material/styles";



const Menu = [
  {
    name: "Home",
    icon: <HomeIcon color="info" />,
    url: "/",
  },
  {
    name: "All User",
    icon: <ReadIcon color="success" />,
    url: "/all",
  },
  {
    name: "Add User",
    icon: <CreateIcon color="secondary" />,
    url: "/add",
  },
];

const StyledBox = styled(Box)(({theme}) => ({
  display: 'none',
  [theme.breakpoints.down("sm")]: {
    marginInline: '1rem',
    display: 'block'
  }
}))


const DrawerHeader = styled(Box)`
  display: flex;
  align-items: center;
  padding-inline: 10px;
  justify-content: space-between;
`;

const DrawerContent = styled(Box)`
  width: 250px;
`;

const StyledListItem = styled(ListItem)`
  &:hover {
    background: lightskyblue;
    color: yellow;
    font-weight: bold;
  }
`;

const MobileMenu = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const theme = useTheme();

  const toggleDrawer = () => {
    setOpenMenu(!openMenu);
  };

  const DrawerList = () => (
    <List>
      {Menu.map((item, index) => (
        <StyledListItem button key={index} component="a" href={item.url}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.name} />
        </StyledListItem>
      ))}
    </List>
  );

  return (
    <StyledBox>
      <>
        <Tooltip title="Menu">
          <IconButton
            edge="start"
            size="small"
            sx={{
              color: "inherit",
              background: `${theme.palette.secondary.light}`,
            }}
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
        </Tooltip>
      </>

      <Drawer anchor="left" open={openMenu} onClose={toggleDrawer}>
        <DrawerHeader>
          <Avatar src={Image} alt="material ui" width={40} height={40} />
          <IconButton onClick={toggleDrawer}>
            <CloseIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <DrawerContent width="250px" onClick={toggleDrawer}>
          <DrawerList />
        </DrawerContent>
      </Drawer>
    </StyledBox>
  );
};

export default MobileMenu;
