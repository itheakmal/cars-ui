import React, { useState } from 'react'
import { Grid, Paper, Typography, TextField, Button, MenuItem } from '@mui/material'
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import axios from "axios"
const options = [
    {
        label: "5 Mbps",
        value: "5 Mbps",
    },
    {
        label: "10 Mbps",
        value: "10 Mbps",
    },
    {
        label: "20 Mbps",
        value: "20 Mbps",
    },
    {
        label: "40 Mbps",
        value: "40 Mbps",
    },
];
export default function CreateCustomer() {
    const paperStyle = { padding: '30px 20px', height: '500px', width: '500px', margin: "20px auto" }
    const headerStyle = { margin: 0, fontWeight: "800" }
    const marginTop = { marginTop: 15 }
    const [customer, setCustomer] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        location: "",
        subscribedToPackage: "",
    });
    const createCustomer = async (e) => {
        e.preventDefault()
        const res = await axios.post("http://localhost:5000/customers", customer)
        return console.log('res', res)
    };
    return (
        <Grid>
            <Paper elevation={20} style={paperStyle}>
                <Grid align='center'>
                    <h2 style={headerStyle}>Customer Details</h2>
                    <Typography variant='caption' gutterBottom>Please fill in the details below.</Typography>
                </Grid>
                <form>
                    <TextField style={marginTop} id="name" value={customer.name}
                        onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                        fullWidth label='Name' placeholder="Enter your name" />
                    <TextField style={marginTop} id="email" value={customer.email}
                        onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                        fullWidth label='Email' placeholder="Enter your email" />
                    <TextField style={marginTop} id="phoneNumber" value={customer.phoneNumber}
                        onChange={(e) => setCustomer({ ...customer, phoneNumber: e.target.value })}
                        fullWidth label='Phone Number' placeholder="Enter your phone number" />
                    <TextField style={marginTop} id="location" value={customer.location}
                        onChange={(e) => setCustomer({ ...customer, location: e.target.value })}
                        fullWidth label='Location' placeholder="Apartment,City" />
                    {/* <Select style={marginTop} id="subscription" value={customer.subscribedToPackage}
                        onChange={(e) => setCustomer({ ...customer, subscribedToPackage: e.target.value })}
                        fullWidth label="Subscription" placeholder="Subscription" >
                        {options.map((option) => (
                            <option value={option.value}>{option.label}</option>
                        ))}
                    </Select> */}
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Age</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={customer.subscribedToPackage}
                            label="Age"
                            onChange={(e) => setCustomer({ ...customer, subscribedToPackage: e.target.value })}
                        >
                            {options.map((option) => (
                                <MenuItem value={option.value}>{option.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button type='submit' variant='contained' color='primary' style={marginTop}
                        onClick={(e) => createCustomer(e)}>Submit</Button>
                </form>
            </Paper>
        </Grid>
    )
}