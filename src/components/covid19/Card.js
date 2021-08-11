import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { i18n } from '../i18n/i18n';
import CountUp from 'react-countup';

const useStyles = makeStyles((theme) => ({

    bgcolor: {
        backgroundColor: 'rgb(250,250,250)'
    },

    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '50px 0'
    },

    recovered: {
        borderBottom: '10px solid rgba(0,255,0, 0.5)',
        margin: '0 2% !important'
    },

    deaths: {
        borderBottom: '10px solid rgba(255 ,0, 0, 0.5)',
        margin: '0 2% !important'
    },

    infected: {
        borderBottom: '10px solid rgba(0,0,255, 0.5)',
        margin: '0 2% !important'
    },

}))

const Cards = ({ data }) => {
    const classes = useStyles();
    const language = localStorage.getItem('lang');

    return (
        <div className={classes.container}>
            <Grid container spacing={3} justifyContent='center' xs={12} md={3} className={classes.infected}>
                <Grid item component={Card}>
                    <CardContent>
                        <Typography color='textSecondary' gutterBottom>{i18n[language]?.infected}</Typography>
                        <Typography variant='h5'>
                            <CountUp
                                start={0}
                                end={data?.confirmed?.value}
                                duration={2.5}
                                separator=","
                            />
                        </Typography>
                        <Typography color='textSecondary'>{new Date(data?.lastUpdate).toDateString()}</Typography>
                        <Typography variant='body2'>{i18n[language]?.activeCasesNum}</Typography>
                    </CardContent>
                </Grid>
            </Grid>
            <Grid container spacing={3} justifyContent='center' xs={12} md={3} className={classes.recovered}>
                <Grid item component={Card}>
                    <CardContent>
                        <Typography color='textSecondary' gutterBottom>{i18n[language]?.recovered}</Typography>
                        <Typography variant='h5'>
                            <CountUp
                                start={0}
                                end={data?.recovered?.value}
                                duration={2.5}
                                separator=","
                            />
                        </Typography>
                        <Typography color='textSecondary'>{new Date(data?.lastUpdate).toDateString()}</Typography>
                        <Typography variant='body2'>{i18n[language]?.casesNumRecovered}</Typography>
                    </CardContent>
                </Grid>
            </Grid>
            <Grid container spacing={3} justifyContent='center' xs={12} md={3} className={classes.deaths}>
                <Grid item component={Card}>
                    <CardContent>
                        <Typography color='textSecondary' gutterBottom>{i18n[language]?.death}</Typography>
                        <Typography variant='h5'>
                            <CountUp
                                start={0}
                                end={data?.deaths?.value}
                                duration={2.5}
                                separator=","
                            />
                        </Typography>
                        <Typography color='textSecondary'>{new Date(data?.lastUpdate).toDateString()}</Typography>
                        <Typography variant='body2'>{i18n[language]?.numOfDeath}</Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </div>
    )
}

export default Cards;