import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListIcon from '@material-ui/icons/List';
import { Button, IconButton, MenuItem } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import ToDoService from '../services/ToDoService';
import { Context } from '..';
import LoadingBar from './assets/LoadingBar';
import EditIcon from '@material-ui/icons/Edit';
import { TextField } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import CancelIcon from '@material-ui/icons/Cancel';
import Toaster from './assets/Toaster';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 'auto',
        backgroundColor: 'lightBlue',
        borderRadius: '5px',
        marginBottom: '1rem',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingRight: '1rem'
    },

    items: {
        display: 'flex',
        alignItems: 'center',
    },

    listIcon: {
        marginRight: '1rem'
    },

    title: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    link: {
        textDecoration: 'none'
    },

    toDoList: {
        display: 'flex',
        alignItems: 'center'
    },

    flexButton: {
        display: 'flex'
    },

    menuItems: {
        display: 'flex',
    }
}));

const getCreatedDate = (date) => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday",
        "Thursday", "Friday", "Saturday"];

    const month = date.getUTCMonth() + 1; //months from 1-12
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();
    const time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    const weekDay = weekDays[date.getDay()];


    return `${monthNames[month]} ${weekDay} ${day}, ${year}: ${time}`;
}

const ToDoList = () => {
    const classes = useStyles();
    const { store } = useContext(Context);
    const [todos, setTodos] = useState(store.user.todos);
    const [loading, setLoading] = useState(false);
    const [isEdit, setEdit] = useState(false);
    const [name, setName] = useState('');

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        setTodos(store.user.todos);

        return () => {
            store.setToaster(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [store.user.todos]);

    const deleteTodo = async (todo) => {
        handleClose();
        const target = Object.assign({}, todo);
        setLoading(true);
        try {
            const result = await ToDoService.deleteTodo(target);
            setTodos(result?.data?.todos);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const editTodo = async (todo) => {
        handleClose();
        const target = Object.assign({}, todo);
        setLoading(true);
        target.name = name;
        try {
            const result = await ToDoService.editTodo(target);
            setTodos(result?.data?.todos);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
            setEdit(false);
        }
    }

    return (
        <div>
            {store.isToaset ? <Toaster message={`${store?.user?.todos[todos?.length - 1]?.name} todo was created`} status={'success'} /> : ''}
            {loading ? <LoadingBar /> : ''}
            <div className={classes.title}>
                <h1>Your Do List</h1>
                <Link className={classes.link} to="/create-todo">
                    <IconButton color="primary">
                        <AddIcon />
                    </IconButton>
                </Link>
            </div>
            {todos?.length > 0 ? todos?.map((item, index) => {
                return (
                    <div key={index} className={classes.ToDoList}>
                        <List className={classes.root}>
                            <ListItem>
                                <div className={classes.items}>
                                    <ListIcon className={classes.listIcon} />
                                    {!isEdit ? <ListItemText
                                        primary={item?.name}
                                        secondary={
                                            `created: ${getCreatedDate(new Date(item?.created_at))}`} /> :

                                        <TextField autoFocus onChange={e => setName(e.target.value)} />
                                    }
                                </div>
                            </ListItem>
                            {
                                !isEdit ?
                                    '' :
                                    <div className={classes.flexButton}>
                                        <IconButton onClick={() => editTodo(item)} disabled={name === ''}>
                                            <CheckIcon />
                                        </IconButton>
                                        <IconButton onClick={() => setEdit(false)}>
                                            <CancelIcon />
                                        </IconButton>
                                    </div>

                            }
                            <div>
                                <IconButton aria-controls="list-menu" aria-haspopup="true" onClick={handleClick}>
                                    <MoreVertIcon />
                                </IconButton>

                                <Menu
                                    id="list-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={() => setEdit(true)} className={classes.menuItems}>
                                        <EditIcon color="primary" />
                                        Edit
                                    </MenuItem>
                                    <MenuItem onClick={() => deleteTodo(item)} className={classes.menuItems}>
                                        <DeleteIcon color="secondary" />
                                        Delete
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>
                                        <CancelIcon />
                                        Close
                                    </MenuItem>
                                </Menu>
                            </div>
                        </List>
                    </div>
                )
            }) : ''}
        </div>
    );
}

export default ToDoList;