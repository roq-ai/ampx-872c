import * as yup from 'yup';

export const providerValidationSchema = yup.object().shape({
  description: yup.string().nullable(),
  address: yup.string().nullable(),
  rating: yup.number().integer().nullable(),
  service_area: yup.string().nullable(),
  name: yup.string().required(),
  user_id: yup.string().nullable().required(),
});
