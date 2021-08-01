import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListIcon from '@material-ui/icons/List';
import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import ToDoService from '../services/ToDoService';
import { Context } from '..';
import LoadingBar from './assets/LoadingBar';
import EditIcon from '@material-ui/icons/Edit';
import { TextField } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';

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

    addButton: {
        display: 'flex',
        float: 'right',
    },

    link: {
        textDecoration: 'none'
    },

    toDoList: {
        display: 'flex',
        alignItems: 'center'
    }
}));

const getCreatedDate = (date) => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    return `${monthNames[date.getMonth()]} ${date.getDay()}, ${date.getFullYear()}`
}

const ToDoList = () => {
    const classes = useStyles();
    const { store } = useContext(Context);
    const [todos, setTodos] = useState(store.user.todos);
    const [loading, setLoading] = useState(false);
    const [isEdit, setEdit] = useState(false);
    const [name, setName] = useState('');

    useEffect(() => {
        setTodos(store.user.todos);
    }, [store.user.todos]);

    const deleteTodo = async (todo) => {
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
            {loading ? <LoadingBar /> : ''}
            <Link className={classes.link} to="/create-todo">
                <IconButton color="primary" className={classes.addButton}>
                    <AddIcon />
                </IconButton>
            </Link>
            {todos?.length > 0 ? todos?.map((item, index) => {
                return (
                    <div key={index} className={classes.ToDoList}>
                        <List className={classes.root}>
                            <ListItem>
                                <div className={classes.items}>
                                    {item?.todoIcon ?
                                        <ListItemAvatar>
                                            <Avatar>
                                                {item?.todoIcon}
                                            </Avatar>
                                        </ListItemAvatar>
                                        :
                                        <ListIcon className={classes.listIcon} />}
                                    {!isEdit ? <ListItemText
                                        primary={item?.name}
                                        secondary={
                                            `created: ${getCreatedDate(new Date(item?.created_at))}
                                             -
                                             edited: ${getCreatedDate(new Date(item?.updatedAt))}`} /> :

                                        <TextField autoFocus onChange={e => setName(e.target.value)} />
                                    }
                                </div>
                            </ListItem>
                            {!isEdit ?
                                <IconButton onClick={() => setEdit(true)}>
                                    <EditIcon color="primary" />
                                </IconButton> :

                                <IconButton onClick={() => editTodo(item)}>
                                    <CheckIcon />
                                </IconButton>
                            }
                            <IconButton onClick={() => deleteTodo(item)}>
                                <DeleteIcon color="secondary" />
                            </IconButton>
                        </List>
                    </div>
                )
            }) : ''}
        </div>
    );
}

export default ToDoList;