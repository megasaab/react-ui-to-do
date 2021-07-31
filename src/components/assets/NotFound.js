import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    center: {
        textAlign: 'center'
    },
    small: {
        width: theme.spacing(50),
        height: theme.spacing(50),
    },
}));

const NotFound = () => {
    const classes = useStyles();
    return (
        <div className={classes.center}>
            <h1>404 This page could not be found</h1>
            <img className={classes.small} alt="not-found" src="https://i.imgur.com/qIufhof.png" />
            <Link to="/todos">
                Go Back
            </Link>
        </div>
    )
};

export default NotFound;