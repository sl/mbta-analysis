import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { getPerformanceForDate } from '../../models/mbta_performance.mjs';
import { getPerformanceForRange } from '../../models/mbta_performance.mjs';

// set up the router

const router = express.Router();
router.use(bodyParser.raw());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true,
}));

// routes for /api/mbta/performance

// gets the performance rating for the givee date
router.get('/:date', cors(), async (req, res) => {
  const date = req.params.date;
  const performance = await getPerformanceForDate(date);
  res.json(performance);
});

// gets the performance rating for the days within the given range
router.get('/range/:start/:end', cors(), async (req, res) => {
  const start = req.params.start;
  const end = req.params.end;
  const performance = await getPerformanceForRange(start, end);
  res.json(performance);
});

export default router;