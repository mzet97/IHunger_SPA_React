/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Center,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Image,
  DrawerCloseButton,
  DrawerBody,
  VStack,
  Button,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { BiChevronRightCircle } from 'react-icons/bi';
import { useHistory } from 'react-router-dom';

import imgLogo from '../../assets/img/IHunger_logo.png';

interface DrawerCustomProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const DrawerCustom: React.FC<DrawerCustomProps> = ({
  isOpen,
  onOpen,
  onClose,
}: DrawerCustomProps) => {
  const history = useHistory();

  const toHome = () => {
    history.push('/dashboard');
  };

  const toProfile = () => {
    history.push('/profile');
  };

  const toOrders = () => {
    history.push('/orders');
  };

  return (
    <>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent bg="gray.800">
          <DrawerCloseButton bg="red" />
          <DrawerHeader borderBottomWidth="1px">
            <Center>
              <Image
                boxSize="150px"
                objectFit="cover"
                src={imgLogo}
                alt="IHunger"
              />
            </Center>
          </DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="right">
              <Button
                rightIcon={<BiChevronRightCircle size="24px" />}
                colorScheme="green"
                variant="solid"
                mt="10px"
                onClick={toHome}
              >
                <Text size="24px">Home</Text>
              </Button>
              <Button
                rightIcon={<BiChevronRightCircle size="24px" />}
                colorScheme="green"
                variant="solid"
                mt="10px"
                onClick={toOrders}
              >
                <Text size="24px">Orders</Text>
              </Button>
              <Button
                rightIcon={<BiChevronRightCircle size="24px" />}
                colorScheme="green"
                variant="solid"
                mt="10px"
                onClick={toProfile}
              >
                <Text size="24px">Profile</Text>
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DrawerCustom;
