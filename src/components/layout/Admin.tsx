import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import * as React from 'react';
import {Header, Sidebar} from '../common';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import DashBoard from '../../features/dashboard';
import StudentFeature from 'features/student';

const useStyles = makeStyles(() => ({
  root: {
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    gridTemplateColumns: '260px 1fr',
    gridTemplateAreas: `"header header" "slidebar main"`,
    minHeight: '100vh',
  },
  header: {
    gridArea: 'header',
    borderBottom: '1px solid #cccccc69',
  },
  slidebar: {
    gridArea: 'slidebar',
    borderRight: '1px solid #cccccc69',
  },
  main: {
    gridArea: 'main',
    padding: "12px 24px",
  },
}))

export function AdminLayout () {
  const classes = useStyles()
  const match = useRouteMatch()

  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        <Header/>
      </Box>
      <Box className={classes.slidebar}>
        <Sidebar/>
      </Box>
      <Box className={classes.main}>
        <Switch>
          <Route path={`${match.url}/dashboard`}>
              <DashBoard/>
          </Route>
          
          <Route path={`${match.url}/student`}>
              <StudentFeature/>
          </Route>
        </Switch>
      </Box>
    </Box>
  );
}
