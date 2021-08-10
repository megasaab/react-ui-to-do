import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListIcon from '@material-ui/icons/List';
import { IconButton, MenuItem } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { TextField } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import CancelIcon from '@material-ui/icons/Cancel';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import GreenRadio from '@material-ui/core/Radio';
import { i18n } from './i18n/i18n';

const useStyles = makeStyles((theme) => ({
    conditionRoot: {
        width: '100%',
        maxWidth: 'auto',
        backgroundColor: 'green',
        borderRadius: '5px',
        marginBottom: '1rem',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingRight: '1rem'
    },

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

    const month = date.getUTCMonth(); //months from 1-12
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();
    const time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    const weekDay = weekDays[date.getDay()];


    return `${monthNames[month]} ${weekDay} ${day}, ${year}: ${time}`;
}

const ToDoCard = ({ item, updateTodo, removeTodo }) => {
    const [isEdit, setEdit] = useState(false);
    const [name, setName] = useState(item?.name);
    const [radioValue, setRadioValue] = useState(false);
    const language = localStorage.getItem('lang');


    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleRadioChange = async (event) => {
        setRadioValue(event.target.value);
        const target = Object.assign({}, item);
        target.isDone = target.isDone ? false : true;
        await updateTodo(target);
        setRadioValue(false);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const deleteTodo = async () => {
        handleClose();
        const target = Object.assign({}, item);
        try {
            await removeTodo(target);
        } catch (error) {
            console.log(error);
        }
    };

    const editTodo = async () => {
        handleClose();
        const target = Object.assign({}, item);
        target.name = name;
        try {
          await updateTodo(target)
        } catch (error) {
            console.log(error);
        } finally {
            setEdit(false);
        }
    }





    return (
        <div className={classes.ToDoList}>
            <List className={item.isDone ? classes.conditionRoot : classes.root}>
                <ListItem>
                    <div className={classes.items}>
                        <ListIcon className={classes.listIcon} />
                        {isEdit ?
                            <TextField value={name} autoFocus onChange={e => setName(e.target.value)} /> :

                            <ListItemText
                                primary={item?.name}
                                secondary={
                                    `${i18n[language]?.created}: ${getCreatedDate(new Date(item?.created_at))}`} />
                        }
                    </div>
                </ListItem>

                {!item.isDone ?
                    <GreenRadio
                        color="default"
                        checked={radioValue === 'true'}
                        onChange={handleRadioChange}
                        value={true}

                    /> :

                    <GreenRadio
                        color="default"
                        checked={radioValue === 'false'}
                        onChange={handleRadioChange}
                        value={false}

                    />
                }

                {
                    !isEdit ?
                        '' :
                        <div className={classes.flexButton}>
                            <IconButton onClick={() => editTodo()} disabled={name === ''}>
                                <CheckIcon />
                            </IconButton>
                            <IconButton onClick={() => setEdit(false)}>
                                <CancelIcon />
                            </IconButton>
                        </div>

                }

                {!item.isDone ?
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
                                {i18n[language]?.edit}
                            </MenuItem>
                            <MenuItem onClick={() => deleteTodo()} className={classes.menuItems}>
                                <DeleteIcon color="secondary" />
                                {i18n[language]?.delete}
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <CancelIcon />
                                {i18n[language]?.close}
                            </MenuItem>
                        </Menu>
                    </div>
                    : ''
                }

            </List>
        </div>
    );
}

export default ToDoCard;