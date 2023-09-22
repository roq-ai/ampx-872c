import * as yup from 'yup';

export const chargingSessionValidationSchema = yup.object().shape({
  start_time: yup.date().required(),
  end_time: yup.date().nullable(),
  charge_provided: yup.number().integer().required(),
  session_status: yup.string().required(),
  charging_request_id: yup.string().nullable().required(),
  service_vehicle_id: yup.string().nullable().required(),
});
