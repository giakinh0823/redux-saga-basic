import { configureStore,combineReducers } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';
import authReducer from 'features/auth/authSlice';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { history } from '../utils';
import dashboardReducer from 'features/dashboard/dashboardSlice';

const sagaMiddleware = createSagaMiddleware();
const rootReducer =  combineReducers({
  router: connectRouter(history),
  auth: authReducer,
  dashboard: dashboardReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware).concat(routerMiddleware(history)), //thêm saga middleware và routerMiddleware
});

sagaMiddleware.run(rootSaga) //saga middleware chạy rootSaga 

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

