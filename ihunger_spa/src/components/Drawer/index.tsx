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

  const navigate = (path: string) => {
    history.push(path);
    onClose();
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
                w="100%"
                onClick={() => navigate('/dashboard')}
              >
                <Text size="24px">Home</Text>
              </Button>
              <Button
                rightIcon={<BiChevronRightCircle size="24px" />}
                colorScheme="green"
                variant="solid"
                mt="10px"
                w="100%"
                onClick={() => navigate('/cart')}
              >
                <Text size="24px">Cart</Text>
              </Button>
              <Button
                rightIcon={<BiChevronRightCircle size="24px" />}
                colorScheme="green"
                variant="solid"
                mt="10px"
                w="100%"
                onClick={() => navigate('/orders')}
              >
                <Text size="24px">Orders</Text>
              </Button>
              <Button
                rightIcon={<BiChevronRightCircle size="24px" />}
                colorScheme="green"
                variant="solid"
                mt="10px"
                w="100%"
                onClick={() => navigate('/profile')}
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
