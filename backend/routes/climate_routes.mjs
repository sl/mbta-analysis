import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { validate } from '../utils/date';
import { getWeatherAttributeForDate } from '../models/climate';
import { getWeatherAttributeForRange } from '../models/climate';

// set up the router
const router = express.Router();
router.use(bodyParser.raw());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true,
}));

// routes for /api/climate

router.get('/:attribute/:date', cors(), async (req, res) => {
  const attribute = req.params.attribute;
  const date = req.params.date;
  
  if (!validate(date)) {
    res.status(400);
    res.send(`malformed date: "${date}"`)
    return;
  }
  
  const result = await getWeatherAttributeForDate(attribute, date);
  res.json(result);
});

router.get('/:attribute/range/:start/:end', cors(), async (req, res) => {
  const attribute = req.params.attribute;
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
    const results = await getWeatherAttributeForRange(attribute, start, end);
    res.json(results);
  } catch (e) {
    res.status(400);
    res.send(`${e.name}: ${e.message}`);
  }
});

export default router;