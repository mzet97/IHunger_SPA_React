import {
  Box,
  VStack,
  HStack,
  Text,
  Image,
  Button,
  Divider,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useToast,
  Center,
  Icon,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FiTrash2, FiShoppingBag } from 'react-icons/fi';
import BaseBody from '../../components/BaseBody';
import { useCart } from '../../hooks/cart';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

const Cart: React.FC = () => {
  const { items, total, updateQuantity, removeItem, clearCart } = useCart();
  const { user } = useAuth();
  const history = useHistory();
  const toast = useToast();
  const [submitting, setSubmitting] = useState(false);

  const handleCheckout = async () => {
    if (items.length === 0) return;

    setSubmitting(true);
    try {
      const orderItems = items.map(item => ({
        idProduct: item.idProduct,
        quantity: item.quantity,
      }));

      await api.post('orders', {
        idProfileUser: user?.data?.userToken?.id || null,
        orderStatus: 'WaitingForPayment',
        items: orderItems,
      });

      clearCart();
      toast({
        title: 'Order placed!',
        description: 'Your order has been successfully placed.',
        status: 'success',
        duration: 3000,
      });
      history.push('/orders');
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to place order. Please try again.',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <BaseBody>
        <Center h="400px" flexDirection="column">
          <Icon as={FiShoppingBag} boxSize={16} color="gray.500" mb={4} />
          <Text fontSize="xl" color="gray.500">
            Your cart is empty
          </Text>
          <Button
            mt={4}
            colorScheme="green"
            onClick={() => history.push('/dashboard')}
          >
            Browse Restaurants
          </Button>
        </Center>
      </BaseBody>
    );
  }

  return (
    <BaseBody>
      <VStack
        borderColor="gray.300"
        border="1px"
        borderRadius="30px"
        p={6}
        align="stretch"
        spacing={4}
        w="100%"
      >
        <Text fontSize="2xl" fontWeight="bold">
          Your Cart
        </Text>

        {items.map(item => (
          <HStack
            key={item.idProduct}
            p={4}
            bg="gray.700"
            borderRadius="lg"
            justify="space-between"
          >
            <HStack spacing={4}>
              <Image
                boxSize="60px"
                src={item.image}
                alt={item.name}
                objectFit="cover"
                borderRadius="full"
              />
              <VStack align="start" spacing={0}>
                <Text fontWeight="semibold">{item.name}</Text>
                <Text color="green.400" fontSize="sm">
                  R$ {item.price.toFixed(2)}
                </Text>
              </VStack>
            </HStack>

            <HStack spacing={4}>
              <NumberInput
                size="sm"
                w="70px"
                min={1}
                max={99}
                value={item.quantity}
                onChange={(_, val) =>
                  updateQuantity(item.idProduct, val || 1)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <Text fontWeight="bold" w="80px" textAlign="right">
                R$ {(item.price * item.quantity).toFixed(2)}
              </Text>
              <Icon
                as={FiTrash2}
                color="red.400"
                cursor="pointer"
                _hover={{ color: 'red.600' }}
                onClick={() => removeItem(item.idProduct)}
              />
            </HStack>
          </HStack>
        ))}

        <Divider />

        <HStack justify="space-between" px={4}>
          <Text fontSize="lg" fontWeight="bold">
            Total
          </Text>
          <Text fontSize="lg" fontWeight="bold" color="green.400">
            R$ {total.toFixed(2)}
          </Text>
        </HStack>

        <HStack justify="space-between" px={4}>
          <Button variant="outline" colorScheme="red" onClick={clearCart}>
            Clear Cart
          </Button>
          <Button
            colorScheme="green"
            size="lg"
            onClick={handleCheckout}
            isLoading={submitting}
          >
            Place Order
          </Button>
        </HStack>
      </VStack>
    </BaseBody>
  );
};

export default Cart;
