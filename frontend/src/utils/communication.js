import config from '../config'

export const fetchJSON = async (endpoint) => {
  const response = await fetch(`${config.backendAPI}/${endpoint}`);
  return response.json();
};