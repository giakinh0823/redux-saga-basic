import { Box, Button, Pagination, Typography, LinearProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
    studentActions,
    selectStudentList,
    selectStudentPagination,
    selectStudentFilter,
    selectStudentLoading,
} from '../studentSlice';
import StudentTableList from '../components/StudentTableList';
import { selectCityList, selectCityMap } from 'features/city/citySlice';
import StudentFilters from '../components/StudentFilters';
import { ListParams } from 'models';

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

    const hanleFIlterChange = (newFilter: ListParams) => {
        dispatch(studentActions.setFilter(newFilter));
    };

    return (
        <Box className={classes.root}>
            <Box className={classes.titleContainer}>
                <Typography variant="h4">Students</Typography>
                <Button variant="contained" color="primary">
                    Add New Student
                </Button>
            </Box>
            {/* filter  */}
            <Box mt={3}>
                <StudentFilters
                    filter={filter}
                    cityList={cityList}
                    onSearchChange={handleSearchChange}
                    onChange={hanleFIlterChange}
                />
            </Box>

            {/* StudentTable */}
            <Box mt={3} sx={{ position: 'relative' }}>
                {loading && (
                    <LinearProgress className={classes.loading} sx={{ position: 'absolute' }} />
                )}
                <StudentTableList students={studentList} cityMap={cityMap} />
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
