import { ChevronLeft } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import studentApi from 'api/productApi';
import { Student } from 'models';
import * as React from 'react';
import { Link, useParams } from 'react-router-dom';
import StudentForm from '../components/StudentForm';

export default function AddEditPage() {
    const params = useParams<{ studentId: string }>();
    const { studentId } = params;
    const isEdit = Boolean(studentId);
    const [student, setStudent] = React.useState<Student>();

    React.useEffect(() => {
        if (!studentId) return;
        (async () => {
            try {
                const response = await studentApi.getById(studentId);
                setStudent(response);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [studentId]);

    const initalValues: Student = {
        name: '',
        age: 0,
        mark: 0,
        gender: 'male',
        city: '',
        ...student,
    } as Student;

    const handleFormSubmit = (values: Student) => {
      //todo: handle submit call api
    };

    return (
        <Box>
            <Link to="/admin/student" style={{ textDecoration: 'none' }}>
                <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center' }}>
                    <ChevronLeft /> &nbsp; Back to list
                </Typography>
            </Link>
            <Box mt={3}>
                <Typography variant="h4">
                    {!isEdit ? 'Add New Student' : 'Edit Student Info'}
                </Typography>
            </Box>
            {!isEdit ||
                (Boolean(student) && (
                    <Box mt={4}>
                        <StudentForm initalValues={initalValues} onSubmit={handleFormSubmit} />
                    </Box>
                ))
            }
        </Box>
    );
}
