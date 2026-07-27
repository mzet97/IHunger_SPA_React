import React, { useState, useEffect } from 'react';
import { Center, Spinner, Text } from '@chakra-ui/react';

import api from '../../services/api';

import FilterRestaurant from '../../components/Filter/FilterRestaurant';
import ItemRestaurant from '../../components/List/Item/ItemRestaurant';
import Restaurant from '../../models/Restaurant/Restaurant';
import Comment from '../../models/Restaurant/Comment';
import BaseBody from '../../components/BaseBody';

interface FilterData {
  search: string;
  category: string;
}

const Dashboard: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterData>({ search: '', category: '' });

  useEffect(() => {
    api
      .get<Restaurant[]>('restaurants')
      .then(response => {
        setRestaurants(response.data);
        setFilteredRestaurants(response.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let result = restaurants;

    if (filter.search) {
      const search = filter.search.toLowerCase();
      result = result.filter(
        r =>
          r.name.toLowerCase().includes(search) ||
          r.description?.toLowerCase().includes(search),
      );
    }

    if (filter.category) {
      result = result.filter(
        r => r.categoryRestaurant?.name === filter.category,
      );
    }

    setFilteredRestaurants(result);
  }, [filter, restaurants]);

  const averageComments = (comments: Comment[]) => {
    if (!comments || comments.length === 0) return 0;
    const sum = comments.reduce((acc, c) => acc + Number(c.starts), 0);
    return sum / comments.length;
  };

  const handleFilterChange = (newFilter: FilterData) => {
    setFilter(newFilter);
  };

  if (loading) {
    return (
      <BaseBody>
        <Center h="300px">
          <Spinner size="xl" color="green.400" />
        </Center>
      </BaseBody>
    );
  }

  return (
    <BaseBody>
      <FilterRestaurant onFilterChange={handleFilterChange} />
      {filteredRestaurants.length === 0 ? (
        <Center h="200px">
          <Text color="gray.500" fontSize="lg">
            No restaurants found
          </Text>
        </Center>
      ) : (
        filteredRestaurants.map(restaurant => (
          <ItemRestaurant
            Id={restaurant.id}
            key={restaurant.id}
            imageUrl={restaurant.image}
            imageAlt={restaurant.name}
            title={restaurant.name}
            reviewCount={restaurant.comments?.length || 0}
            rating={averageComments(restaurant.comments)}
          />
        ))
      )}
    </BaseBody>
  );
};

export default Dashboard;
