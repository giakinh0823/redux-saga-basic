import { Box } from '@mui/material';
import * as React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import AddEditPage from './pages/AddEditPage';
import ListPage from './pages/ListPage';
import { cityActions } from '../city/citySlice';
import { useAppDispatch } from 'app/hooks';

export interface StudentProps {
}

export default function StudentFeature (props: StudentProps) {
  const match = useRouteMatch();
  const dispatch = useAppDispatch()
  
  React.useEffect(() => {
    dispatch(cityActions.fetchCityList())
  }, [dispatch])

  return (
    <Box>
      <Switch>
          <Route path={`${match.url}`} exact>
            <ListPage/>
          </Route>
          <Route path={`${match.url}/add`}>
            <AddEditPage/>
          </Route>
          <Route path={`${match.url}/:studentId`}>
            <AddEditPage/>
          </Route>
      </Switch>
    </Box>
  );
}
