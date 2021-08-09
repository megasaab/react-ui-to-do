import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
import ToDoService from '../services/ToDoService';
import { Context } from '..';
import LoadingBar from './assets/LoadingBar';
import Toaster from './assets/Toaster';
import { SUCCESS_TOASTER_STATUS } from './constants/toaster-status';
import ToDoCard from './TodoCard';
import { Pagination } from '@material-ui/lab';
import { i18n } from './i18n/i18n';
import Datepicker from './assets/Datepicker';

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
    },
}));



const ToDoList = () => {
    const classes = useStyles();
    const { store } = useContext(Context);
    const [todos, setTodos] = useState(store.user.todos);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrenctPage] = useState(1);
    const [itemPerPage] = useState(5);
    const language = localStorage.getItem('lang');

    const removeTodo = async (target) => {
        try {
            setLoading(true);
            const result = await ToDoService.deleteTodo(target);
            setTodos(result?.data?.todos);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }

    }

    const updateTodo = async (target) => {
        try {
            setLoading(true);
            const result = await ToDoService.editTodo(target, todos);
            setTodos(result?.data?.todos);
            const user = result?.data;
            store.setUser(user);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        setTodos(store.user.todos);
        return () => {
            store.setToaster(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [store.user.todos]);

    const changePage = (event, page) => {
        setCurrenctPage(page);
    }

    const setDate = (elem) => {
        console.log(elem);
    }

    const indexOfLastItem = currentPage * itemPerPage;
    const indexOfFirstElem = indexOfLastItem - itemPerPage;
    const currentItems = todos?.slice(indexOfFirstElem, indexOfLastItem);


    return (
        <div>
            {store.isToaset ? <Toaster message={`${store?.user?.todos[todos?.length - 1]?.name} todo was created`} status={SUCCESS_TOASTER_STATUS} /> : ''}
            {loading ? <LoadingBar /> : ''}
            <div className={classes.title}>
                <h1>{i18n[language]?.toDoList}</h1>
                <Datepicker setDate={setDate}/>
                <Link className={classes.link} to="/create-todo">
                    <IconButton color="primary">
                        <AddIcon />
                    </IconButton>
                </Link>
            </div>
            {currentItems?.length > 0 ? currentItems?.filter(item => item.isDone === false)?.map((item, index) => {
                return (
                    <ToDoCard key={index} item={item} updateTodo={updateTodo} removeTodo={removeTodo} />
                )
            }) : ''}
            <Pagination
                onChange={changePage}
                size="large"
                count={Math.ceil(todos?.filter(item => item.isDone === false)?.length / itemPerPage)}
                color="primary" />
        </div>
    );
}

export default ToDoList;