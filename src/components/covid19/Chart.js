import { useEffect, useState } from 'react';
import CovidService from '../../services/CovidService';
import { Line, Bar } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/core/styles';
import { i18n } from '../i18n/i18n';

const useStyles = makeStyles((theme) => ({
  container: {
        display: 'flex',
        justifyContent: 'center',
        width: '80%'
    },

}))

const Chart = ({data, country}) => {
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

    const barChart = (
        data.confirmed
        ?
        (
            <Bar 
                data ={{
                    labels: [`${i18n[language]?.infected}`, `${i18n[language]?.recovered}`, `${i18n[language]?.death}`],
                    datasets: [{
                        label: 'People',
                        backgroundColor: [
                            'rgba(0, 0, 255, 0.5)',
                            'rgba(0, 255, 0, 0.5)',
                            'rgba(255, 0, 0, 0.5)'
                        ],
                        data: [data.confirmed.value, data.recovered.value, data.deaths.value]
                    }]
                }}

                options ={{
                    legend: { display: false},
                    title: { display: true, text: `Currenct state in ${country}`}
                }}
            />
        ): null
    )

    return (
        <div className={classes.container}>
            {country ? barChart : lineChart}
        </div>
    )
}

export default Chart;