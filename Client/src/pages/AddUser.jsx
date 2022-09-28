import React, { useState, forwardRef } from "react";
import { addUser } from "../components/CrudOperations";
import {
  FormGroup,
  FormControl,
  Button,
  Typography,
  styled,
  TextField,
  Stack,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { Snackbar, Alert } from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";


const Container = styled(FormGroup)(({theme}) => ({
  width: '30%',
  margin: '5% auto 0 auto',
  '& > div': {
    marginTop: '20px'
  },
  [theme.breakpoints.down("sm")]: {
    width: '60%'
  }
}))

const SnackbarAlert = forwardRef((props, ref) => {
  return <Alert ref={ref} variant="filled" elevation={5} {...props} />;
});

const StyledBox = styled(Box)`
  background: black;
  color: white;
  text-align: center;
  padding: 0.3em;
`;

const SubmitButton = styled(Button)`
  background: green;
  &:disabled {
    cursor: not-allowed;
    pointer-events: auto;
  }
`;

const userSchema = yup.object({
  first_name: yup
    .string()
    .min(2, "First Name must be a minimum of 2 characters")
    .required("First Name is required!"),
  email: yup.string().email("Email is invalid!").required("Email is required!"),
});


const AddUser = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      first_name: "",
      email: "",
      gender: "Male",
    },
    onSubmit: async (values, props) => {
      await addUser(values);
      setTimeout(() => {
        navigate("/all");
      }, 3000);
      props.resetForm();
    },
    validationSchema: userSchema
  });

  const StyledFormLabel = styled(FormLabel)`
    & span {
      color: ${(props) =>
        formik.values.gender === "Male"
          ? props.theme.palette.secondary.main
          : props.theme.palette.primary.main};
    }
  `;


  // Snack Bar Notification Functions Starts
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickway") {
      return;
    }
    setOpen(false);
  };
  // Snack Bar Notification Functions Ends


  // Validation for Snackbar Notitfication
  const verified = !formik.errors.first_name && !formik.errors.email;


  return (
    <Container>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={3}>
          <StyledBox>
            <Typography variant="h5">Add User</Typography>
          </StyledBox>

          <TextField
            id="first_name"
            label="First Name"
            variant="standard"
            name="first_name"
            value={formik.values.first_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.first_name && Boolean(formik.errors.first_name)
            }
            helperText={formik.touched.first_name && formik.errors.first_name}
          />

          <TextField
            id="email"
            label="Email"
            variant="standard"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          <FormControl>
            <StyledFormLabel id="gender">
              <span>Gender</span>
            </StyledFormLabel>
            <RadioGroup
              aria-labelledby="gender"
              row
              name="gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
            >
              <FormControlLabel
                control={<Radio color="secondary" />}
                value="Male"
                label="Male"
              />
              <FormControlLabel
                control={<Radio color="primary" />}
                value="Female"
                label="Female"
              />
            </RadioGroup>
          </FormControl>

          <SubmitButton
            variant="contained"
            startIcon={<PersonAddAlt1Icon />}
            onClick={handleOpen}
            type="submit"
            name="submit"
            disabled={!formik.isValid || formik.isSubmitting}
          >
            Add User
          </SubmitButton>
        </Stack>
      </form>

      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        {verified ? (
          <SnackbarAlert onClose={handleClose} severity="success">
            User added successfully!
          </SnackbarAlert>
        ) : (
          <SnackbarAlert onClose={handleClose} severity="error">
            Error occured! User not added!
          </SnackbarAlert>
        )}
      </Snackbar>

    </Container>
  );
};

export default AddUser;
