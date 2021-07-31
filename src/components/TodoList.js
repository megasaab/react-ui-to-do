import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListIcon from '@material-ui/icons/List';

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
    }
}));

const getCreatedDate = (date) => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    return `${monthNames[date.getMonth()]} ${date.getDay()}, ${date.getFullYear()}`
}

const ToDoList = ({ user }) => {
    const classes = useStyles();
    const todos = user?.todos;

    return (
        <div>
            {todos.length > 0 ? todos?.map(item => {
                return (
                    <div>
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