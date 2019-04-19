const configurations = {
  development: {
    backendAPI: 'http://localhost:5000/api'
  },
  production: {
    backendAPI: 'http://localhost:5000/api'
  },
};

const env = process.env.node_env || 'development';
const config = configurations[env];

export default config;