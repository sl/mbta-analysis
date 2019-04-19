import config from '../config'

export const fetchJSON = async (endpoint) => {
  console.log('should be fetching something')
  const response = await fetch(`${config['backendAPI']}${endpoint}`);
  return response.json();
};