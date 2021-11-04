import { Box, Button, LinearProgress, Pagination, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import studentApi from 'api/productApi';
import { selectCityList, selectCityMap } from 'features/city/citySlice';
import { ListParams, Student } from 'models';
import * as React from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import StudentFilters from '../components/StudentFilters';
import StudentTableList from '../components/StudentTableList';
import {
    selectStudentFilter,
    selectStudentList,
    selectStudentLoading,
    selectStudentPagination,
    studentActions,
} from '../studentSlice';

const useStyles = makeStyles(() => ({
    root: {},
    titleContainer: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    loading: {
        top: '0px',
        width: '100%',
    },
}));

export default function ListPage() {
    const match = useRouteMatch();
    const history = useHistory();

    const classes = useStyles();
    const dispatch = useAppDispatch();
    const studentList = useAppSelector(selectStudentList);
    const pagination = useAppSelector(selectStudentPagination);
    const filter = useAppSelector(selectStudentFilter);
    const loading = useAppSelector(selectStudentLoading);
    const cityMap = useAppSelector(selectCityMap);
    const cityList = useAppSelector(selectCityList);

    React.useEffect(() => {
        dispatch(studentActions.fetchStudentList(filter));
    }, [dispatch, filter]);

    const handleChangePage = (e: any, page: number) => {
        dispatch(studentActions.setFilter({ ...filter, _page: page }));
    };

    const handleSearchChange = (newFilter: ListParams) => {
        dispatch(studentActions.setFilterWithDebounce(newFilter));
    };

    const handleFIlterChange = (newFilter: ListParams) => {
        dispatch(studentActions.setFilter(newFilter));
    };

    const handleDelete = async (student: Student) => {
        try {
            //remove student api
            await studentApi.remove(student?.id || '');

            //trigger to re-fetch student list with current filter
            dispatch(studentActions.setFilter({ ...filter }));
        } catch (error: any) {
            console.log(error);
        }
    };

    const handleEditStudent = async (student: Student) => {
        history.push(`${match.url}/${student.id}`);
    }

    return (
        <Box className={classes.root}>
            <Box className={classes.titleContainer}>
                <Typography variant="h4">Students</Typography>
                <Link to={`${match.url}/add`} style={{ textDecoration: 'none' }}>
                    <Button variant="contained" color="primary">
                        Add New Student
                    </Button>
                </Link>
            </Box>
            {/* filter  */}
            <Box mt={3}>
                <StudentFilters
                    filter={filter}
                    cityList={cityList}
                    onSearchChange={handleSearchChange}
                    onChange={handleFIlterChange}
                />
            </Box>

            {/* StudentTable */}
            <Box mt={3} sx={{ position: 'relative' }}>
                {loading && (
                    <LinearProgress className={classes.loading} sx={{ position: 'absolute' }} />
                )}
                <StudentTableList
                    students={studentList}
                    cityMap={cityMap}
                    onDelete={handleDelete}
                    onEdit={handleEditStudent}
                />
            </Box>
            {/* Pagination */}
            <Box mt={3} mb={3}>
                <Pagination
                    color="primary"
                    count={Math.ceil(pagination?._totalRows / pagination?._limit)}
                    page={pagination?._page}
                    onChange={handleChangePage}
                    sx={{ display: 'flex', justifyContent: 'center' }}
                />
            </Box>
        </Box>
    );
}
