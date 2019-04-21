import { db } from '../utils/db';
import { toFormattedDateString } from '../utils/date';

const validLines = [
  'Red',
  'Orange',
  'Green-B',
  'Green-C',
  'Green-D',
  'Green-E',
  'Blue',
];

export const getDateRangeStart = async () => {
  const [rows, cols] =  await db().query(
    'SELECT MIN(plog_date) as start_date FROM performance_log'
  );
  
  if (rows.length === 0) {
    throw new Error('no dates for analysis found');
  }
  
  return toFormattedDateString(rows[0]['start_date']);
};

export const getDateRangeEnd = async () => {
  const [rows, cols] =  await db().query(
    'SELECT MAX(plog_date) as end_date FROM performance_log'
  );
  
  if (rows.length === 0) {
    throw new Error('no dates for analysis found');
  }
  
  return toFormattedDateString(rows[0]['end_date']);
};

export const getPerformanceForDate = async (date) => {
  const [rows, cols] = await db().execute(
    
    'SELECT plog_date, AVG(plog_numerator / plog_denominator) as performance ' +
    'FROM performance_log ' +
    'WHERE plog_date = ? ' +
    'GROUP BY plog_date ' +
    'LIMIT 1',
    
    [date]
  );
  
  const result = {};
  
  if (rows.length !== 0) {
    result[toFormattedDateString(rows[0].plog_date)] = rows[0].performance;
  }
  
  return result;
};

export const getPerformanceForDateOnLine = async (line, date) => {
  if (!validLines.includes(line)) {
    throw new Error(`invalid line "${line}"`);
  }
  
  const [rows, cols] = await db().execute(
    
    'SELECT plog_date, AVG(plog_numerator / plog_denominator) as performance ' +
    'FROM performance_log ' +
    'WHERE plog_date = ? ' +
    `AND Line_ID = '${line}' ` +
    'GROUP BY plog_date ' +
    'LIMIT 1',
    
    [date]
  );
  
  const result = {};
  
  if (rows.length !== 0) {
    result[toFormattedDateString(rows[0].plog_date)] = rows[0].performance;
  }
  
  return result;
};

export const getPerformanceForRange = async (start, end) => {
  if (Date.parse(start) > Date.parse(end)) {
    throw new Error('start of date range must be before the end of date range');
  }
  
  const [rows, cols] = await db().execute(
    
    'SELECT plog_date, AVG(plog_numerator / plog_denominator) as performance ' +
    'FROM performance_log ' +
    'WHERE plog_date >= ? AND plog_date <= ? ' +
    'GROUP BY plog_date',
    
    [start, end]
  );
  
  const result = {};
  rows.forEach(row => {
    result[toFormattedDateString(row.plog_date)] = row.performance;
  });
  
  return result;
};

export const getPerformanceForRangeOnLine = async (line, start, end) => {
  if (Date.parse(start) > Date.parse(end)) {
    throw new Error('start of date range must be before the end of date range');
  }
  
  if (!validLines.includes(line)) {
    throw new Error(`invalid line "${line}"`);
  }
  
  const [rows, cols] = await db().execute(
    
    'SELECT plog_date, AVG(plog_numerator / plog_denominator) as performance ' +
    'FROM mbta_train_performance ' +
    'WHERE plog_date >= ? AND plog_date <= ? ' +
    `AND Line_ID = '${line}' ` +
    'GROUP BY plog_date',
    
    [start, end]
  );
  
  const result = {};
  rows.forEach(row => {
    result[toFormattedDateString(row.plog_date)] = row.performance;
  });
  
  return result;
};