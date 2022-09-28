import React from "react";
import {
  Container,
  Paper,
  Typography,
  styled,
  IconButton,
  Stack,
  ButtonGroup,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Box,
} from "@mui/material";
import CreateIcon from "@mui/icons-material/PersonAdd";
import ReadIcon from "@mui/icons-material/Slideshow";
import UpdateIcon from "@mui/icons-material/ChangeCircle";
import DeleteIcon from "@mui/icons-material/DeleteForever";

const StyledContainer = styled(Container)`
  height: 40vh;
  transform: translateY(15%);
`;

const StyledButtonGroup = styled(ButtonGroup)(({ theme }) => ({
  "& svg": {
    cursor: "pointer",
  },
  "& button": {
    pointerEvents: "none",
  },
  [theme.breakpoints.down("sm")]: {
    margin: "0 auto",
  },
}));

const StyledTypography = styled(Typography)`
  font-style: italic;
  font-weight: bold;
  flex: 1;
  text-align: center;
  color: ${({ theme }) => theme.palette.success.main};
`;

const RowStack = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

const StyledList = styled(List)`
  & li:nth-child(2) > div > span > span {
    font-weight: bold;
    color: ${(props) => props.theme.palette.secondary.main};
  }
  & li:nth-child(3) > div > span > span {
    font-weight: bold;
    color: ${(props) => props.theme.palette.warning.main};
  }
`;

const StyledListSubheader = styled(ListSubheader)`
  font-weight: bold;
  font-size: 1rem;
  color: ${(props) => props.theme.palette.info.main};
`;



const Home = () => {
  return (
    <Box>
      <StyledContainer>
        <Paper>
          <Stack padding={3} spacing={2}>
            <RowStack direction="row">
              <StyledButtonGroup>
                <IconButton
                  variant="outlined"
                  aria-label="create"
                  color="success"
                >
                  <CreateIcon />
                </IconButton>
                <IconButton variant="outlined" aria-label="read" color="info">
                  <ReadIcon />
                </IconButton>
                <IconButton
                  variant="outlined"
                  aria-label="update"
                  color="warning"
                >
                  <UpdateIcon />
                </IconButton>
                <IconButton
                  variant="outlined"
                  aria-label="delete"
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </StyledButtonGroup>

              <StyledTypography variant="h5">
                Basic CRUD Application With React And Material UI
              </StyledTypography>
            </RowStack>

            <Typography align="center">
              A CRUD application is an application where we can perform basic
              Create, Read, Update and Delete operations on a database.
              <br />
              In this application, the <strong>ALL USERS</strong> button
              performs a READ Operation; the <strong>ADD USER</strong> button
              performs a CREATE operation. While on the list of all users page,
              we have an <strong>EDIT</strong> button that performs an UPDATE
              operation and a <strong>DELETE</strong> button that performs a
              DELETE operation.
            </Typography>

            <Stack>
              <StyledList
                subheader={
                  <StyledListSubheader component="div">
                    DESCRIPTION:
                  </StyledListSubheader>
                }
              >
                <ListItem>
                  <ListItemText>
                    Click on the <span>All Users</span> button to view the list
                    of all users in the list. If no user was added, nothing is
                    displayed on the list.
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>
                    Click on the <span>Add User</span> button to add a new user
                    to the list with user details such as{" "}
                    <strong>First Name, </strong> <strong>Email</strong> and{" "}
                    <strong>Gender</strong>.
                  </ListItemText>
                </ListItem>
              </StyledList>
            </Stack>
          </Stack>
        </Paper>
      </StyledContainer>
    </Box>
  );
};

export default Home;
