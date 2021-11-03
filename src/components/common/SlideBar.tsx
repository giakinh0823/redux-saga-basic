import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

export interface SidebarProps {}


const useStyles = makeStyles(() => ({
    link: {
        textDecoration: 'none',
        color: 'inherit',
        '&.active > li': {
            backgroundColor: 'rgba(25, 118, 210, 0.08)',
        },
    },
}));

export function Sidebar(props: SidebarProps) {
    const classes = useStyles();
    return (
        <div>
            <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <nav aria-label="main mailbox folders">
                    <List>
                        <NavLink to="/admin/dashboard" className={classes.link}>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <DashboardIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Dashboard" />
                                </ListItemButton>
                            </ListItem>
                        </NavLink>
                        <NavLink to="/admin/student" className={classes.link}>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <AssignmentIndIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Student" />
                                </ListItemButton>
                            </ListItem>
                        </NavLink>
                    </List>
                </nav>
            </Box>
        </div>
    );
}
