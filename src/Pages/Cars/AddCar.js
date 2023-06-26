import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { css } from "@emotion/react";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { getRequest, postRequest, putRequest } from "../../Services/networkRequests";
import { useFormErrors, useFormInput } from "../../Services/Hooks";
import { FormSelect } from "../../Components/FormSelect";
import { FormField } from "../../Components/FormField";


const paperStyle = css`
  padding: 2rem;
`;


const AddCar = () => {
  const navigate = useNavigate()
  
  const model = useFormInput("");
  const make = useFormInput("");
  const color = useFormInput("");
  const registrationNo = useFormInput("");
  const categoryId = useFormInput("");
  const { errors, validate } = useFormErrors();

  const { id } = useParams();

  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(false);

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

  // Use for update
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
      saveCar(values, id)
        .then((response) => {
        navigate("/", { replace: true })
          
        })
        .catch((error) => {
          // If failed, show an alert with the error message
          alert(error.message);
        })
        .finally(setLoading(false));
    }
  };

  const saveCar = async (carData, id) => {
    try {
      // Check if the id is defined or not
      if (id) {
        const response = await putRequest(`/car/${id}`, carData);
        // Return the response data
        return response.data;
      } else {
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