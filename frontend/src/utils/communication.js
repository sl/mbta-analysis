import config from '../config'

export const fetchJSON = async (endpoint) => {
  const response = await fetch(endpoint);
  return response.json();
};