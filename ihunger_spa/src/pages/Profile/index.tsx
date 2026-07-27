import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Input,
  Spinner,
  Center,
  useToast,
  Divider,
  Icon,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { FiUser } from 'react-icons/fi';
import BaseBody from '../../components/BaseBody';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

interface ProfileData {
  name: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  type: string;
}

const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<ProfileData>({
    name: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    type: '',
  });

  useEffect(() => {
    api
      .get('profile')
      .then(response => {
        const data = response.data;
        setProfile({
          name: data.name || user?.data?.userToken?.profile?.name || '',
          lastName: data.lastName || user?.data?.userToken?.profile?.lastName || '',
          email: data.email || user?.data?.userToken?.email || '',
          phoneNumber: data.phoneNumber || '',
          type: data.type || user?.data?.userToken?.profile?.type || '',
        });
      })
      .catch(() => {
        setProfile({
          name: user?.data?.userToken?.profile?.name || '',
          lastName: user?.data?.userToken?.profile?.lastName || '',
          email: user?.data?.userToken?.email || '',
          phoneNumber: '',
          type: user?.data?.userToken?.profile?.type || '',
        });
      })
      .finally(() => setLoading(false));
  }, [user]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put('profile', {
        name: profile.name,
        lastName: profile.lastName,
        email: profile.email,
        phoneNumber: profile.phoneNumber,
      });
      toast({ title: 'Profile updated!', status: 'success', duration: 2000 });
      setEditing(false);
    } catch {
      toast({ title: 'Error updating profile', status: 'error', duration: 3000 });
    } finally {
      setSaving(false);
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
      <VStack
        borderColor="gray.300"
        border="1px"
        borderRadius="30px"
        p={8}
        align="stretch"
        spacing={6}
        w="100%"
        maxW="600px"
        mx="auto"
      >
        <HStack>
          <Icon as={FiUser} boxSize={8} color="green.400" />
          <Text fontSize="2xl" fontWeight="bold">My Profile</Text>
        </HStack>

        <Divider />

        <VStack align="stretch" spacing={4}>
          <Box>
            <Text fontSize="sm" color="gray.500" mb={1}>Name</Text>
            {editing ? (
              <Input value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} bg="gray.700" />
            ) : (
              <Text fontSize="lg">{profile.name}</Text>
            )}
          </Box>

          <Box>
            <Text fontSize="sm" color="gray.500" mb={1}>Last Name</Text>
            {editing ? (
              <Input value={profile.lastName} onChange={e => setProfile({ ...profile, lastName: e.target.value })} bg="gray.700" />
            ) : (
              <Text fontSize="lg">{profile.lastName}</Text>
            )}
          </Box>

          <Box>
            <Text fontSize="sm" color="gray.500" mb={1}>Email</Text>
            {editing ? (
              <Input value={profile.email} onChange={e => setProfile({ ...profile, email: e.target.value })} bg="gray.700" />
            ) : (
              <Text fontSize="lg">{profile.email}</Text>
            )}
          </Box>

          <Box>
            <Text fontSize="sm" color="gray.500" mb={1}>Phone</Text>
            {editing ? (
              <Input value={profile.phoneNumber} onChange={e => setProfile({ ...profile, phoneNumber: e.target.value })} bg="gray.700" />
            ) : (
              <Text fontSize="lg">{profile.phoneNumber || 'Not set'}</Text>
            )}
          </Box>

          <Box>
            <Text fontSize="sm" color="gray.500" mb={1}>Account Type</Text>
            <Text fontSize="lg">
              <Box as="span" color="green.400" fontWeight="semibold">
                {profile.type}
              </Box>
            </Text>
          </Box>
        </VStack>

        <HStack justify="flex-end" spacing={3}>
          {editing ? (
            <>
              <Button variant="outline" onClick={() => setEditing(false)}>Cancel</Button>
              <Button colorScheme="green" onClick={handleSave} isLoading={saving}>Save</Button>
            </>
          ) : (
            <Button colorScheme="green" onClick={() => setEditing(true)}>Edit Profile</Button>
          )}
        </HStack>
      </VStack>
    </BaseBody>
  );
};

export default Profile;
