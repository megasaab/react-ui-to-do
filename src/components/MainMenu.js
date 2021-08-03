import React, { useContext, useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { observer } from "mobx-react-lite";
import { Context } from '..';
import Avatar from '@material-ui/core/Avatar';
import ToDoList from './TodoList';
import ListIcon from '@material-ui/icons/List';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import Box from '@material-ui/core/Box';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
} from "react-router-dom";
import UserProfile from './UserProfile';
import CreateToDo from './CreateTodo';
import DoneToDo from './DoneTodo';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    flexAvatar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    small: {
        width: theme.spacing(4),
        height: theme.spacing(4),
    },

    link: {
        textDecoration: 'none',
        color: 'black'
    },
    spaceBetween: {
        justifyContent: 'space-between'
    }

}));

const MainMenu = () => {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const { store } = useContext(Context);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const logout = () => {
        localStorage.removeItem('token');
        store.setAuth(false);
        store.setUser({});
    };

    const Copyright = () => {
        return (
            <Typography variant="body2" color="textSecondary" align="center">
                {' © '}
                created by megasaab
                {' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        );
    }

    return (
        <Router>
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar className={classes.spaceBetween}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, {
                                [classes.hide]: open,
                            })}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                        </Typography>
                        <div>
                            <IconButton
                                onClick={() => window.open("https://github.com/megasaab", '_blank')}
                                color="inherit"
                            >
                                <GitHubIcon />
                            </IconButton>
                            <IconButton
                                onClick={() => window.open("https://www.instagram.com/_megasaab_/", '_blank')}
                                color="inherit"
                            >
                                <InstagramIcon />
                            </IconButton>
                            <IconButton
                                onClick={() => window.open("https://www.linkedin.com/in/sabyrzhan-azhigali-585615173/", '_blank')}
                                color="inherit"
                            >
                                <LinkedInIcon />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    className={clsx(classes.drawer, {
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    })}
                    classes={{
                        paper: clsx({
                            [classes.drawerOpen]: open,
                            [classes.drawerClose]: !open,
                        }),
                    }}
                >
                    <div className={classes.toolbar}>
                        <div className={classes.flexAvatar}>
                            <Link className={classes.link} to="/user-profile">
                                <IconButton>
                                    <Avatar className={classes.small} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                </IconButton>
                            </Link>
                            {store.user.email}
                            <IconButton onClick={handleDrawerClose}>
                                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                            </IconButton>
                        </div>
                    </div>
                    <Divider />
                    <Link className={classes.link} to="/todos">
                        <ListItem button>
                            <ListItemIcon>
                                <ListIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Todos'} />
                        </ListItem>
                    </Link>
                    <Link className={classes.link} to="/done-todos">
                        <ListItem button>
                            <ListItemIcon>
                                <AssignmentTurnedInIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Done todos'} />
                        </ListItem>
                    </Link>
                    <Divider />
                    <List>
                        <ListItem button onClick={logout}>
                            <ListItemIcon>
                                <ExitToAppIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Exit'} />
                        </ListItem>
                    </List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Switch>
                        <Route path="/user-profile">
                            <UserProfile />
                        </Route>
                        <Route path="/todos">
                            <ToDoList/>
                        </Route>
                        <Route path="/done-todos">
                            <DoneToDo />
                        </Route>
                        <Route path="/create-todo">
                            <CreateToDo />
                        </Route>
                        {/* TODO <Route component={NotFound} /> */}
                        <Redirect to="/todos" />
                    </Switch>
                    <Box mt={8}>
                        <Copyright />
                    </Box>
                </main>
            </div>
        </Router>
    );
}

export default observer(MainMenu);