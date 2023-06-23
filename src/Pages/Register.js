import React, { useState } from 'react'
import { Grid, Paper, Typography, TextField, Button, MenuItem } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { register } from '../Services/networkRequests';

// Define a helper function to validate email format
const validateEmail = (email) => {
  // Use a regular expression to check if the email is valid
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return regex.test(email);
};

export const Register = () => {
    const history = useNavigate()

    const paperStyle = { padding: '30px 20px', height: '500px', width: '500px', margin: "20px auto" }
    const headerStyle = { margin: 0, fontWeight: "800" }
    const marginTop = { marginTop: 15 }
    const spacing = { marginTop: 15, marginLeft: 15 }
    const errorStyle = {color: 'red'}
    const [data, setData] = useState({
        name: "",
        email: "",
        age: "",
    });
    // state for validation errors
    const [errors, setErrors] = useState({
      name: "",
      email: "",
      age: "",
    });
    // state for server error messages
    const [serverError, setServerError] = useState("");
    const [loading, setLoading] = useState(false)
    const handleRegister = async (e) => {
        e.preventDefault()
        setLoading(true)
        // Reset the errors before validating
        setErrors({
          name: "",
          email: "",
          age: "",
        });
        setServerError("");
        // Validate the name, email and age fields
        let isValid = true;
        if (!data.name) {
          setErrors((prev) => ({ ...prev, name: "Name is required" }));
          isValid = false;
        }
        if (!data.email) {
          setErrors((prev) => ({ ...prev, email: "Email is required" }));
          isValid = false;
        } else if (!validateEmail(data.email)) {
          setErrors((prev) => ({ ...prev, email: "Email is invalid" }));
          isValid = false;
        }
        if (!data.age) {
          // Age is required
          setErrors((prev) => ({ ...prev, age: "Age is required" }));
          isValid = false;
        } else if (data.age < 18 || data.age > 100) {
          // Age is out of range
          setErrors((prev) => ({ ...prev, age: "Age must be between 18 and 100" }));
          isValid = false;
        }
        // If validation passes, make the register request
        if (isValid) {
          try {
            const res = await register(data);
            if(res.hasOwnProperty("id")) {
                history('/login')
            }
          } catch (error) {
            // Handle the server error
            // if (error.response?.status === 400) {
              // Bad request
              setServerError(error.response.data.message);
            // } else {
            //   // Other server errors
            //   setServerError("Something went wrong. Please try again later.");
            // }
          } finally {
            setLoading(false)
          }
        }
    };
    return (
        <Grid>
            <Paper elevation={20} style={paperStyle}>
                <Grid align='center'>
                    <h2 style={headerStyle}>Register Details</h2>
                    <Typography variant='caption' gutterBottom>Please fill in the details below.</Typography>
                </Grid>
                <form>
                    <TextField style={marginTop} id="name" name="name" value={data.name} required
                        onChange={(e) => setData({ ...data, name: e.target.value })}
                        fullWidth label='name' placeholder="Enter your Name"
                        error={!!errors.name}
                        helperText={errors.name}
                    />
                    <TextField type='email' style={marginTop} id="email" name='email' value={data.email} required
                        onChange={(e) => setData({ ...data, email: e.target.value })}
                        fullWidth label='email' placeholder="Enter your email"
                        error={!!errors.email}
                        helperText={errors.email}
                    />
                    <TextField type='number' style={marginTop} id="age" name='age' value={data.age} required
                        onChange={(e) => setData({ ...data, age: e.target.value })}
                        fullWidth label='age' placeholder="Enter your age"
                        error={!!errors.age}
                        helperText={errors.age}
                    />
                    <Button disabled={loading ? true : false} type='submit' variant='contained' color='primary' style={marginTop}
                        onClick={(e) => handleRegister(e)}>Register</Button>
                    <Button type='button' variant='outlined' color='primary' style={spacing}
                        onClick={(e) => history('/login')}>Already have an account? Login</Button>
                    {serverError && <p style={errorStyle}>{serverError}</p>}
                </form>
            </Paper>
        </Grid>
    )
}