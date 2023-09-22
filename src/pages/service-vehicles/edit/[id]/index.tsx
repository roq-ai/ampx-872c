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
import { getServiceVehicleById, updateServiceVehicleById } from 'apiSdk/service-vehicles';
import { serviceVehicleValidationSchema } from 'validationSchema/service-vehicles';
import { ServiceVehicleInterface } from 'interfaces/service-vehicle';
import { ProviderInterface } from 'interfaces/provider';
import { getProviders } from 'apiSdk/providers';

function ServiceVehicleEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<ServiceVehicleInterface>(
    () => (id ? `/service-vehicles/${id}` : null),
    () => getServiceVehicleById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: ServiceVehicleInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateServiceVehicleById(id, values);
      mutate(updated);
      resetForm();
      router.push('/service-vehicles');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<ServiceVehicleInterface>({
    initialValues: data,
    validationSchema: serviceVehicleValidationSchema,
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
              label: 'Service Vehicles',
              link: '/service-vehicles',
            },
            {
              label: 'Update Service Vehicle',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Service Vehicle
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
          </Box>
        )}

        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.vehicle_model}
            label={'Vehicle Model'}
            props={{
              name: 'vehicle_model',
              placeholder: 'Vehicle Model',
              value: formik.values?.vehicle_model,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.vehicle_make}
            label={'Vehicle Make'}
            props={{
              name: 'vehicle_make',
              placeholder: 'Vehicle Make',
              value: formik.values?.vehicle_make,
              onChange: formik.handleChange,
            }}
          />

          <NumberInput
            label="Vehicle Year"
            formControlProps={{
              id: 'vehicle_year',
              isInvalid: !!formik.errors?.vehicle_year,
            }}
            name="vehicle_year"
            error={formik.errors?.vehicle_year}
            value={formik.values?.vehicle_year}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('vehicle_year', Number.isNaN(valueNumber) ? 0 : valueNumber)
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

          <AsyncSelect<ProviderInterface>
            formik={formik}
            name={'provider_id'}
            label={'Select Provider'}
            placeholder={'Select Provider'}
            fetcher={getProviders}
            labelField={'name'}
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
              onClick={() => router.push('/service-vehicles')}
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
    entity: 'service_vehicle',
    operation: AccessOperationEnum.UPDATE,
  }),
)(ServiceVehicleEditPage);
