import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { getDateRangeStart } from '../models/mbta_performance.mjs';
import { getDateRangeEnd } from '../models/mbta_performance.mjs';
import { getPerformanceForRange } from '../models/mbta_performance.mjs';

// set up the router
const router = express.Router();
router.use(bodyParser.raw());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true,
}));

// -- routes --

// the first date available for analysis
router.get('/start-date', cors(), async (req, res) => {
  const startDate = await getDateRangeStart();
  res.json({ startDate });
});

// the latest date available for analysis
router.get('/end-date', cors(), async (req, res) => {
  const endDate = await getDateRangeEnd();
  res.json({ endDate });
});

// the range of dates available for analysis
router.get('/date-range', cors(), async (req, res) => {
  const startDate = await getDateRangeStart();
  const endDate = await getDateRangeEnd();
  res.json({ startDate, endDate });
});

router.get('/performance/range/:start/:end', cors(), async (req, res) => {
  const start = req.params.start;
  const end = req.params.end;
  const performance = await getPerformanceForRange(start, end);
  res.json(performance);
});

export default router;