import { useEffect, useState } from 'react';
import CovidService from '../../services/CovidService';
import { Line, Bar } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
        display: 'flex',
        justifyContent: 'center',
        width: '80%'
    },

}))

const Chart = () => {
    const [dailyData, setDailyData] = useState([]);
    const classes = useStyles();
    const language = localStorage.getItem('lang');

    useEffect(() => {
        async function fetch() {
            const response = await CovidService.fetchDailyDate();
            setDailyData(response);
        }

        fetch();
    }, [])

    const lineChart = (
        dailyData?.length
            ? (
                <Line
                    data={{
                        labels: dailyData.map(({ date }) => date),
                        datasets: [{
                            data: dailyData.map(({ confirmed }) => confirmed),
                            label: 'Infected',
                            borderColor: '#3333ff',
                            fill: true
                        }, {
                            data: dailyData.map(({ deaths }) => deaths),
                            label: 'Deaths',
                            backgroundColor: 'rgba(255,0,0,0.5)',
                            fill: true
                        }],
                    }}
                />) : null
    )

    return (
        <div className={classes.container}>
            {lineChart}
        </div>
    )
}

export default Chart;