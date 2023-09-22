import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
  Center,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getCarOwnerById, updateCarOwnerById } from 'apiSdk/car-owners';
import { carOwnerValidationSchema } from 'validationSchema/car-owners';
import { CarOwnerInterface } from 'interfaces/car-owner';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';

function CarOwnerEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<CarOwnerInterface>(
    () => (id ? `/car-owners/${id}` : null),
    () => getCarOwnerById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: CarOwnerInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateCarOwnerById(id, values);
      mutate(updated);
      resetForm();
      router.push('/car-owners');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<CarOwnerInterface>({
    initialValues: data,
    validationSchema: carOwnerValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Car Owners',
              link: '/car-owners',
            },
            {
              label: 'Update Car Owner',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Car Owner
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
          </Box>
        )}

        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.car_model}
            label={'Car Model'}
            props={{
              name: 'car_model',
              placeholder: 'Car Model',
              value: formik.values?.car_model,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.car_make}
            label={'Car Make'}
            props={{
              name: 'car_make',
              placeholder: 'Car Make',
              value: formik.values?.car_make,
              onChange: formik.handleChange,
            }}
          />

          <NumberInput
            label="Car Year"
            formControlProps={{
              id: 'car_year',
              isInvalid: !!formik.errors?.car_year,
            }}
            name="car_year"
            error={formik.errors?.car_year}
            value={formik.values?.car_year}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('car_year', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <TextInput
            error={formik.errors.license_plate}
            label={'License Plate'}
            props={{
              name: 'license_plate',
              placeholder: 'License Plate',
              value: formik.values?.license_plate,
              onChange: formik.handleChange,
            }}
          />

          <NumberInput
            label="Battery Capacity"
            formControlProps={{
              id: 'battery_capacity',
              isInvalid: !!formik.errors?.battery_capacity,
            }}
            name="battery_capacity"
            error={formik.errors?.battery_capacity}
            value={formik.values?.battery_capacity}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('battery_capacity', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/car-owners')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'car_owner',
    operation: AccessOperationEnum.UPDATE,
  }),
)(CarOwnerEditPage);
