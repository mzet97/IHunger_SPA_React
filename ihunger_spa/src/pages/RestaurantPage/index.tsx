import { Box, Grid, HStack, SimpleGrid, VStack, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import BaseBody from '../../components/BaseBody';
import ItemProduct from '../../components/List/Item/ItemProduct';
import Product from '../../models/Product/Product';
import Restaurant from '../../models/Restaurant/Restaurant';
import api from '../../services/api';

const RestaurantPage: React.FC = () => {
  const [restaurant, setRestaurant] = useState<Restaurant>();
  const [products, setProduct] = useState<Product[]>([]);
  const location = useLocation();
  const id = location.state.params;

  useEffect(() => {
    api.get<Restaurant>(`restaurants/${id}`).then(responseRestaurant => {
      setRestaurant(responseRestaurant.data);
      console.log(responseRestaurant.data);

      api.get<Product[]>(`restaurants/${id}/products`).then(responsProduct => {
        console.log(responsProduct.data);
        setProduct(responsProduct.data);
      });
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
        <VStack
          borderColor="gray.300"
          border="1px"
          borderRadius="30px"
          h="100%"
          w="100%"
        >
          {products.map(product => (
            <ItemProduct
              Id={product.id}
              key={product.id}
              image={product.image}
              name={product.name}
              description={product.description}
              price={product.price}
            />
          ))}
        </VStack>
      </BaseBody>
    </>
  );
};

export default RestaurantPage;
