import express from 'express';

// routes
import mbtaRoutes from './backend/routes/mbta_routes';

// create the server
const app = express();

// add routers to the app
app.use('/api/mbta', mbtaRoutes);

const main = async () => {
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
};

main();