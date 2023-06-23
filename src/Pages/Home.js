import React, { useEffect, useState } from 'react'
import Tables from '../Components/Tables'
import Paper from '@mui/material/Paper'
import { getRequest } from '../Services/networkRequests'

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'color', headerName: 'Color', width: 130 },
    { field: 'make', headerName: 'Make', width: 130 },
    { field: 'model', headerName: 'ؐؐؐؐؐؐModel', width: 130 },
    { field: 'registrationNo', headerName: 'Registration No.', width: 250 },
    { field: 'make', headerName: 'Make', width: 130 },
    { field: 'make', headerName: 'Make', width: 130 },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 90,
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
];

export const Home = () => {
    const [cars, setCars] = useState([])
    const paperStyle = { padding: '20px', width: '100%', margin: "0 0 20px" }

    useEffect(() => {
        async function fetchCars() {
            const _cars = await getRequest('cars')
            setCars(_cars)
        }
        fetchCars()
    }, [])

    return (
        <div>
            <Paper sx={{ width: '100%', mb: 2 }}>
                {JSON.stringify(cars)}
                <h3 style={paperStyle}>Cars</h3>
                <Tables tableTitle={'Cars Listing'} tableData={cars} />
            </Paper>
        </div>
    )
}