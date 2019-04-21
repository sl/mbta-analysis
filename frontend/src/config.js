const configurations = {
  development: {
    backendAPI: 'http://localhost:5000/api'
  },
  production: {
    backendAPI: 'http://localhost:5000/api'
  },
};

const env = process.env.NODE_ENV || 'development';
const config = configurations[env];

export default config;