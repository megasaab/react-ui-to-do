import { useEffect, useState } from 'react';
import { NativeSelect, FormControl, makeStyles } from '@material-ui/core';
import CovidService from '../../services/CovidService';

const useStyles = makeStyles((theme) => ({
    container: {
          display: 'flex',
          justifyContent: 'center',
          width: '80%'
      },
    
      formControl: {
        with: '30%',
        marginBottom: '30px'
      }
  

  }))
const CountryPicker = ({handleCountryChange}) => {
    const classes = useStyles();
    const [countries, setCountries] = useState([]);
    useEffect(() => {
        async function fetch() {
            const response = await CovidService.countries();
            setCountries(response);
        }

        fetch();
    }, [setCountries])

    return (
        <FormControl className={classes.formControl}>
            <NativeSelect defaultValue='' onChange={(e) => handleCountryChange(e.target.value)}>
                <option value="global">Global</option>
                {countries.map((country, i) => {
                   return <option key={i} value={country}>{country}</option>
                })}
            </NativeSelect>
        </FormControl>
    )
}

export default CountryPicker;