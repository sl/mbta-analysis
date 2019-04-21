import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { getPerformanceForDate } from '../../models/mbta_performance';
import { getPerformanceForRange } from '../../models/mbta_performance';

import { validate } from '../../utils/date';
import { getPerformanceForDateOnLine } from '../../models/mbta_performance.mjs';
import { getPerformanceForRangeOnLine } from '../../models/mbta_performance.mjs';

// set up the router

const router = express.Router();
router.use(bodyParser.raw());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true,
}));

// routes for /api/mbta/performance

// gets the performance rating for all lines for the givee date
router.get('/:line/:date', cors(), async (req, res) => {
  const date = req.params.date;
  const line = req.params.line;
  
  if (!validate(date)) {
    res.status(400);
    res.send(`malformed date: "${date}"`)
    return;
  }
  
  console.log(`checking date for line: ${line}`);
  
  if (line === 'all') {
    const performance = await getPerformanceForDate(date);
    res.json(performance);
  } else {
    const performance = await getPerformanceForDateOnLine(line, date);
    res.json(performance);
  }
});

// gets the performance rating for the days within the given range
router.get('/:line/range/:start/:end', cors(), async (req, res) => {
  const start = req.params.start;
  const end = req.params.end;
  const line = req.params.line;
  
  const startValid = validate(start);
  const endValid = validate(end);
  
  const errors = [];
  
  if (!startValid) errors.push(`malformed start date: "${start}"`);
  if (!endValid) errors.push(`malformed end date "${end}"`);
  
  if (errors.length !== 0) {
    res.status(400);
    res.send(`invalid date range: ${errors.join(',')}`);
    return;
  }
  
  try {
    if (line === 'all') {
      const performance = await getPerformanceForRange(start, end);
      res.json(performance);
    } else {
      const performance = await getPerformanceForRangeOnLine(line, start, end);
      res.json(performance);
    }
  } catch (e) {
    res.status(400);
    res.send(`${e.name}: ${e.message}`);
  }
});

export default router;