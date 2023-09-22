import { ChargingSessionInterface } from 'interfaces/charging-session';
import { CarOwnerInterface } from 'interfaces/car-owner';
import { ServiceVehicleInterface } from 'interfaces/service-vehicle';
import { GetQueryInterface } from 'interfaces';

export interface ChargingRequestInterface {
  id?: string;
  car_owner_id: string;
  service_vehicle_id: string;
  request_time: any;
  location: string;
  status: string;
  charge_level: number;
  created_at?: any;
  updated_at?: any;
  charging_session?: ChargingSessionInterface[];
  car_owner?: CarOwnerInterface;
  service_vehicle?: ServiceVehicleInterface;
  _count?: {
    charging_session?: number;
  };
}

export interface ChargingRequestGetQueryInterface extends GetQueryInterface {
  id?: string;
  car_owner_id?: string;
  service_vehicle_id?: string;
  location?: string;
  status?: string;
}
