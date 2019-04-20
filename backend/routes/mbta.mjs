import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { getDateRangeStart } from '../models/mbta_performance.mjs';
import { getDateRangeEnd } from '../models/mbta_performance.mjs';

// sub-router imports
import performanceRoutes from './mbta/performance.mjs';

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

// gets the latest date available for analysis of mbta data
router.get('/end-date', cors(), async (req, res) => {
  const endDate = await getDateRangeEnd();
  res.json({ endDate });
});

// gets the range of dates available for analysis of mbta data
router.get('/date-range', cors(), async (req, res) => {
  const startDate = await getDateRangeStart();
  const endDate = await getDateRangeEnd();
  res.json({ startDate, endDate });
});

router.use('/performance', performanceRoutes);

export default router;