import React, { useState, useEffect } from 'react';
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { fetchJSON } from './utils/communication';
import Visualizer from './Visualizer';

const styles = {
  root: {
    marginLeft: 20,
    marginRight: 20,
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    marginTop: 40,
    marginLeft: 15,
    marginRight: 15,
    minWidth: 240,
  },
  selectEmpty: {
    marginTop: 40 * 2,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginTop: 40,
    marginLeft: 15,
    marginRight: 15,
    width: 240,
  },
  chart: {
    with: '50%'
  },
};

const ControlledVisualizer = (props) => {
  const { classes } = props;
  
  const [comparison, setComparison] = useState('wind-speed');
  
  const [startDate, setStartDate] = useState('2018-01-01');
  const [endDate, setEndDate] = useState('2018-02-01');
  const [userSetStartDate, setUserSetStartDate] = useState(false);
  const [userSetEndDate, setUserSetEndDate] = useState(false);
  
  useEffect(() => {
    const fetchDateRange = async () => {
      const dateRange = await fetchJSON('mbta/date-range');
      
      if (!userSetStartDate) setStartDate(dateRange.startDate);
      if (!userSetEndDate) setEndDate(dateRange.endDate);
    };

    fetchDateRange();
  }, []);
  
  const selectComparisonType = (event) => {
    setComparison(event.target.value);
  };
  
  const selectStartDate = (event) => {
    setUserSetStartDate(true);
    setStartDate(event.target.value);
  };
  
  const selectEndDate = (event) => {
    setUserSetEndDate(true);
    setEndDate(event.target.value);
  };
  
  return (
    <div>
      <form autoComplete="off" className={classes.root} noValidate>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="compare-value">Compare</InputLabel>
          <Select
            value={comparison}
            onChange={selectComparisonType}
            inputProps={{
              name: 'compare',
              id: 'compare-value'
            }}
          >
            <MenuItem value='wind-speed'>Wind Speed</MenuItem>
            <MenuItem value='precipitation-length'>Precipitation Length</MenuItem>
            <MenuItem value='precipitation-total'>Precipitation Total</MenuItem>
            <MenuItem value='precipitation-day'>Precipitation Day</MenuItem>
            <MenuItem value='sun-percent'>Sun Percent</MenuItem>
            <MenuItem value='snowfall-day'>Snowfall Day</MenuItem>
            <MenuItem value='snowfall-total'>Snowfall Total</MenuItem>
            <MenuItem value='average-temp'>Average Temperature</MenuItem>
            <MenuItem value='max-temp'>Maximum Temperature</MenuItem>
            <MenuItem value='min-temp'>Minimum Temperature</MenuItem>
          </Select>
        </FormControl>
        <TextField
          id="startdate"
          label="start date"
          type="date"
          value={startDate}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={selectStartDate}
        />
        <TextField
          id="enddate"
          label="end date"
          type="date"
          value={endDate}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={selectEndDate}
        />
      </form>
      <Visualizer
        comparison={comparison}
        startDate={startDate}
        endDate={endDate}
        classes={classes}
      />
    </div>
  );
}

export default withStyles(styles)(ControlledVisualizer);