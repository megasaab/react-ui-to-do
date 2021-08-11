import Cards from "./covid19/Card";
import Chart from "./covid19/Chart";
import CountryPicker from "./covid19/CountryPicker";
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import CovidService from "../services/CovidService";

const useStyles = makeStyles((theme) => ({

    bgcolor: {
        backgroundColor: 'rgb(250,250,250)'
    },

    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    }
}))

const CovidStat = () => {
    const classes = useStyles();
    const [data, setData] = useState({});
    const [country, setCountry] = useState('');

    useEffect(() => {
        async function fetchMyAPI() {
          const response = await CovidService.getAll();
          setData(response);
        }
    
        fetchMyAPI();
      }, [])

    const handleCountryChange = async (country) => {
        const response = await CovidService.getAll(country);
        setCountry(country);
        setData(response)
    }

    return (
        <div className={classes.container}>
            <Cards data={data}/>
            <CountryPicker handleCountryChange={handleCountryChange} />
            <Chart data={data} country={country}/>
        </div>
    )
}

export default CovidStat;