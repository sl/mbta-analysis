import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

// set up the router
const router = express.Router();
router.use(bodyParser.raw());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true,
}));

// -- routes --

// a test route
router.get('/', cors(), async (req, res) => {
  res.json({ hello: 'world' });
});

export default router;