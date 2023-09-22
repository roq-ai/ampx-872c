import { ChargingRequestInterface } from 'interfaces/charging-request';
import { ServiceVehicleInterface } from 'interfaces/service-vehicle';
import { GetQueryInterface } from 'interfaces';

export interface ChargingSessionInterface {
  id?: string;
  charging_request_id: string;
  start_time: any;
  end_time?: any;
  charge_provided: number;
  session_status: string;
  service_vehicle_id: string;
  created_at?: any;
  updated_at?: any;

  charging_request?: ChargingRequestInterface;
  service_vehicle?: ServiceVehicleInterface;
  _count?: {};
}

export interface ChargingSessionGetQueryInterface extends GetQueryInterface {
  id?: string;
  charging_request_id?: string;
  session_status?: string;
  service_vehicle_id?: string;
}
