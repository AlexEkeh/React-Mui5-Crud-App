import React, { useState, useEffect, forwardRef } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TablePagination,
  styled,
  Button,
  Container,
  Tooltip,
  Snackbar,
  Alert,
} from "@mui/material";
import { getUsers, deleteUser } from "../components/CrudOperations";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const StyledTable = styled(Table)`
  margin: 3% auto 0,
`

const StyledButton = styled(Button)`
  &:hover {
    transform: translateY(-0.2rem);
  }
`;

const SnackbarAlert = forwardRef((props, ref) => {
  return <Alert ref={ref} variant="filled" elevation={5} {...props} />;
});

const Thead = styled(TableRow)`
  background: black;
  & > th {
    color: white;
    font-size: 20px;
    text-align: center;
  }
`;

const Tbody = styled(TableRow)`
  & > td {
    text-align: center;
    font-size: 20px;
  }
`;

const StyledContainer = styled(Container)`
  margin-top: 1%;
`


const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  const handleClick = () => {
    setOpen(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickway") {
      return;
    }
    setOpen(false);
  };

  const getInfos = async () => {
    const response = await getUsers();
    setUsers(response.data);
  };

  useEffect(() => {
    getInfos();
  }, []);

  const deleteUserInfo = async (id) => {
    await deleteUser(id);
    getInfos();
  };

  return (
    <TableContainer component={Paper}>
      <StyledContainer maxWidth="xl">
        <StyledTable>
          <TableHead>
            <Thead>
              <TableCell>Id</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </Thead>
          </TableHead>
          <TableBody>
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => {
                return (
                  <Tbody key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.first_name}</TableCell>
                    <TableCell>{user.gender}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Tooltip title="Edit User Info">
                        <StyledButton
                          variant="contained"
                          color="primary"
                          startIcon={<EditIcon />}
                          component={Link}
                          to={`/edit/${user.id}`}
                          sx={{ marginRight: "10px" }}
                        >
                          Edit
                        </StyledButton>
                      </Tooltip>
                      <Tooltip title="Delete User">
                        <StyledButton
                          variant="contained"
                          startIcon={<DeleteIcon />}
                          color="secondary"
                          onClick={() =>
                            deleteUserInfo(user.id) &&
                            setTimeout(() => handleClick(), 1000)
                          }
                        >
                          Delete
                        </StyledButton>
                      </Tooltip>
                    </TableCell>
                  </Tbody>
                );
              })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </StyledTable>
      </StyledContainer>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <SnackbarAlert onClose={handleClose} severity="success">
          User deleted successfully!
        </SnackbarAlert>
      </Snackbar>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20, 30, 40, 50]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        showFirstButton={true}
        showLastButton={true}
      />
    </TableContainer>
  );
};

export default AllUsers;
