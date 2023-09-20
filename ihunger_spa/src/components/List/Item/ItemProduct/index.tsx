/* eslint-disable react/no-array-index-key */
import { Box, HStack, Image, VStack, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { MinusIcon, AddIcon } from '@chakra-ui/icons';
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
  const [itemsCount, setItemsCount] = useState(0);

  const toRestaurant = (id: string) => {
    history.push('/restaurant', { params: id });
  };

  const addItems = () => {
    setItemsCount(itemsCount + 1);
  };

  const removeItems = () => {
    setItemsCount(itemsCount - 1);
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
      <HStack h="100%" w="100%" justifyContent="start">
        <Image
          ml="20px"
          boxSize="10px"
          w="100px"
          h="100px"
          src={image}
          alt={name}
          objectFit="cover"
          borderRadius="full"
        />
        <VStack>
          <Box>
            <Box
              mt="1"
              ml="15px"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              {name}
            </Box>
            <Box d="flex" mt="2" alignItems="center" ml="10px">
              <Box as="span" ml="2" color="gray.600" fontSize="sm">
                {description}
              </Box>
            </Box>
            <Box d="flex" mt="2" alignItems="center" ml="10px">
              <Box as="span" ml="2" color="gray.600" fontSize="sm" />
              R$ {price}
            </Box>
          </Box>
        </VStack>
        <Box justifyContent="center" alignItems="center" ml="30px">
          {itemsCount === 0 && (
            <AddIcon ml="30px" boxSize={5} onClick={addItems} />
          )}
          {itemsCount > 0 && (
            <HStack w="100%" h="100%" ml="30px">
              <AddIcon Size={5} onClick={addItems} />
              <Text fontSize="22px">{itemsCount}</Text>
              <MinusIcon boxSize={5} onClick={removeItems} />
            </HStack>
          )}
        </Box>
      </HStack>
    </Box>
  );
};

export default ItemProduct;
