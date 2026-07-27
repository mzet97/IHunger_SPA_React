import {
  Box,
  HStack,
  VStack,
  Text,
  Spinner,
  Center,
  Textarea,
  Button,
  Select,
  useToast,
  Divider,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BaseBody from '../../components/BaseBody';
import ItemProduct from '../../components/List/Item/ItemProduct';
import Start from '../../components/Rating/Start';
import Product from '../../models/Product/Product';
import Restaurant from '../../models/Restaurant/Restaurant';
import api from '../../services/api';

const RestaurantPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [restaurant, setRestaurant] = useState<Restaurant>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState('');
  const [commentRating, setCommentRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);
  const toast = useToast();

  const fetchRestaurant = () => {
    setLoading(true);
    api
      .get<Restaurant>(`restaurants/${id}`)
      .then(response => {
        setRestaurant(response.data);
        return api.get<Product[]>(`restaurants/${id}/products`);
      })
      .then(responseProduct => {
        setProducts(responseProduct.data);
      })
      .catch(() => {
        toast({ title: 'Error loading restaurant', status: 'error', duration: 3000 });
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchRestaurant();
  }, [id]);

  const handleSubmitComment = async () => {
    if (!commentText.trim()) return;
    setSubmitting(true);
    try {
      await api.post(`restaurants/${id}/comments`, { text: commentText, starts: commentRating });
      toast({ title: 'Review submitted!', status: 'success', duration: 2000 });
      setCommentText('');
      setCommentRating(5);
      fetchRestaurant();
    } catch {
      toast({ title: 'Error submitting review', status: 'error', duration: 3000 });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <BaseBody>
        <Center h="300px"><Spinner size="xl" color="green.400" /></Center>
      </BaseBody>
    );
  }

  return (
    <BaseBody>
      <VStack borderColor="gray.300" border="1px" borderRadius="30px" p={6} align="stretch" spacing={3}>
        <HStack justify="space-between">
          <VStack align="start" spacing={1}>
            <Text fontSize="2xl" fontWeight="bold">{restaurant?.name}</Text>
            <Text color="green.400" fontSize="sm">{restaurant?.categoryRestaurant?.name}</Text>
          </VStack>
          {restaurant?.comments && restaurant.comments.length > 0 && (
            <HStack>
              <Start rating={restaurant.comments.reduce((sum, c) => sum + Number(c.starts), 0) / restaurant.comments.length} />
              <Text color="gray.500" fontSize="sm">({restaurant.comments.length} reviews)</Text>
            </HStack>
          )}
        </HStack>
        <Text color="gray.400">{restaurant?.description}</Text>
        <HStack spacing={4}>
          <Text fontSize="sm">📍 {restaurant?.addressRestaurant?.street}, {restaurant?.addressRestaurant?.city} - {restaurant?.addressRestaurant?.county}</Text>
          <Text fontSize="sm">📮 {restaurant?.addressRestaurant?.zipCode}</Text>
        </HStack>
      </VStack>

      <VStack mt={6} borderColor="gray.300" border="1px" borderRadius="30px" p={6} align="stretch" spacing={4} w="100%">
        <Text fontSize="xl" fontWeight="bold">Menu</Text>
        {products.length === 0 ? (
          <Text color="gray.500" textAlign="center">No products available</Text>
        ) : (
          products.map(product => (
            <ItemProduct Id={product.id} key={product.id} image={product.image} name={product.name} description={product.description} price={product.price} />
          ))
        )}
      </VStack>

      <VStack mt={6} mb={10} borderColor="gray.300" border="1px" borderRadius="30px" p={6} align="stretch" spacing={4} w="100%">
        <Text fontSize="xl" fontWeight="bold">Reviews ({restaurant?.comments?.length || 0})</Text>

        <Box bg="gray.700" p={4} borderRadius="lg">
          <Text mb={2} fontWeight="semibold">Write a Review</Text>
          <HStack mb={3}>
            <Text fontSize="sm">Rating:</Text>
            <Select value={commentRating} onChange={e => setCommentRating(Number(e.target.value))} w="100px" size="sm">
              <option value={5}>5 ⭐</option>
              <option value={4}>4 ⭐</option>
              <option value={3}>3 ⭐</option>
              <option value={2}>2 ⭐</option>
              <option value={1}>1 ⭐</option>
            </Select>
          </HStack>
          <Textarea value={commentText} onChange={e => setCommentText(e.target.value)} placeholder="Share your experience..." mb={3} bg="gray.600" />
          <Button colorScheme="green" onClick={handleSubmitComment} isLoading={submitting} isDisabled={!commentText.trim()}>
            Submit Review
          </Button>
        </Box>

        <Divider />

        {restaurant?.comments && restaurant.comments.length > 0 ? (
          restaurant.comments.map(comment => (
            <Box key={comment.id} p={3} bg="gray.700" borderRadius="lg">
              <HStack mb={1}>
                <Start rating={Number(comment.starts)} />
                <Text fontSize="xs" color="gray.500">{new Date(comment.createdAt).toLocaleDateString()}</Text>
              </HStack>
              <Text fontSize="sm">{comment.text}</Text>
            </Box>
          ))
        ) : (
          <Text color="gray.500" textAlign="center">No reviews yet. Be the first!</Text>
        )}
      </VStack>
    </BaseBody>
  );
};

export default RestaurantPage;
