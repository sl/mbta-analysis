import config from '../config'

export const fetchJSON = async (endpoint) => {
  console.log(`fetching: ${config['backendAPI']}${endpoint}`);
  const response = await fetch(`${config['backendAPI']}/${endpoint}`);
  return response.json();
};