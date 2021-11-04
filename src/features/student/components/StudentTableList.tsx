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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export interface StudentTableListListProps {
    students: Student[];
    cityMap: {
        [key: string]: City;
    };
    onEdit?: (student: Student) => void;
    onDelete: (student: Student) => void;
}

export default function StudentTableList({
    students,
    cityMap,
    onEdit,
    onDelete,
}: StudentTableListListProps) {
    const [open, setOpen] = React.useState(false);
    const [selectedStudent, setSelectedStudent] = React.useState<Student>();

    const handleClose = () => {
        setOpen(false);
    };

    const hanldeDeleteClick = (student: Student) => {
        setSelectedStudent(student);
        setOpen(true);
    }

    const hanldeRemoveConfirm = () => {
        onDelete && onDelete(selectedStudent as Student);
        setOpen(false);
    }

    return (
        <>
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
                                    <TableCell sx={{ maxWidth: '100px' }}>{student.id}</TableCell>
                                    <TableCell>{student.name}</TableCell>
                                    <TableCell>{capabilitiesString(student.gender)}</TableCell>
                                    <TableCell>
                                        <Box color={getMarkColor(student.mark)} fontWeight="bold">
                                            {student.mark}
                                        </Box>
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
                                            onClick={() => hanldeDeleteClick(student)}
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

            {/* remove dialog */}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Remove student
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure remove student name {selectedStudent?.name}.<br/> 
                        This action can&aspos;t be undo.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="outlined">Cancel</Button>
                    <Button onClick={hanldeRemoveConfirm} color="secondary" variant="contained">
                        Remove
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
