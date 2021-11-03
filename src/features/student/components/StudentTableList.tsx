import { Box, Button, Paper } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { City, Student } from 'models';
import * as React from 'react';
import { capabilitiesString, getMarkColor } from 'utils';

export interface StudentTableListListProps {
    students: Student[];
    cityMap: {
        [key: string]: City;
    } 
    onEdit?: (student: Student) => void;
    onDelete?: (student: Student) => void;
}

export default function StudentTableList({
    students,
    cityMap,
    onEdit,
    onDelete,
}: StudentTableListListProps) {
    return (
        <Box>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Gender</TableCell>
                            <TableCell>Mark</TableCell>
                            <TableCell>City</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {students.map((student, index) => (
                            <TableRow
                                key={student.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell sx={{maxWidth: "100px"}}>{student.id}</TableCell>
                                <TableCell>{student.name}</TableCell>
                                <TableCell>{capabilitiesString(student.gender)}</TableCell>
                                <TableCell>
                                    <Box color={getMarkColor(student.mark)} fontWeight="bold">{student.mark}</Box>
                                </TableCell>
                                <TableCell>{cityMap[student.city]?.name}</TableCell>
                                <TableCell align="center">
                                    <Button
                                        size="small"
                                        color="primary"
                                        sx={{ marginRight: '10px' }}
                                        onClick={() => onEdit?.(student)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        size="small"
                                        color="secondary"
                                        onClick={() => onDelete?.(student)}
                                    >
                                        Remove
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
