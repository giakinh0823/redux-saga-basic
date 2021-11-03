import { Box, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import * as React from 'react';

export interface StatisticsItemProps {
    icon: React.ReactElement;
    label: string;
    value: string | number;
}

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        flexFlow: 'row nowrap',
        alignItems: 'center',
        padding: "10px 40px",
        minHeight: "120px",
    },
}));

export default function StatisticsItem({icon, label, value}: StatisticsItemProps) {
    const classes = useStyles();
    return <Paper className={classes.root} >
        <Box>
            {icon}    
        </Box>
        <Box>
            <Typography variant="h5" align="right">
                {value}
            </Typography>
            <Typography variant="caption" align="right">
                {label}
            </Typography>
        </Box>
    </Paper>;
}
