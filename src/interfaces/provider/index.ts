import { ServiceVehicleInterface } from 'interfaces/service-vehicle';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ProviderInterface {
  id?: string;
  description?: string;
  address?: string;
  rating?: number;
  service_area?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  service_vehicle?: ServiceVehicleInterface[];
  user?: UserInterface;
  _count?: {
    service_vehicle?: number;
  };
}

export interface ProviderGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  address?: string;
  service_area?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
