/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  VStack,
  Input,
  Button,
  Image,
  useToast,
  Divider,
} from '@chakra-ui/react';

import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '../../hooks/auth';

import img from '../../assets/img/IHunger_logo.png';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
});

type LoginFormInputs = {
  email: string;
  password: string;
};

const SignIn: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const { signIn } = useAuth();
  const toast = useToast();
  const history = useHistory();

  const onSubmit = async (values: LoginFormInputs) => {
    try {
      await signIn({
        email: values.email,
        password: values.password,
      });

      toast({
        title: 'Success login.',
        description: 'Can use the system',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });

      history.push('/dashboard');
    } catch (err) {
      toast({
        title: 'Failure login.',
        description: 'Check password and e-mail',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const toSingUo = () => {
    history.push('/signup');
  };

  return (
    <VStack spacing={4} align="center" justify="center">
      <Image boxSize="300px" src={img} alt="logo" />
      <form style={{ width: 350 }} onSubmit={handleSubmit(onSubmit)}>
        <FormControl
          isInvalid={!!errors?.email?.message}
          errortext={errors?.email?.message}
          p="4"
          isRequired
        >
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder="Email"
            {...register('email', {
              required: 'Required',
            })}
          />
          <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
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
          <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
        </FormControl>
        <Button
          onClick={handleSubmit(onSubmit)}
          p="4"
          mx="4"
          mt="6"
          w="90%"
          colorScheme="blue"
          variant="solid"
          disabled={!!errors.email || !!errors.password}
        >
          Login
        </Button>

        <Divider mt="6" orientation="horizontal" />

        <Button
          onClick={toSingUo}
          mt="6"
          mb="6"
          p="4"
          mx="4"
          w="90%"
          colorScheme="green"
          variant="solid"
        >
          Create a account
        </Button>
      </form>
    </VStack>
  );
};

export default SignIn;
