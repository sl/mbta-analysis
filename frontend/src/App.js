import React, { useState, useEffect } from 'react';
import { fetchJSON } from './utils/communication';
import TitleBar from './TitleBar';

import 'typeface-roboto';
import Visualizer from './Visualizer';

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
    <div>
      <TitleBar />
      <Visualizer />
    </div>
  );
}

export default App;
