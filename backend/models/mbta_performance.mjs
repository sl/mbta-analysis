import { db } from '../utils/db';

const toFormattedDateString = (date) => {
  return date.toISOString().slice(0, 10);
};

export const getDateRangeStart = async () => {
  const [rows, cols] =  await db().query(
    'SELECT MIN(plog_date) as start_date FROM performance_log'
  );
  return toFormattedDateString(rows[0]['start_date']);
};

export const getDateRangeEnd = async () => {
  const [rows, cols] =  await db().query(
    'SELECT MAX(plog_date) as end_date FROM performance_log'
  );
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
  result[toFormattedDateString(rows[0].plog_date)] = rows[0].performance;
  
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