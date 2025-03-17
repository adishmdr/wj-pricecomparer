
import axios from 'axios';
import { MovieComparison } from '../types';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5058/api/movie', 
});

const token = process.env.REACT_APP_API_TOKEN;
if (!token) {
  console.warn('API token is not set in environment variables. Authentication may fail.');
}

export const fetchMovies = async (): Promise<MovieComparison[]> => {
  try {
    const response = await api.get<MovieComparison[]>('/movies', {
      headers: {
        'x-access-token': token || '', // Pass token in header
      },
    });
    console.log('Response status:', response.status, 'Data:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Fetch movies error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      headers: error.response?.headers,
    });
    throw error;
  }
};

export const compareMovies = async (cinemaWorldId: string, filmWorldId: string): Promise<MovieComparison> => {
  try {
    console.log('Comparing movies:', { cinemaWorldId, filmWorldId });
    const response = await api.get<MovieComparison>('/compare', {
      params: { cinemaWorldId, filmWorldId },
      headers: {
        'x-access-token': token || '', // Pass token in header
      },
    });
    console.log('Comparison response:', response.status, response.data);
    return response.data;
  } catch (error) {
    console.error('Error comparing movies:', error);
    throw error;
  }
};