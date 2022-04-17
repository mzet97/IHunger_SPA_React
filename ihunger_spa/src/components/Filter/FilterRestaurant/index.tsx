/* eslint-disable react/no-children-prop */
import { Search2Icon } from '@chakra-ui/icons';
import {
  Box,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Switch,
  VStack,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import CategoryRestaurant from '../../../models/Restaurant/CategoryRestaurant';
import api from '../../../services/api';

const FilterRestaurant: React.FC = () => {
  const [categoryRestaurants, setCategoryRestaurants] = useState<
    CategoryRestaurant[]
  >([]);

  useEffect(() => {
    api.get<CategoryRestaurant[]>(`category-restaurants`).then(response => {
      setCategoryRestaurants(response.data);
    });
  }, []);

  return (
    <VStack
      spacing={4}
      borderColor="gray.300"
      border="1px"
      pt="20px"
      pl="10px"
      pr="10px"
      borderRadius="30px"
      h="180px"
    >
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<Search2Icon color="gray.300" />}
        />
        <Input type="tel" placeholder="Restaurant name" />
      </InputGroup>
      <HStack spacing={2}>
        <Box w="200px">
          <Select
            placeholder="Default"
            bg="gray.800"
            focusBorderColor="gray.800"
            colorScheme="green"
            borderColor="gray.300"
          >
            {categoryRestaurants.map(categoryRestaurant => (
              <option key={categoryRestaurant.id} value={categoryRestaurant.id}>
                {categoryRestaurant.name}
              </option>
            ))}
          </Select>
        </Box>
      </HStack>
      <HStack>
        <Box>
          <HStack>
            <Text>Vegan</Text>
            <Switch size="md" />
          </HStack>
        </Box>
        <Box>
          <HStack>
            <Text>Vegetarian</Text>
            <Switch size="md" />
          </HStack>
        </Box>
        <Box>
          <HStack>
            <Text>Kosher</Text>
            <Switch size="md" />
          </HStack>
        </Box>
      </HStack>
    </VStack>
  );
};

export default FilterRestaurant;
