import React, { useState, useEffect } from 'react';
import { fetchJSON } from './utils/communication'

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
    <p>
      Start Date: {startDate}, End Date: {endDate}
    </p>
  );
}

export default App;
