import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { css } from "@emotion/react";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { getRequest, postRequest, putRequest } from "../../Services/networkRequests";
import { useFormErrors, useFormInput } from "../../Services/Hooks";
import { FormSelect } from "../../Components/FormSelect";
import { FormField } from "../../Components/FormField";

// // A custom hook to handle form input changes
// const useFormInput = (initialValue) => {
//   const [value, setValue] = useState(initialValue);
//   const handleChange = (e) => {
//     setValue(e.target.value);
//   };
//   return { value, onChange: handleChange };
// };

// // A custom hook to handle form validation errors
// const useFormErrors = () => {
//   const [errors, setErrors] = useState({});
//   const validate = (values) => {
//     let errors = {};
//     // Check if the values are valid and set the errors accordingly
//     if (!values.model) {
//       errors.model = "Model is required";
//     }
//     if (!values.make) {
//       errors.make = "Make is required";
//     }
//     if (!values.color) {
//       errors.color = "Color is required";
//     }
//     if (!values.registrationNo) {
//       errors.registrationNo = "Registration number is required";
//     }
//     if (!values.category) {
//       errors.category = "Category is required";
//     }
//     // Set the errors state
//     setErrors(errors);
//     // Return true if there are no errors, false otherwise
//     return Object.keys(errors).length === 0;
//   };
//   return { errors, validate };
// };

// // A custom component to display a form field with error message
// const FormField = ({ label, type, inputProps, error }) => {
//   return (
//     <Grid item xs={12}>
//       <TextField
//         label={label}
//         type={type}
//         variant="outlined"
//         fullWidth
//         {...inputProps}
//         error={!!error}
//         helperText={error}
//       />
//     </Grid>
//   );
// };

// // A custom component to display a select field with error message

// const FormSelect = ({ label, inputProps, error, options }) => {
//   console.log('label', label)
//   console.log('inputProps', inputProps)
//   console.log('error', error)
//   console.log('options', options)
//   return (
//     <Grid item xs={12}>
//       <InputLabel id={`${label}-label`}>{label}</InputLabel>
//       <Select
//         labelId={`${label}-label`}
//         variant="outlined"
//         fullWidth
//         {...inputProps}
//         error={!!error}
//         // helperText={error}
//       >
//         {options &&
//           options.map((option) => (
//             <MenuItem key={option.id} value={option.id}>
//               {option.name}
//             </MenuItem>
//           ))}
//       </Select>
//     </Grid>
//   );
// };
// A custom css style for the paper container
const paperStyle = css`
  padding: 2rem;
`;

// The main component to render the add or update car form
const AddCar = () => {
  const navigate = useNavigate()
  // Use the custom hooks to handle the form inputs and errors
  const model = useFormInput("");
  const make = useFormInput("");
  const color = useFormInput("");
  const registrationNo = useFormInput("");
  const categoryId = useFormInput("");
  const { errors, validate } = useFormErrors();

  // Use the useParams hook to get the car id from the route params
  const { id } = useParams();

  // Use a state variable to store the categories data from the API
  const [categories, setCategories] = useState([]);

  // Use a state variable to indicate if the form is loading or not
  const [loading, setLoading] = useState(false);

  // Use an effect hook to fetch the categories data when the component mounts
  useEffect(() => {
    setLoading(true);
    getRequest('categories')
      .then((response) => {
        setCategories(response);
        setLoading(false);
      })
      .catch((error) => {
        alert(error.message);
        setLoading(false);
      });
  }, []);

  // Use an effect hook to fetch the car data by id when the component mounts and id is defined
  useEffect(() => {
    if (id) {
      setLoading(true);
      getRequest(`car/${id}`)
        .then((response) => {
          // Set the form inputs with the car data
          model.onChange({ target: { value: response.model } });
          make.onChange({ target: { value: response.make } });
          color.onChange({ target: { value: response.color } });
          registrationNo.onChange({
            target: { value: response.registrationNo },
          });
          categoryId.onChange({ target: { value: response.CategoryId } });
          setLoading(false);
        })
        .catch((error) => {
          alert(error.message);
          setLoading(false);
        });
    }
  }, [id]);

  // A function to handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Get the form values from the input hooks
    const values = {
      model: model.value,
      make: make.value,
      color: color.value,
      registrationNo: registrationNo.value,
      categoryId: categoryId.value,
    };
    // Validate the form values and proceed if there are no errors
    if (validate(values)) {
      setLoading(true);
      // Call a mock API function to add or update the car data based on the id
      saveCar(values, id)
        .then((response) => {
          // If successful, redirect to the cars list page using a Link component
        navigate("/", { replace: true })
          
        })
        .catch((error) => {
          // If failed, show an alert with the error message
          alert(error.message);
        })
        .finally(setLoading(false));
    }
  };

  // A mock API function to add or update the car data based on the id
  // You can replace this with your own axios call or other methods
  const saveCar = async (carData, id) => {
    try {
      // Check if the id is defined or not
      if (id) {
        // If id is defined, call the putRequest function with the car endpoint and data
        const response = await putRequest(`/car/${id}`, carData);
        // Return the response data
        return response.data;
      } else {
        // If id is not defined, call the postRequest function with the car endpoint and data
        const response = await postRequest("/car", carData);
        // Return the response data
        return response.data;
      }
    } catch (error) {
      // Log the error and rethrow it
      console.error("createCar error:", error);
      throw error;
    }
  };
  

  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <Typography variant="h4" align="center">
          {id ? "Update" : "Add"} a Car
        </Typography>
        <Paper css={paperStyle}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <FormField
                label="Model"
                type="text"
                inputProps={model}
                error={errors.model}
              />
              <FormField
                label="Make"
                type="text"
                inputProps={make}
                error={errors.make}
              />
              <FormField
                label="Color"
                type="text"
                inputProps={color}
                error={errors.color}
              />
              <FormField
                label="Registration Number"
                type="text"
                inputProps={registrationNo}
                error={errors.registrationNo}
              />
              <FormSelect
                label="Category"
                inputProps={categoryId}
                error={errors.category}
                options={categories && categories}
              />
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  disabled={loading}
                >
                  {id ? "Update" : "Add"} Car
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default AddCar;