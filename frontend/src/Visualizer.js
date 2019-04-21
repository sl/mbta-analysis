import React, { useState, useEffect } from 'react';
import * as V from 'victory';
import { fetchJSON } from './utils/communication';
import { toFormattedDateString } from './utils/date';

const Visualizer = (props) => {
  const { classes, startDate, endDate, comparison, line } = props;

  const [performData, setPerformData] = useState([]);
  const [compareData, setCompareData] = useState([]);
  const [initialized, setInitialized] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      const performance = await fetchJSON(`mbta/performance/${line}/range/${startDate}/${endDate}`);
      const compare = await fetchJSON(`climate/${comparison}/range/${startDate}/${endDate}`);

      console.log(`fetching: mbta/performance/${line}/range/${startDate}/${endDate}`);
      // transform the performance data 
      
      console.log(performance);
      let maximumComparison = Number.NEGATIVE_INFINITY;
      const compareData = Object.keys(compare).map((key) => {
        const date = Date.parse(key);
        const floatKey = parseFloat(compare[key]);
        if (floatKey > maximumComparison) {
          maximumComparison = floatKey
        }
        console.log(`key: ${key}, value: ${performance[key]}`);
        return {
          x: date,
          y: +floatKey.toFixed(2),
          performance: performance[key] === undefined ? 0 : +performance[key].toFixed(2),
          compare: +floatKey.toFixed(2)
        };
      });
      
      const performanceData = Object.keys(compare).map((key) => {
        const date = Date.parse(key)
        return {
          x: date,
          y: maximumComparison * (performance[key] === undefined ? 0 : performance[key])
        };
      })

      setCompareData(compareData);
      setPerformData(performanceData);
      setInitialized(true);
    };
    
    if (Date.parse(startDate) < Date.parse(endDate)) {
      fetchData();
    }
  }, [props.startDate, props.endDate, props.comparison, props.line]);
  
  // don't display the chart if we have no data
  if (!initialized) return (null);
  
  return (
    <V.VictoryChart
      className={classes.chart}
      scale={{ x: 'time' }}
      containerComponent={
        <V.VictoryVoronoiContainer
          voronoiDimension="x"
          labels={(d) => {
            if (d.performance) {
              return `date: ${toFormattedDateString(new Date(d.x))}\n` +
                `performance: ${d.performance}\n` +
                `${comparison}: ${d.compare}`;
            }
          }}
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
      <V.VictoryLine
        theme={V.VictoryTheme.material}
        style={{
          data: { stroke: 'red' },
          parent: { border: "1px solid #ccc"}
        }}
        data={performData}
      />
      <V.VictoryLegend
        x={110}
        y={10}
        gutter={20}
        orientation="horizontal"
        colorScale={['red', 'blue']}
        style={{
          border: { stroke: 'black' }
        }}
        data={[
          { name: 'performance' }, { name: comparison }
        ]}
      />
    </V.VictoryChart>
  );
};

export default Visualizer;