/* eslint-disable react/no-array-index-key */
import { Box, HStack, Image } from '@chakra-ui/react';
import React from 'react';
import { useHistory } from 'react-router-dom';
import Start from '../../../Rating/Start';

interface property {
  Id: string;
  imageUrl: string;
  imageAlt: string;
  title: string;
  reviewCount: number;
  rating: number;
}

const ItemRestaurant: React.FC<property> = ({
  Id,
  imageUrl,
  imageAlt,
  title,
  reviewCount,
  rating,
}: property) => {
  const history = useHistory();

  const toRestaurant = (id: string) => {
    history.push('/restaurant', { params: id });
  };

  return (
    <Box
      w="100%"
      h="150px"
      borderWidth="1px"
      borderRadius="30px"
      overflow="hidden"
      onClick={() => toRestaurant(Id)}
    >
      <HStack>
        <Image boxSize="150px" src={imageUrl} alt={imageAlt} />

        <Box p="6">
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            {title}
          </Box>
          <Box d="flex" mt="2" alignItems="center">
            <Start rating={rating} />
            <Box as="span" ml="2" color="gray.600" fontSize="sm">
              {reviewCount} reviews
            </Box>
          </Box>
        </Box>
      </HStack>
    </Box>
  );
};

export default ItemRestaurant;
