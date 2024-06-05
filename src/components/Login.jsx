import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, FormControl, FormLabel, Input, Box, IconButton, HStack, useColorMode } from '@chakra-ui/react';
import { useAuth } from '../hooks/useAuth';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { login } = useAuth();

  const onSubmit = (data) => {
    login(data.username, data.password);
  };

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box maxW="sm" mx="auto" mt="10">
      <Box p="4">
      <HStack  justifyContent="space-between" mb="4">
        <IconButton
          sx={{marginLeft:"auto"}}
          aria-label="Toggle dark mode"
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
        />
      </HStack>
    </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input {...register('username')} />
        </FormControl>
        <FormControl mt="4">
          <FormLabel>Password</FormLabel>
          <Input type="password" {...register('password')} />
        </FormControl>
        <Button mt="4" type="submit">Login</Button>
      </form>
    </Box>
  );
};

export default Login;
