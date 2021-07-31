import React from 'react';
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

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 'auto',
        backgroundColor: 'lightBlue',
        borderRadius: '5px',
        marginBottom: '1rem'
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
        marginLeft: 'auto'
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

const ToDoList = ({ todoUser }) => {
    const classes = useStyles();
    const todos = todoUser?.todos;

    return (
        <div>
            <Link className={classes.link} to="/create-todo">
                <IconButton color="primary" className={classes.addButton}>
                    <AddIcon />
                </IconButton>
            </Link>
            {todos?.length > 0 ? todos?.map((item, index)=> {
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
                                    <ListItemText
                                        primary={item?.name}
                                        secondary={
                                            `created: ${getCreatedDate(new Date(item?.created_at))}
                                             -
                                             edited: ${getCreatedDate(new Date(item?.updatedAt))}`} />
                                </div>
                            </ListItem>
                        </List>
                    </div>
                )
            }) : ''}
        </div>
    );
}

export default ToDoList;