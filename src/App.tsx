/* eslint-disable react/jsx-no-comment-textnodes */
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import LoginPage from './features/auth/pages/LoginPage';
import { AdminLayout } from './components/Layout';
import { NotFound, PrivateRoute } from 'components/Common';

function App() {
    return (
        <div className="App">
            <Switch>
                <Route path="/login">
                    <LoginPage />
                </Route>
                <PrivateRoute path="/admin">
                    <AdminLayout />
                </PrivateRoute>
                <Route>
                  <NotFound/>
                </Route>
            </Switch>
        </div>
    );
}

export default App;
