import React, { useState, useEffect } from 'react';
import * as V from 'victory';
import { fetchJSON } from './utils/communication';

const Visualizer = (props) => {
  const { classes, startDate, endDate, comparison } = props;

  const [compareData, setCompareData] = useState([]);
  const [initialized, setInitialized] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      const performance = await fetchJSON(`mbta/performance/range/${startDate}/${endDate}`);
      const compare = await fetchJSON(`climate/${comparison}/range/${startDate}/${endDate}`);

      console.log('attempting to transform the data...');
      // transform the performance data 
      
      const compareData = Object.keys(compare).map((key) => {
        const date = Date.parse(key);
        return {
          x: date,
          y: +parseFloat(compare[key]).toFixed(2),
          performance: +performance[key].toFixed(2)
        };
      });
      
      console.log(compareData)

      setCompareData(compareData);
      setInitialized(true);
    };
    
    if (Date.parse(startDate) < Date.parse(endDate)) {
      fetchData();
    }
  }, [props.startDate, props.endDate, props.comparison]);
  
  // don't display the chart if we have no data
  if (!initialized) return (null);
  
  return (
    <V.VictoryChart
      className={classes.chart}
      scale={{ x: 'time' }}
      containerComponent={
        <V.VictoryVoronoiContainer
          voronoiDimension="x"
          labels={(d) => `performance: ${d.performance}`}
          labelComponent={
            <V.VictoryTooltip
              cornerRadius={0}
              flyoutStyle={{fill: "white"}}
            />
          }
        />
      }
    >
      <V.VictoryLine
        theme={V.VictoryTheme.material}
        style={{
          data: { stroke: 'blue' },
          parent: { border: "1px solid #ccc"}
        }}
        data={compareData}
      />
    </V.VictoryChart>
  );
};

export default Visualizer;