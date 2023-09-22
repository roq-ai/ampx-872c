import { ChargingRequestInterface } from 'interfaces/charging-request';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface CarOwnerInterface {
  id?: string;
  user_id: string;
  car_model: string;
  car_make: string;
  car_year: number;
  license_plate: string;
  battery_capacity: number;
  created_at?: any;
  updated_at?: any;
  charging_request?: ChargingRequestInterface[];
  user?: UserInterface;
  _count?: {
    charging_request?: number;
  };
}

export interface CarOwnerGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  car_model?: string;
  car_make?: string;
  license_plate?: string;
}
