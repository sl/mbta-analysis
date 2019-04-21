import express from 'express';
import path from 'path';
import { connectToDatabase } from './backend/utils/db';

// routes
import mbtaRoutes from './backend/routes/mbta_routes';
import climateRoutes from './backend/routes/climate_routes';

// create the server
const app = express();

// add routers to the app
app.use('/api/mbta', mbtaRoutes);
app.use('/api/climate', climateRoutes);

const __dirname = path.dirname(new URL(import.meta.url).pathname);
// set up express so it serves the frontend if we're not in /api
app.use(express.static(path.join(__dirname, 'frontend/build')));

// anything that doesn't match any patterns should be routed to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/frontend/build/index.html'));
});

const main = async () => {
  connectToDatabase();
  
  const port = process.env.PORT || 5000;
  
  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
};

main();