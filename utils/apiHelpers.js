// utils/apiHelpers.js
import axios from 'axios';

const BASE_API_URL = '/api';

export async function getCollections() {
  const response = await axios.get(`${BASE_API_URL}/collections`);
  return response.data;
}
