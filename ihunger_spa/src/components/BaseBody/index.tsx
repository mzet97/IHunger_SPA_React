import { Box, Grid, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import Navbar from '../Navbar';

const BaseBody: React.FC = ({ children }) => {
  return (
    <>
      <Navbar />
      <Grid
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(3, 1fr)"
        gap={6}
      >
        <SimpleGrid columns={1} spacing={5} mt="5%">
          <Box height="10%" w="100%" />
          <Box height="10%" w="100%" />
          <Box height="10%" w="100%" />
          <Box height="10%" w="100%" />
          <Box height="10%" w="100%" />
        </SimpleGrid>
        <SimpleGrid columns={1} spacing={5} mt="5%">
          {children}
        </SimpleGrid>
      </Grid>
    </>
  );
};

export default BaseBody;
