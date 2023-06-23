import React, { useState } from 'react'
import { Grid, Paper, Typography, TextField, Button, MenuItem } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { login } from '../Services/networkRequests';
import { validateEmail } from '../Services/Utility';
export const Login = () => {
    const history = useNavigate()
    const paperStyle = { padding: '30px 20px', height: '500px', width: '500px', margin: "200px auto 20px" }
    const headerStyle = { margin: 0, fontWeight: "800" }
    const marginTop = { marginTop: 15 }
    const spacing = { marginTop: 15, marginLeft: 15 }
    const errorStyle = {color: 'red'}
    // state for login data
    const [data, setData] = useState({
        email: "",
        password: "",
    });
    // state for validation errors
    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });
    // Define a state variable to store the server error message
    const [serverError, setServerError] = useState("");
    const handleLogin = async (e) => {
        e.preventDefault()
        // Reset the errors before validating
        setErrors({
            email: "",
            password: "",
        });
        setServerError("");
        // Validate the email and password fields
        let isValid = true;
        if (!data.email) {
            // Email is required
            setErrors((prev) => ({ ...prev, email: "Email is required" }));
            isValid = false;
        } else if (!validateEmail(data.email)) {
            // Email is invalid
            setErrors((prev) => ({ ...prev, email: "Email is invalid" }));
            isValid = false;
        }
        if (!data.password) {
            // Password is required
            setErrors((prev) => ({ ...prev, password: "Password is required" }));
            isValid = false;
        }
        // If validation passes, make the login request
        if (isValid) {
            try {
                const res = await login(data)
                if (res.hasOwnProperty("token")) {
                    localStorage.setItem('token', res.token)
                    history('/')
                }
            } catch (error) {
                // Handle the server error
                if (error.response?.status === 403) {
                    // Invalid credentials
                    setServerError(error.response.data.message);
                } else {
                    // Other server errors
                    setServerError("Something went wrong. Please try again later.");
                }
            }
        }
        
    };
    return (
        <Grid>
            <Paper elevation={20} style={paperStyle}>
                <Grid align='center'>
                    <h2 style={headerStyle}>Login Details</h2>
                    <Typography variant='caption' gutterBottom>Please fill in the details below.</Typography>
                </Grid>
                <form>
                    <TextField style={marginTop} id="email" name='email' value={data.email}
                        onChange={(e) => setData({ ...data, email: e.target.value })}
                        fullWidth label='email' placeholder="Enter your email"
                        error={!!errors.email}
                        helperText={errors.email} />
                    <TextField style={marginTop} id="password" name="password" value={data.password}
                        onChange={(e) => setData({ ...data, password: e.target.value })}
                        fullWidth label='password' placeholder="Enter your password"
                        error={!!errors.password}
                        helperText={errors.password} />
                    <Button type='submit' variant='contained' color='primary' style={marginTop}
                        onClick={(e) => handleLogin(e)}>Login</Button>
                    <Button type='button' variant='outlined' color='primary' style={spacing}
                        onClick={(e) => history('/register')}>Don't have an account, Signup</Button>
                    {serverError && <p style={errorStyle}>{serverError}</p>}
                </form>
            </Paper>
        </Grid>
    )
}
