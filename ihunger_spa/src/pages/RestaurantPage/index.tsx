import { Box, Grid, HStack, SimpleGrid, VStack, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import BaseBody from '../../components/BaseBody';
import Restaurant from '../../models/Restaurant/Restaurant';
import api from '../../services/api';

const RestaurantPage: React.FC = () => {
  const [restaurant, setRestaurant] = useState<Restaurant>();
  const location = useLocation();
  const id = location.state.params;

  useEffect(() => {
    api.get<Restaurant>(`restaurants/${id}`).then(response => {
      setRestaurant(response.data);
    });
  }, [id]);

  return (
    <>
      <BaseBody>
        <VStack
          borderColor="gray.300"
          border="1px"
          borderRadius="30px"
          h="150px"
        >
          <HStack mt="10px">
            <Box>
              <Text>Name: {restaurant?.name}</Text>
            </Box>
            <Box>
              <Text>Type: {restaurant?.categoryRestaurant?.name}</Text>
            </Box>
          </HStack>
          <Box>
            <Text>Description: {restaurant?.description}</Text>
          </Box>
          <VStack>
            <Box>
              <Text>Stret: {restaurant?.addressRestaurant?.street}</Text>
            </Box>
            <HStack>
              <Box>
                <Text>City: {restaurant?.addressRestaurant?.city}</Text>
              </Box>
              <Box>
                <Text>County: {restaurant?.addressRestaurant?.county}</Text>
              </Box>
              <Box>
                <Text>ZipCode: {restaurant?.addressRestaurant?.zipCode}</Text>
              </Box>
            </HStack>
          </VStack>
        </VStack>
      </BaseBody>
    </>
  );
};

export default RestaurantPage;
