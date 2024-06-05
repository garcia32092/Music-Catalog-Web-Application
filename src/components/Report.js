// Report.js to meet requirements by generating a report with multiple columns, multiple rows, date-time stamps, and a title
import React from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';

const Report = ({ title, columns, data }) => {
    const currentDate = new Date().toLocaleString();

    return (
        <Container component={Paper} style={{ padding: '20px', marginTop: '20px' }}>
            <Typography variant="h5" gutterBottom>
                {title}
            </Typography>
            <Typography variant="caption" gutterBottom>
                Generated on: {currentDate}
            </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        {columns.map((column, index) => (
                            <TableCell key={index}>{column}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, rowIndex) => (
                        <TableRow key={rowIndex}>
                            {columns.map((column, colIndex) => (
                                <TableCell key={colIndex}>{row[column]}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    );
};

export default Report;
