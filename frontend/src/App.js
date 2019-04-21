import React, { useState, useEffect, Fragment } from 'react';
import { fetchJSON } from './utils/communication';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button'

import 'typeface-roboto';


const App = () => {  
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  
  useEffect(() => {
    const fetchDateRange = async () => {
      const dateRange = await fetchJSON('mbta/date-range');
      setStartDate(dateRange.startDate);
      setEndDate(dateRange.endDate)
    };
    
    fetchDateRange();
  }, []);
  
  return(
    <Fragment>
      <CssBaseline>
        <Button variant="contained" color="primary">Example Material Button</Button>
      </CssBaseline>
    </Fragment>
  );
}

export default App;
