import axios from 'axios';
import queryString from 'query-string';
import { CarOwnerInterface, CarOwnerGetQueryInterface } from 'interfaces/car-owner';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getCarOwners = async (
  query?: CarOwnerGetQueryInterface,
): Promise<PaginatedInterface<CarOwnerInterface>> => {
  const response = await axios.get('/api/car-owners', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createCarOwner = async (carOwner: CarOwnerInterface) => {
  const response = await axios.post('/api/car-owners', carOwner);
  return response.data;
};

export const updateCarOwnerById = async (id: string, carOwner: CarOwnerInterface) => {
  const response = await axios.put(`/api/car-owners/${id}`, carOwner);
  return response.data;
};

export const getCarOwnerById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/car-owners/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteCarOwnerById = async (id: string) => {
  const response = await axios.delete(`/api/car-owners/${id}`);
  return response.data;
};
