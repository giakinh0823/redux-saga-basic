import { Box } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Student } from 'models';
import * as React from 'react';

export interface IStudentRankingListProps {
    students: Student[];
}

export default function StudentRankingList({ students }: IStudentRankingListProps) {
    return (
        <Box>
            <TableContainer>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">#</TableCell>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="right">Mark</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {students.map((student, index) => (
                            <TableRow
                                key={student.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center">{index + 1}</TableCell>
                                <TableCell align="left">{student.name}</TableCell>
                                <TableCell align="right">{student.mark}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
