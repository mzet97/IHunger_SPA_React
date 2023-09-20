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
} from '@chakra-ui/react';

import { BiExit } from 'react-icons/bi';
import { useHistory } from 'react-router-dom';
import DrawerCustom from '../Drawer';
import imgLogo from '../../assets/img/IHunger_logo.png';
import { useAuth } from '../../hooks/auth';
import { getDayFull } from '../../utils/dateHalper';

const Navbar: React.FC = () => {
  const { user, signOut } = useAuth();
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
          <VStack>
            <Stat>
              <StatLabel>Total</StatLabel>
              <StatNumber>$0.00</StatNumber>
              <StatHelpText>{getDayFull()}</StatHelpText>
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
