const configurations = {
  development: {
    backendAPI: 'http://localhost:5000/api'
  },
  production: {
    backendAPI: 'https://mbta-analysis.herokuapp.com/api'
  },
};

const env = process.env.NODE_ENV || 'development';
const config = configurations[env];

export default config;