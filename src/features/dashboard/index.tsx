import { Box, Grid, LinearProgress, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
    dashboardActions,
    selectDashboardLoading,
    selectDashboardStaticstics,
    selectHighestStudentList,
    selectLowStudentList,
    selectRankingByCityList,
} from './dashboardSlice';
import StatisticsItem from './components/StatisticsItem';
import { PeopleAlt } from '@mui/icons-material';
import Widget from './components/Widget';
import StudentRankingList from './components/StudentRankingList';

const useStyles = makeStyles(() => ({
    root: {
      position: 'relative',
      paddingTop: "8px"
    },
    loading: {
      top: "0",
      width: '100%',
    }
}));

export default function DashBoard() {
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectDashboardLoading);
    const staticstics = useAppSelector(selectDashboardStaticstics);
    const highestStudentList = useAppSelector(selectHighestStudentList);
    const lowStudentList = useAppSelector(selectLowStudentList);
    const rankingByCityList = useAppSelector(selectRankingByCityList);

    console.log('DashBoard', loading, {
        staticstics,
        highestStudentList,
        lowStudentList,
        rankingByCityList,
    });

    React.useEffect(() => {
        dispatch(dashboardActions.fetchData());
    }, [dispatch]);

    return (
        <Box className={classes.root}>
            {/* loading */}
            {loading && (<LinearProgress className={classes.loading} sx={{ position: 'absolute',}}/>)}
            {/* staticstics */}
            <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={3}>
                    <StatisticsItem
                        icon={<PeopleAlt fontSize="large" color="primary" />}
                        label="male"
                        value={staticstics.maleCount}
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <StatisticsItem
                        icon={<PeopleAlt fontSize="large" color="primary" />}
                        label="female"
                        value={staticstics.femaleCount}
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <StatisticsItem
                        icon={<PeopleAlt fontSize="large" color="primary" />}
                        label="mark > 8"
                        value={staticstics.highMarkCount}
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <StatisticsItem
                        icon={<PeopleAlt fontSize="large" color="primary" />}
                        label="mark < 5"
                        value={staticstics.lowMarkCount}
                    />
                </Grid>
            </Grid>
            {/* all student ranking */}
            <Box mt={4}>
              <Typography variant="h4" gutterBottom>ALl Students</Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}  md={6} lg={4} xl={3}>
                  <Widget title="Student width highest mark">
                    <StudentRankingList students={highestStudentList}/>
                  </Widget>
                </Grid>
                <Grid item xs={12}  md={6} lg={4} xl={3}>
                  <Widget title="Student width highest mark">
                  <StudentRankingList students={lowStudentList}/>
                  </Widget>
                </Grid>
              </Grid>
            </Box>
        </Box>
    );
}
