import axios from 'axios';
import queryString from 'query-string';
import { ChargingSessionInterface, ChargingSessionGetQueryInterface } from 'interfaces/charging-session';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getChargingSessions = async (
  query?: ChargingSessionGetQueryInterface,
): Promise<PaginatedInterface<ChargingSessionInterface>> => {
  const response = await axios.get('/api/charging-sessions', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createChargingSession = async (chargingSession: ChargingSessionInterface) => {
  const response = await axios.post('/api/charging-sessions', chargingSession);
  return response.data;
};

export const updateChargingSessionById = async (id: string, chargingSession: ChargingSessionInterface) => {
  const response = await axios.put(`/api/charging-sessions/${id}`, chargingSession);
  return response.data;
};

export const getChargingSessionById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/charging-sessions/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteChargingSessionById = async (id: string) => {
  const response = await axios.delete(`/api/charging-sessions/${id}`);
  return response.data;
};
