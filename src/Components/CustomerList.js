import React from "react";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
export default function CustomerList() {
    return (
        <>
        <h1 style={{ margin:"20px 0 20px 50px" }}>All Customers</h1>
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center" fontWeight="bold"> Name </TableCell>
                        <TableCell align="center" fontWeight="bold"> Email </TableCell>
                        <TableCell align="center" fontWeight="bold"> Phone Number </TableCell>
                        <TableCell align="center" fontWeight="bold"> Location </TableCell>
                        <TableCell align="center" fontWeight="bold"> Subscription Package </TableCell>
                        <TableCell align="center" fontWeight="bold" colSpan={2}> Action</TableCell>
                    </TableRow>
                </TableHead>
            </Table>
        </TableContainer>
        </>
        );
}