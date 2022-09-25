/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-children-prop */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react';

import api from '../../services/api';

import pizzaImg from '../../assets/img/pizza.jpg';
import FilterRestaurant from '../../components/Filter/FilterRestaurant';
import ItemRestaurant from '../../components/List/Item/ItemRestaurant';
import Restaurant from '../../models/Restaurant/Restaurant';
import Comment from '../../models/Restaurant/Comment';
import BaseBody from '../../components/BaseBody';

const Dashboard: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    api.get<Restaurant[]>(`restaurants`).then(response => {
      setRestaurants(response.data);
    });
  }, []);

  const averageComments = (comments: Comment[]) => {
    if (!comments) return 0;
    if (comments.length === 0) return 0;

    return comments
      .map(comment => comment.starts)
      .reduce((num1, num2) => num1 + num2);
  };

  return (
    <>
      <BaseBody>
        <FilterRestaurant />
        {restaurants.map(restaurant => (
          <ItemRestaurant
            Id={restaurant.id}
            key={restaurant.id}
            imageUrl={restaurant.image}
            imageAlt={restaurant.name}
            title={restaurant.name}
            reviewCount={restaurant.comments.length}
            rating={averageComments(restaurant.comments)}
          />
        ))}
      </BaseBody>
    </>
  );
};

export default Dashboard;
