import React from 'react';
import { HamburgerIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Center,
  Grid,
  Text,
  Image,
  useDisclosure,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  HStack,
  VStack,
  Icon,
  Badge,
} from '@chakra-ui/react';

import { BiExit } from 'react-icons/bi';
import { FiShoppingCart } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import DrawerCustom from '../Drawer';
import imgLogo from '../../assets/img/IHunger_logo.png';
import { useAuth } from '../../hooks/auth';
import { useCart } from '../../hooks/cart';
import { getDayFull } from '../../utils/dateHalper';

const Navbar: React.FC = () => {
  const { user, signOut } = useAuth();
  const { total, itemCount } = useCart();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();

  const exit = () => {
    signOut();
    history.push('/');
  };

  function getUserEmail(): string {
    if (user && user.data && user.data.userToken && user.data.userToken.email) {
      return user.data.userToken.email;
    }
    return '';
  }

  return (
    <>
      <Grid
        templateColumns="repeat(3, 1fr)"
        gap={6}
        borderBottom="1px"
        borderBottomColor="gray.00"
        justifyContent="center"
        alignContent="center"
      >
        <Box w="70px" h="70px" ml="20px" mt="10px">
          <Button
            colorScheme="nome"
            onClick={onOpen}
            m="20%"
            border="1px"
            borderColor="gray.100"
            w="100%"
            h="100%"
          >
            <HamburgerIcon color="gray.100" w="100%" h="100%" />
          </Button>
          <DrawerCustom isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
        </Box>
        <Center mt="10px" w="250px" h="100px" ml="20%">
          <Image
            boxSize="100%"
            w="100%"
            h="100%"
            objectFit="cover"
            src={imgLogo}
            alt="IHunger"
          />
        </Center>
        <HStack spacing="10%">
          <VStack>
            <Text fontSize="xl">User: {getUserEmail()}</Text>
          </VStack>
          <VStack cursor="pointer" onClick={() => history.push('/cart')}>
            <Stat>
              <StatLabel>Cart</StatLabel>
              <StatNumber color="green.400">
                <HStack>
                  <Icon as={FiShoppingCart} />
                  <Text>R$ {total.toFixed(2)}</Text>
                </HStack>
              </StatNumber>
              <StatHelpText>
                {itemCount} {itemCount === 1 ? 'item' : 'items'}
              </StatHelpText>
            </Stat>
          </VStack>
          <Box mr="10%">
            <Button
              rightIcon={<BiExit size="24px" />}
              colorScheme="yellow"
              variant="solid"
              mt="10%"
              mb="10%"
              onClick={exit}
              align="left"
            >
              <Text size="24px">Exit</Text>
            </Button>
          </Box>
        </HStack>
      </Grid>
    </>
  );
};

export default Navbar;
