import * as yup from 'yup';

export const serviceVehicleValidationSchema = yup.object().shape({
  vehicle_model: yup.string().required(),
  vehicle_make: yup.string().required(),
  vehicle_year: yup.number().integer().required(),
  license_plate: yup.string().required(),
  battery_capacity: yup.number().integer().required(),
  provider_id: yup.string().nullable().required(),
});
