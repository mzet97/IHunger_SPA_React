/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable-next-line import/no-extraneous-dependencies */
import {
  HStack,
  VStack,
  Text,
  useToast,
  FormControl,
  Input,
  FormLabel,
  FormErrorMessage,
  Button,
  Box,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import UserRegister from '../../models/User/UserRegister';
import api from '../../services/api';

const schema = yup.object().shape({
  email: yup.string().email().max(256).required(),
  password: yup.string().min(8).required(),
  confirmPassword: yup.string().min(8).required(),
  profile: yup.object().shape({
    name: yup.string().min(3).max(80).required(),
    lastName: yup.string().min(3).max(80).required(),
    birthDate: yup.string().required(),
  }),
  address: yup.object().shape({
    street: yup.string().min(3).max(80).required(),
    district: yup.string().min(3).max(80).required(),
    city: yup.string().min(3).max(80).required(),
    county: yup.string().min(3).max(80).required(),
    zipCode: yup.string().min(8).max(15).required(),
  }),
});

const SignUp: React.FC = () => {
  const toast = useToast();
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegister>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values: UserRegister) => {
    try {
      values.profile.type = 2;
      values.address.latitude = '0';
      values.address.longitude = '0';

      const { data } = await api.post('auth/register', values);

      if (!!data && !!data.data && !!data.success) {
        localStorage.setItem('@IHunger:accessToken', data.data.accessToken);
        localStorage.setItem('@IHunger:expiresIn', data.data.expiresIn);
        localStorage.setItem(
          '@IHunger:userToken',
          JSON.stringify(data.data.userToken),
        );

        api.defaults.headers.authorization = `Bearer ${data.data.accessToken}`;

        toast({
          title: 'Success create a account.',
          description: 'Can use the system',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });

        history.push('/dashboard');
      } else {
        toast({
          title: 'Failure create a account.',
          description: 'Check your data',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (err) {
      toast({
        title: 'Failure create a account.',
        description: 'Check your data',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4} align="center" justify="center" mb="50">
          <Text mt="20" fontSize="34" align="center" justify="center">
            Create Account
          </Text>
          <HStack
            mt="50"
            h="100%"
            w="100%"
            spacing={4}
            align="center"
            justify="center"
          >
            <VStack spacing={4} align="center" justify="center">
              <Box mt="6">
                <FormControl
                  isInvalid={!!errors?.profile?.name?.message}
                  errortext={errors?.profile?.name?.message}
                  p="4"
                  isRequired
                >
                  <FormLabel>Name</FormLabel>
                  <Input
                    type="text"
                    placeholder="Name"
                    {...register('profile.name', {
                      required: 'Required',
                    })}
                  />
                  <FormErrorMessage>
                    {errors?.profile?.name?.message?.replace(
                      'profile.name',
                      'Name',
                    )}
                  </FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={!!errors?.profile?.lastName?.message}
                  errortext={errors?.profile?.lastName?.message}
                  p="4"
                  isRequired
                >
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    type="text"
                    placeholder="Last Name"
                    {...register('profile.lastName', {
                      required: 'Required',
                    })}
                  />
                  <FormErrorMessage>
                    {errors?.profile?.lastName?.message?.replace(
                      'profile.lastName',
                      'Last Name',
                    )}
                  </FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={!!errors?.profile?.birthDate?.message}
                  errortext={errors?.profile?.birthDate?.message}
                  p="4"
                  isRequired
                >
                  <FormLabel>Birth Date</FormLabel>
                  <Input
                    type="date"
                    {...register('profile.birthDate', {
                      required: 'Required',
                    })}
                  />
                  <FormErrorMessage>
                    {errors?.profile?.birthDate?.message?.replace(
                      'profile.birthDate',
                      'Birth Date',
                    )}
                  </FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={!!errors?.email?.message}
                  errortext={errors?.email?.message}
                  p="4"
                  isRequired
                >
                  <FormLabel>E-mail</FormLabel>
                  <Input
                    type="email"
                    placeholder="E-mail"
                    {...register('email', {
                      required: 'Required',
                    })}
                  />
                  <FormErrorMessage>
                    {errors?.email?.message?.replace('email', 'E-mail')}
                  </FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={!!errors?.password?.message}
                  errortext={errors?.password?.message}
                  px="4"
                  pb="4"
                  isRequired
                >
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    placeholder="Password"
                    {...register('password', {
                      required: 'Required',
                    })}
                  />
                  <FormErrorMessage>
                    {errors?.password?.message?.replace('password', 'Password')}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={!!errors?.confirmPassword?.message}
                  errortext={errors?.confirmPassword?.message}
                  px="4"
                  pb="4"
                  isRequired
                >
                  <FormLabel>Confirm Password</FormLabel>
                  <Input
                    type="password"
                    placeholder="Password"
                    {...register('confirmPassword', {
                      required: 'Required',
                    })}
                  />
                  <FormErrorMessage>
                    {errors?.confirmPassword?.message?.replace(
                      'confirmPassword',
                      'Confirm Password',
                    )}
                  </FormErrorMessage>
                </FormControl>
              </Box>
            </VStack>
            <VStack spacing={4} align="center" justify="center">
              <Box>
                <FormControl
                  isInvalid={!!errors?.address?.street?.message}
                  errortext={errors?.address?.street?.message}
                  p="4"
                  isRequired
                >
                  <FormLabel>Street</FormLabel>
                  <Input
                    type="text"
                    placeholder="Street"
                    {...register('address.street', {
                      required: 'Required',
                    })}
                  />
                  <FormErrorMessage>
                    {errors?.address?.street?.message?.replace(
                      'address.street',
                      'Street',
                    )}
                  </FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={!!errors?.address?.district?.message}
                  errortext={errors?.address?.district?.message}
                  p="4"
                  isRequired
                >
                  <FormLabel>District</FormLabel>
                  <Input
                    type="text"
                    placeholder="District"
                    {...register('address.district', {
                      required: 'Required',
                    })}
                  />
                  <FormErrorMessage>
                    {errors?.address?.district?.message?.replace(
                      'address.district',
                      'District',
                    )}
                  </FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={!!errors?.address?.city?.message}
                  errortext={errors?.address?.city?.message}
                  p="4"
                  isRequired
                >
                  <FormLabel>City</FormLabel>
                  <Input
                    type="text"
                    placeholder="City"
                    {...register('address.city', {
                      required: 'Required',
                    })}
                  />
                  <FormErrorMessage>
                    {errors?.address?.city?.message?.replace(
                      'address.city',
                      'City',
                    )}
                  </FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={!!errors?.address?.county?.message}
                  errortext={errors?.address?.county?.message}
                  p="4"
                  isRequired
                >
                  <FormLabel>County</FormLabel>
                  <Input
                    type="text"
                    placeholder="County"
                    {...register('address.county', {
                      required: 'Required',
                    })}
                  />
                  <FormErrorMessage>
                    {errors?.address?.county?.message?.replace(
                      'address.county',
                      'County',
                    )}
                  </FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={!!errors?.address?.zipCode?.message}
                  errortext={errors?.address?.zipCode?.message}
                  p="4"
                  isRequired
                >
                  <FormLabel>Zip Code</FormLabel>
                  <Input
                    type="text"
                    placeholder="Zip Code"
                    {...register('address.zipCode', {
                      required: 'Required',
                    })}
                  />
                  <FormErrorMessage>
                    {errors?.address?.zipCode?.message?.replace(
                      'address.zipCode',
                      'Zip Code',
                    )}
                  </FormErrorMessage>
                </FormControl>

                <Button
                  onClick={handleSubmit(onSubmit)}
                  mt="3"
                  ml="6"
                  p="4"
                  w="200px"
                  bg="green"
                  variant="solid"
                >
                  Create
                </Button>
              </Box>
            </VStack>
          </HStack>
        </VStack>
      </form>
    </>
  );
};

export default SignUp;
