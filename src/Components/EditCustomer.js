import React from 'react'
import { Grid, Paper, Typography, TextField, Button } from '@material-ui/core'

export default function EditCustomer(props) {
    const paperStyle = { padding: '30px 20px', height: '500px', width: '500px', margin: "20px auto" }
    const headerStyle = { margin: 0, fontWeight: "800" }
    const marginTop = { marginTop: 15 }
    return (
        <Grid>
            <Paper elevation={20} style={paperStyle}>
                <Grid align='center'>
                    <h2 style={headerStyle}>Update Customer Details</h2>
                    <Typography variant='caption' gutterBottom>Edit the details below.</Typography>
                </Grid>
                <form>
                    <TextField style={marginTop} id="name" fullWidth label='' placeholder="Enter your name" />
                    <TextField style={marginTop} id="email" fullWidth label='' placeholder="Enter your email" />
                    <TextField style={marginTop} id="phoneNumber" fullWidth label='' placeholder="Enter your phone number" />
                    <TextField style={marginTop} id="location" fullWidth label='' />
                    <TextField style={marginTop} id="subscription" fullWidth label='' />
                    <Button type='submit' variant='contained' color='primary' style={marginTop} > Update </Button>
                </form>
            </Paper>    
        </Grid>
        )
    }