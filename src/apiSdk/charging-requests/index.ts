import axios from 'axios';
import queryString from 'query-string';
import { ChargingRequestInterface, ChargingRequestGetQueryInterface } from 'interfaces/charging-request';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getChargingRequests = async (
  query?: ChargingRequestGetQueryInterface,
): Promise<PaginatedInterface<ChargingRequestInterface>> => {
  const response = await axios.get('/api/charging-requests', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createChargingRequest = async (chargingRequest: ChargingRequestInterface) => {
  const response = await axios.post('/api/charging-requests', chargingRequest);
  return response.data;
};

export const updateChargingRequestById = async (id: string, chargingRequest: ChargingRequestInterface) => {
  const response = await axios.put(`/api/charging-requests/${id}`, chargingRequest);
  return response.data;
};

export const getChargingRequestById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/charging-requests/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteChargingRequestById = async (id: string) => {
  const response = await axios.delete(`/api/charging-requests/${id}`);
  return response.data;
};
