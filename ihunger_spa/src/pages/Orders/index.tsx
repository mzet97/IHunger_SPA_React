/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-children-prop */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react';
import { Box, StackDivider, VStack, HStack } from '@chakra-ui/react';
import api from '../../services/api';

import pizzaImg from '../../assets/img/pizza.jpg';
import FilterRestaurant from '../../components/Filter/FilterRestaurant';
import ItemRestaurant from '../../components/List/Item/ItemRestaurant';
import Restaurant from '../../models/Restaurant/Restaurant';
import Comment from '../../models/Restaurant/Comment';
import BaseBody from '../../components/BaseBody';
import User from '../../models/User/User';

const Orders: React.FC = () => {
  const token = JSON.parse(
    localStorage.getItem('@IHunger:userToken') as string,
  ) as User;
  console.log(token);
  return (
    <>
      <BaseBody>
        <HStack
          divider={<StackDivider borderColor="gray.200" />}
          spacing={4}
          align="stretch"
        >
          <VStack spacing={4} align="stretch">
            <Box h="40px" bg="black">
              Imagem
            </Box>
          </VStack>
          <VStack spacing={4} align="stretch">
            <Box h="40px" bg="black">
              Name: {token.profile.name}
            </Box>
            <Box h="40px" bg="black">
              LastName: {token.profile.lastName}
            </Box>
            <Box h="40px" bg="black">
              Email: {token.email}
            </Box>
            <Box h="40px" bg="black">
              Type: {token.profile.type}
            </Box>
          </VStack>
        </HStack>
        <Box>
          <h1>Esqueci a senha</h1>
          <h1>Esqueci a senha</h1>
        </Box>
      </BaseBody>
    </>
  );
};

export default Orders;
