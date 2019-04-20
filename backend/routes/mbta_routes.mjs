import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { getDateRangeStart } from '../models/mbta_performance.mjs';
import { getDateRangeEnd } from '../models/mbta_performance.mjs';
import { getPerformanceForDate } from '../models/mbta_performance.mjs';
import { getPerformanceForRange } from '../models/mbta_performance.mjs';

// set up the router
const router = express.Router();
router.use(bodyParser.raw());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true,
}));

// -- routes --

// gets the first date available for analysis
router.get('/start-date', cors(), async (req, res) => {
  const startDate = await getDateRangeStart();
  res.json({ startDate });
});

// gets the latest date available for analysis
router.get('/end-date', cors(), async (req, res) => {
  const endDate = await getDateRangeEnd();
  res.json({ endDate });
});

// gets the range of dates available for analysis
router.get('/date-range', cors(), async (req, res) => {
  const startDate = await getDateRangeStart();
  const endDate = await getDateRangeEnd();
  res.json({ startDate, endDate });
});

// gets the performance rating for the givee date
router.get('/performance/:date', cors(), async (req, res) => {
  const date = req.params.date;
  const performance = await getPerformanceForDate(date);
  res.json(performance);
});

// gets the performance rating for the days within the given range
router.get('/performance/range/:start/:end', cors(), async (req, res) => {
  const start = req.params.start;
  const end = req.params.end;
  const performance = await getPerformanceForRange(start, end);
  res.json(performance);
});

export default router;