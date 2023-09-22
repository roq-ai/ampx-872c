import axios from 'axios';
import queryString from 'query-string';
import { ServiceVehicleInterface, ServiceVehicleGetQueryInterface } from 'interfaces/service-vehicle';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getServiceVehicles = async (
  query?: ServiceVehicleGetQueryInterface,
): Promise<PaginatedInterface<ServiceVehicleInterface>> => {
  const response = await axios.get('/api/service-vehicles', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createServiceVehicle = async (serviceVehicle: ServiceVehicleInterface) => {
  const response = await axios.post('/api/service-vehicles', serviceVehicle);
  return response.data;
};

export const updateServiceVehicleById = async (id: string, serviceVehicle: ServiceVehicleInterface) => {
  const response = await axios.put(`/api/service-vehicles/${id}`, serviceVehicle);
  return response.data;
};

export const getServiceVehicleById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/service-vehicles/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteServiceVehicleById = async (id: string) => {
  const response = await axios.delete(`/api/service-vehicles/${id}`);
  return response.data;
};
