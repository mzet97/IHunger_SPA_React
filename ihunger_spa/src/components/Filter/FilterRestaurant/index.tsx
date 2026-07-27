import { Search2Icon } from '@chakra-ui/icons';
import {
  Box,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import CategoryRestaurant from '../../../models/Restaurant/CategoryRestaurant';
import api from '../../../services/api';

interface FilterRestaurantProps {
  onFilterChange?: (filter: { search: string; category: string }) => void;
}

const FilterRestaurant: React.FC<FilterRestaurantProps> = ({ onFilterChange }) => {
  const [categoryRestaurants, setCategoryRestaurants] = useState<CategoryRestaurant[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    api.get<CategoryRestaurant[]>('category-restaurants').then(response => {
      setCategoryRestaurants(response.data || []);
    });
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    onFilterChange?.({ search: value, category });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setCategory(value);
    onFilterChange?.({ search, category: value });
  };

  return (
    <VStack
      spacing={4}
      borderColor="gray.300"
      border="1px"
      pt="20px"
      pl="10px"
      pr="10px"
      pb="20px"
      borderRadius="30px"
    >
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Search2Icon color="gray.300" />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Search restaurant..."
          value={search}
          onChange={handleSearchChange}
          bg="gray.700"
        />
      </InputGroup>
      <HStack spacing={2} w="100%">
        <Box w="100%">
          <Select
            placeholder="All Categories"
            bg="gray.700"
            value={category}
            onChange={handleCategoryChange}
          >
            {categoryRestaurants.map(cat => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </Select>
        </Box>
      </HStack>
    </VStack>
  );
};

export default FilterRestaurant;
