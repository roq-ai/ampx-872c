import * as yup from 'yup';

export const chargingRequestValidationSchema = yup.object().shape({
  request_time: yup.date().required(),
  location: yup.string().required(),
  status: yup.string().required(),
  charge_level: yup.number().integer().required(),
  car_owner_id: yup.string().nullable().required(),
  service_vehicle_id: yup.string().nullable().required(),
});
