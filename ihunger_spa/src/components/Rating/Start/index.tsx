/* eslint-disable react/no-array-index-key */
import { StarIcon } from '@chakra-ui/icons';
import React from 'react';

interface propsStarts {
  rating: number;
}

const Start: React.FC<propsStarts> = ({ rating }: propsStarts) => {
  return (
    <>
      {Array(5)
        .fill('')
        .map((_, i) => (
          <StarIcon key={i} color={i < rating ? 'yellow' : 'gray.300'} />
        ))}
    </>
  );
};

export default Start;
