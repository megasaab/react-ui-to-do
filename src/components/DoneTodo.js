import { makeStyles } from '@material-ui/core';
import { useContext, useEffect, useState } from 'react';
import { Context } from '..';
import ToDoService from '../services/ToDoService';
import LoadingBar from './assets/LoadingBar';
import { i18n } from './i18n/i18n';
import ToDoCard from './TodoCard';

const useStyles = makeStyles((theme) => ({
    title: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
}));

const DoneToDo = () => {
    const { store } = useContext(Context);
    const [todos, setTodos] = useState(store.user.todos);
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const language = localStorage.getItem('lang');

    useEffect(() => {
        setTodos(store.user.todos);

        return () => {
            store.setToaster(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [store.user.todos]);


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


    return (
        <div>
            {loading ? <LoadingBar /> : ''}
            <div className={classes.title}>
                <h1>{i18n[language]?.doneTodos}</h1>
            </div>
            {todos?.length > 0 ? todos?.filter(item => item.isDone === true)?.map((item, index) => {
                return (
                    <ToDoCard key={index} item={item} updateTodo={updateTodo}/>
                )
            }) : ''}
        </div>
    );
}


export default DoneToDo;