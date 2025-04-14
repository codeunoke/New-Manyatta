import axios from 'axios';

const API_URL = '/api/properties';

export const getProperties = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

