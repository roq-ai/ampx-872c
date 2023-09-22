import * as yup from 'yup';

export const carOwnerValidationSchema = yup.object().shape({
  car_model: yup.string().required(),
  car_make: yup.string().required(),
  car_year: yup.number().integer().required(),
  license_plate: yup.string().required(),
  battery_capacity: yup.number().integer().required(),
  user_id: yup.string().nullable().required(),
});
