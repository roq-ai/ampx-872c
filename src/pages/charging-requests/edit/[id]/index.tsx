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
import { getChargingRequestById, updateChargingRequestById } from 'apiSdk/charging-requests';
import { chargingRequestValidationSchema } from 'validationSchema/charging-requests';
import { ChargingRequestInterface } from 'interfaces/charging-request';
import { CarOwnerInterface } from 'interfaces/car-owner';
import { ServiceVehicleInterface } from 'interfaces/service-vehicle';
import { getCarOwners } from 'apiSdk/car-owners';
import { getServiceVehicles } from 'apiSdk/service-vehicles';

function ChargingRequestEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<ChargingRequestInterface>(
    () => (id ? `/charging-requests/${id}` : null),
    () => getChargingRequestById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: ChargingRequestInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateChargingRequestById(id, values);
      mutate(updated);
      resetForm();
      router.push('/charging-requests');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<ChargingRequestInterface>({
    initialValues: data,
    validationSchema: chargingRequestValidationSchema,
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
              label: 'Charging Requests',
              link: '/charging-requests',
            },
            {
              label: 'Update Charging Request',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Charging Request
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
          </Box>
        )}

        <FormWrapper onSubmit={formik.handleSubmit}>
          <FormControl id="request_time" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Request Time
            </FormLabel>
            <DatePicker
              selected={formik.values?.request_time ? new Date(formik.values?.request_time) : null}
              onChange={(value: Date) => formik.setFieldValue('request_time', value)}
            />
          </FormControl>

          <TextInput
            error={formik.errors.location}
            label={'Location'}
            props={{
              name: 'location',
              placeholder: 'Location',
              value: formik.values?.location,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.status}
            label={'Status'}
            props={{
              name: 'status',
              placeholder: 'Status',
              value: formik.values?.status,
              onChange: formik.handleChange,
            }}
          />

          <NumberInput
            label="Charge Level"
            formControlProps={{
              id: 'charge_level',
              isInvalid: !!formik.errors?.charge_level,
            }}
            name="charge_level"
            error={formik.errors?.charge_level}
            value={formik.values?.charge_level}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('charge_level', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <AsyncSelect<CarOwnerInterface>
            formik={formik}
            name={'car_owner_id'}
            label={'Select Car Owner'}
            placeholder={'Select Car Owner'}
            fetcher={getCarOwners}
            labelField={'car_model'}
          />
          <AsyncSelect<ServiceVehicleInterface>
            formik={formik}
            name={'service_vehicle_id'}
            label={'Select Service Vehicle'}
            placeholder={'Select Service Vehicle'}
            fetcher={getServiceVehicles}
            labelField={'vehicle_model'}
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
              onClick={() => router.push('/charging-requests')}
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
    entity: 'charging_request',
    operation: AccessOperationEnum.UPDATE,
  }),
)(ChargingRequestEditPage);
