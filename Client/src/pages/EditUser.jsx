import React, { useState, forwardRef } from "react";
import { editUser, getUser } from "../components/CrudOperations";
import {
  FormGroup,
  Button,
  Typography,
  styled,
  TextField,
  Box,
  RadioGroup,
  Stack,
  Snackbar,
  Alert,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
} from "@mui/material";
import EditUserIcon from "@mui/icons-material/ManageAccounts";
import { useParams, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { useEffect } from "react";

const changeSchema = yup.object({
  first_name: yup
    .string()
    .min(2, "First Name must be a minimum of 2 characters")
    .required("First Name is required!"),
  email: yup.string().email("Email is invalid!").required("Email is required!"),
});

const Container = styled(FormGroup)(({theme}) => ({
  width: '30%',
  margin: '5% auto 0 auto',
  '& > div': {
    marginTop: '20px'
  },
  [theme.breakpoints.down("sm")]: {
    width: '60%'
  }
}));

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
    pointer-events: all !important;
  }
`;

const initValue = {
  first_name: "",
  email: "",
  gender: "",
};

const EditUser = () => {

  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(initValue);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await getUser(id);
      setUser(response.data);
    };
    fetchUser();
  }, [id]);

  const formik = useFormik({
    initialValues: {
      first_name: user.first_name || "",
      email: user.email || "",
      gender: user.gender || ""
    },
    onSubmit: async (values) => {
      await editUser(id, values);
      setTimeout(() => {
        navigate("/all");
      }, 3000);
    },
    validationSchema: changeSchema,
    enableReinitialize: true
  });

  const StyledFormLabel = styled(FormLabel)`
    & span {
      color: ${(props) =>
        formik.values.gender === "Male"
          ? props.theme.palette.secondary.main
          : props.theme.palette.primary.main
      };
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
            <Typography variant="h5">Edit User</Typography>
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
                disabled
              />
              <FormControlLabel
                control={<Radio color="primary" />}
                value="Female"
                label="Female"
                disabled
              />
            </RadioGroup>
          </FormControl>

          <SubmitButton
            variant="contained"
            onClick={handleOpen}
            name="submit"
            type="submit"
            disabled={!formik.isValid || formik.isSubmitting}
            startIcon={<EditUserIcon />}
          >
            Edit User
          </SubmitButton>
        </Stack>
      </form>

      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        {verified ? (
          <SnackbarAlert onClose={handleClose} severity="success">
            User profile saved successfully!
          </SnackbarAlert>
        ) : (
          <SnackbarAlert onClose={handleClose} severity="error">
            Error occured! User profile not saved!
          </SnackbarAlert>
        )}
      </Snackbar>
    </Container>
  );
};

export default EditUser;
