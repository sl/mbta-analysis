import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { getPerformanceForDate } from '../../models/mbta_performance';
import { getPerformanceForRange } from '../../models/mbta_performance';

// set up the router

const router = express.Router();
router.use(bodyParser.raw());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true,
}));

// routes for /api/mbta/performance

const isValidDate = /[0-9]+(-[0-9]+){0,2}/;

// checks if a date is valid
const validate = (dateString) => isValidDate.test(dateString);

// gets the performance rating for the givee date
router.get('/:date', cors(), async (req, res) => {
  const date = req.params.date;
  
  if (!validate(date)) {
    res.status(400);
    res.send(`malformed date: "${date}"`)
    return;
  }
  
  const performance = await getPerformanceForDate(date);
  res.json(performance);
});

// gets the performance rating for the days within the given range
router.get('/range/:start/:end', cors(), async (req, res) => {
  const start = req.params.start;
  const end = req.params.end;
  
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
    const performance = await getPerformanceForRange(start, end);
    res.json(performance);
  } catch (e) {
    res.status(400);
    res.send(`${e.name}: ${e.message}`);
  }
});

export default router;