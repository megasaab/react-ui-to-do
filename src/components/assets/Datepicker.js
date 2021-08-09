import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { i18n } from '../i18n/i18n';
import { getTodayDate } from '../utils/utils';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

const Datepicker = ({setDate}) => {

    const classes = useStyles();
    const language = localStorage.getItem('lang');

    return (
        <div>
            <form className={classes.container} noValidate>
                <TextField
                    onChange={e => setDate(e.target.value)}
                    id="date"
                    label={i18n[language]?.choseDate}
                    type="date"
                    defaultValue={getTodayDate()}
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </form>
        </div>
    )
}

export default Datepicker;