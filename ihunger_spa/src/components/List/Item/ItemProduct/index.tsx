import { Box, HStack, Image, VStack, Text, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import { MinusIcon, AddIcon } from '@chakra-ui/icons';
import { useCart } from '../../../../hooks/cart';

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
  const [itemsCount, setItemsCount] = useState(0);
  const { addItem } = useCart();
  const toast = useToast();

  const addItems = () => {
    setItemsCount(itemsCount + 1);
  };

  const removeItems = () => {
    if (itemsCount > 0) {
      setItemsCount(itemsCount - 1);
    }
  };

  const handleAddToCart = () => {
    if (itemsCount === 0) return;

    addItem({
      idProduct: Id,
      name,
      price,
      quantity: itemsCount,
      image,
    });

    toast({
      title: 'Added to cart',
      description: `${itemsCount}x ${name} added to your cart`,
      status: 'success',
      duration: 2000,
      isClosable: true,
    });

    setItemsCount(0);
  };

  return (
    <Box
      w="100%"
      h="150px"
      borderWidth="1px"
      borderRadius="30px"
      overflow="hidden"
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
              <Box as="span" ml="2" color="green.400" fontWeight="bold" fontSize="md">
                R$ {price.toFixed(2)}
              </Box>
            </Box>
          </Box>
        </VStack>
        <Box justifyContent="center" alignItems="center" ml="30px">
          {itemsCount === 0 && (
            <AddIcon
              ml="30px"
              boxSize={5}
              cursor="pointer"
              color="green.400"
              _hover={{ color: 'green.600' }}
              onClick={addItems}
            />
          )}
          {itemsCount > 0 && (
            <HStack w="100%" h="100%" ml="30px" spacing={3}>
              <MinusIcon
                boxSize={4}
                cursor="pointer"
                color="red.400"
                _hover={{ color: 'red.600' }}
                onClick={removeItems}
              />
              <Text fontSize="22px" fontWeight="bold">
                {itemsCount}
              </Text>
              <AddIcon
                boxSize={4}
                cursor="pointer"
                color="green.400"
                _hover={{ color: 'green.600' }}
                onClick={addItems}
              />
              <Box
                as="button"
                bg="green.500"
                color="white"
                px={3}
                py={1}
                borderRadius="md"
                fontSize="sm"
                cursor="pointer"
                _hover={{ bg: 'green.600' }}
                onClick={handleAddToCart}
              >
                Add
              </Box>
            </HStack>
          )}
        </Box>
      </HStack>
    </Box>
  );
};

export default ItemProduct;
