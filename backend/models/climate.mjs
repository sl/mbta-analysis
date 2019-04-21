import { db }  from '../utils/db';
import { toFormattedDateString } from '../utils/date.mjs';

const tableColumnNamePrefix = 'clog_';

const weatherAttributeRowNames = {
  'wind-speed': 'avg_wind',
  'precipitation-length': 'days_precip',
  'precipitation-total': 'multiday_precip',
  'precipitation-day': 'precipitation',
  'sun-percent': 'sun_percent',
  'snowfall-day': 'snowfall',
  'snowfall-total': 'snowdepth',
  'average-temp': 'avg_temp',
  'max-temp': 'max_temp',
  'min-temp': 'min_temp',
};

export const getWeatherAttributeForDate = async (attribute, date) => {
  if (!(attribute in weatherAttributeRowNames)) {
    throw new Error(`invalid weather attribute: ${attribute}`);
  }
  
  const tableColumnName = tableColumnNamePrefix + weatherAttributeRowNames[attribute];
  
  const [rows, cols] = await db().query(
    `SELECT clog_date as date, AVG(${tableColumnName}) as ${tableColumnName} ` +
    `FROM climate_log ` +
    `WHERE clog_date = \'${date}\' ` +
    `GROUP BY clog_date ` +
    `LIMIT 1`
  );
  
  const result = {};
  
  if (rows.length !== 0) {
    result[toFormattedDateString(rows[0].date)] = rows[0][tableColumnName];
  }
  
  return result;
};

export const getWeatherAttributeForRange = async (attribute, start, end) => {
  if (Date.parse(start) > Date.parse(end)) {
    throw new Error('start of date range must be before the end of date range');
  }
  
  if (!(attribute in weatherAttributeRowNames)) {
    throw new Error(`invalid weather attribute: ${attribute}`);
  }
  
  const tableColumnName = tableColumnNamePrefix + weatherAttributeRowNames[attribute];
  
  const [rows, cols] = await db().query(
    `SELECT clog_date as date, AVG(${tableColumnName}) as ${tableColumnName} ` +
    `FROM climate_log ` +
    `WHERE clog_date >= \'${start}\' ` +
    `AND clog_date <= \'${end}\' ` +
    `GROUP BY clog_date`
  );
  
  const result = {};
  rows.forEach(row => {
    result[toFormattedDateString(row.date)] = row[tableColumnName];
  });
  
  return result;
};