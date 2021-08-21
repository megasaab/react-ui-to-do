import { Avatar, IconButton, makeStyles, TextField } from "@material-ui/core";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { i18n } from "../i18n/i18n";
import { useContext, useEffect, useState } from "react";
import SearchIcon from '@material-ui/icons/Search';
import $api, { GITHUB_URL } from "../../http/https";
import axios from "axios";
import { ERROR_TOASTER_STATUS, SUCCESS_TOASTER_STATUS } from "../constants/toaster-status";
import Toaster from "../assets/Toaster";
import { Context } from "../..";
import LoadingBar from "../assets/LoadingBar";

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(3),
    },

    center: {
        textAlign: 'center',
        width: '100%',
        display: 'flex',
        alignItems: 'center'
    }
}));

const searchEndpoint = 'users';

const Github = () => {
    const classes = useStyles();
    const language = localStorage.getItem('lang');
    const [user, setUserInput] = useState('');
    const [userList, setUsers] = useState([]);
    const [isToaster, setToaster] = useState(false);
    const [toasterMessage, setToasterMessage] = useState('');
    const [status, setStatus] = useState(SUCCESS_TOASTER_STATUS);
    const { store } = useContext(Context);

    useEffect(() => {
        store.setLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSearch = async () => {
        const searchOptions = user ? `/${user}` : '';
        try {
            store.setLoading(true);
            const result = await axios.get(`${GITHUB_URL}/${searchEndpoint}${searchOptions}`);
            if (result?.data?.length > 0) {
                setUsers(result?.data);
                console.log(userList)
            }
        } catch (err) {
            setToaster(true);
            setStatus(ERROR_TOASTER_STATUS);
            setToasterMessage(err?.message);
        } finally {
            store.setLoading(false);
        };
    };


    return (
        <div>
            {store.isLoading ? <LoadingBar /> : ''}
            <div className={classes.center}>
                {isToaster ? <Toaster message={toasterMessage} status={status} /> : ''}
                <AccountCircle fontSize='large' />
                <TextField
                    value={user}
                    onChange={e => setUserInput(e.target.value)}
                    style={{ margin: 8 }}
                    placeholder={i18n[language]?.searchGithubUser}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <IconButton
                    color="inherit"
                    onClick={() => handleSearch()}
                >
                    <SearchIcon fontSize='large' />
                </IconButton>
            </div>

            {userList?.map((item, index) => {
                return (
                    <div key={index} className={classes.center}>
                        <Avatar alt="avatar" src={item?.avatar_url} />
                        <span>{item?.login}</span>
                    </div>
                )
            })}
        </div>
    )
}

export default Github;