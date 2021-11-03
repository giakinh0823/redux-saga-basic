import { Box, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import * as React from 'react';

export interface IWidgetProps {
    title: string;
    children: any;
}

const useStyles = makeStyles(() => ({
    root: {
        padding: "20px 30px",
    }
}));

export default function Widget({ title, children }: IWidgetProps) {
    const classes = useStyles();
    return (
        <Paper className={classes.root}>
            <Typography variant="button">{title}</Typography>
            <Box mt={2}>{children}</Box>
        </Paper>
    );
}
