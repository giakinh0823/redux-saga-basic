import { Button, Paper, Typography, CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { authActions } from '../authSlice';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        flexFlow: 'row nowrap',
    },
    box: {
        padding: '20px',
    },
}));

export default function LoginPage() {
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const isLogging = useAppSelector(state => state.auth.logging); 

    const handleLoginClick = (): void => {
        //TODO: Get username + pwd from loggin form
        dispatch(
            authActions.login({
                username: 'giakinh0823',
                password: 'giakinh0823',
            })
        );
    };
    return (
        <div className={classes.root}>
            <Paper className={classes.box}>
                <Typography variant="h5" component="h1">
                    Student Management
                </Typography>
                <Box mt={4}>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleLoginClick}
                    >
                        {isLogging && <CircularProgress style={{color: 'white'}} />}
                        {!isLogging && 'Fake Login'}
                    </Button>
                </Box>
            </Paper>
        </div>
    );
}
