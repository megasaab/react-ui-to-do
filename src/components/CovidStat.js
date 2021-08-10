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
        justifyContent: 'center'
    }
}))

const CovidStat = () => {
    const classes = useStyles();
    const [data, setData] = useState({});
    useEffect(() => {
        async function fetchMyAPI() {
          const response = await CovidService.getAll();
          setData(response)
        }
    
        fetchMyAPI();
      }, [])

    return (
        <div className={classes.container}>
            <Cards data={data}/>
            <CountryPicker />
            <Chart />
        </div>
    )
}

export default CovidStat;