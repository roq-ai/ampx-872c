import { ChargingRequestInterface } from 'interfaces/charging-request';
import { ChargingSessionInterface } from 'interfaces/charging-session';
import { ProviderInterface } from 'interfaces/provider';
import { GetQueryInterface } from 'interfaces';

export interface ServiceVehicleInterface {
  id?: string;
  provider_id: string;
  vehicle_model: string;
  vehicle_make: string;
  vehicle_year: number;
  license_plate: string;
  battery_capacity: number;
  created_at?: any;
  updated_at?: any;
  charging_request?: ChargingRequestInterface[];
  charging_session?: ChargingSessionInterface[];
  provider?: ProviderInterface;
  _count?: {
    charging_request?: number;
    charging_session?: number;
  };
}

export interface ServiceVehicleGetQueryInterface extends GetQueryInterface {
  id?: string;
  provider_id?: string;
  vehicle_model?: string;
  vehicle_make?: string;
  license_plate?: string;
}
