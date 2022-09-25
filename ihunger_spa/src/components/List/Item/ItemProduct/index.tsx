/* eslint-disable react/no-array-index-key */
import { Box, HStack, Image } from '@chakra-ui/react';
import React from 'react';
import { useHistory } from 'react-router-dom';
import Start from '../../../Rating/Start';

interface property {
  Id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

const ItemProduct: React.FC<property> = ({
  Id,
  name,
  description,
  price,
  image,
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
      onClick={() => {
        console.log('1');
      }}
    >
      <HStack>
        <Image boxSize="150px" src={image} alt={name} />

        <Box p="6">
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            {name}
          </Box>
          <Box d="flex" mt="2" alignItems="center">
            <Box as="span" ml="2" color="gray.600" fontSize="sm">
              {description}
            </Box>
          </Box>
          <Box d="flex" mt="2" alignItems="center">
            <Box as="span" ml="2" color="gray.600" fontSize="sm" />
            R$ {price}
          </Box>
        </Box>
      </HStack>
    </Box>
  );
};

export default ItemProduct;
