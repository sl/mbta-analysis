import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { getDateRangeStart } from '../models/mbta_performance.mjs';
import { getDateRangeEnd } from '../models/mbta_performance.mjs';
import { getPerformanceForDate } from '../models/mbta_performance.mjs';
import { getPerformanceForRange } from '../models/mbta_performance.mjs';

import performanceRoute from './mbta/performance.mjs';

// set up the router
const router = express.Router();
router.use(bodyParser.raw());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true,
}));

// routes for /api/mbta

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

router.use('/performance', performanceRoute);

export default router;