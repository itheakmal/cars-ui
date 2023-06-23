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
export default function CreateJob() {
    const paperStyle = { padding: '30px 20px', height: '500px', width: '500px', margin: "20px auto" }
    const headerStyle = { margin: 0, fontWeight: "800" }
    const marginTop = { marginTop: 15 }
    const [job, setJob] = useState({
        address: "",
        comment: "",
        pdffile: "",
    });
    const config = {
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
        }
    };
    const getFileDetails = (fileData) => {
        let fileNames = [];
        for (var i = 0; i < fileData.target.files.length; i++) {
            fileNames.push(fileData.target.files[i]);
        }
        setJob({ ...job, pdffile: fileNames })

        // setShow(true);
        // handlePopupOpen()
    };
    const createJob = async (e) => {
        e.preventDefault()
        let formData = new FormData()
        formData.append('pdffile', job.pdffile[0])
        console.log('formData', formData)
        console.log('job.pdffile[0]', job.pdffile[0])
        const res = await axios.post("http://localhost:8000/upload", formData, config)
        if (res.status === 200) {
            let data = job
            const jobres = await axios.post("http://localhost:8000/api/job/create", { ...data, pdffile: res.data }, config)
            console.log('jobres', jobres)
        }
        return console.log('res', res)
    };
    return (
        <Grid>
            <Paper elevation={20} style={paperStyle}>
                <Grid align='center'>
                    <h2 style={headerStyle}>Job Details</h2>
                    <Typography variant='caption' gutterBottom>Please fill in the details below.</Typography>
                </Grid>
                <form encType='multipart/form-data'>
                    <TextField style={marginTop} id="address" name='address' value={job.address}
                        onChange={(e) => setJob({ ...job, address: e.target.value })}
                        fullWidth label='address' placeholder="Enter your address" />
                    <TextField style={marginTop} id="comment" value={job.comment}
                        onChange={(e) => setJob({ ...job, comment: e.target.value })}
                        fullWidth label='comment' placeholder="Enter your comment" />

                    <div style={marginTop}>
                        <Button variant="contained" component="label">
                            Upload
                            <input hidden accept=".pdf" multiple type="file" onChange={getFileDetails} />
                        </Button></div>

                    <Button type='submit' variant='contained' color='primary' style={marginTop}
                        onClick={(e) => createJob(e)}>Submit</Button>
                </form>
            </Paper>
        </Grid>
    )
}