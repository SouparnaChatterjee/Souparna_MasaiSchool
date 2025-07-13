import React from 'react';
import {
  Box,
  Card,
  CardBody,
  Avatar,
  Heading,
  Text,
  Button,
  Stack,
  HStack,
  Badge,
  Divider,
  useColorModeValue,
  Icon,
  VStack
} from '@chakra-ui/react';
import { FaMusic, FaCamera, FaPalette, FaEnvelope, FaUserPlus } from 'react-icons/fa';

const ProfileCard = () => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const badgeScheme = useColorModeValue('teal', 'blue');

  return (
    <Card
      maxW="sm"
      bg={cardBg}
      boxShadow="2xl"
      borderRadius="xl"
      overflow="hidden"
      transition="all 0.3s ease"
      _hover={{
        transform: 'translateY(-8px)',
        boxShadow: '3xl',
      }}
    >
      <CardBody p={8}>
        <VStack spacing={6}>
          {/* Profile Image with Online Status */}
          <Box position="relative">
            <Avatar
              size="2xl"
              name="Lindsey James"
              src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
              border="4px solid"
              borderColor="white"
              boxShadow="lg"
            />
            <Box
              position="absolute"
              bottom={2}
              right={2}
              w={6}
              h={6}
              bg="green.400"
              borderRadius="full"
              border="3px solid white"
              boxShadow="md"
            />
          </Box>

          {/* Profile Information */}
          <VStack spacing={2}>
            <Heading size="lg" color="gray.700">
              Lindsey James
            </Heading>
            <Text color={textColor} fontWeight="medium">
              @lindsey_jam3s
            </Text>
            <Text 
              color={textColor} 
              textAlign="center" 
              fontSize="md"
              lineHeight="tall"
            >
              Actress, musician, songwriter and artist. PM for work inquires or{' '}
              <Text as="span" color="blue.500" fontWeight="semibold">
                #tag
              </Text>{' '}
              me in your posts
            </Text>
          </VStack>

          {/* Skills/Interests Tags */}
          <HStack spacing={3} flexWrap="wrap" justify="center">
            <Badge
              colorScheme={badgeScheme}
              px={3}
              py={1}
              borderRadius="full"
              fontSize="sm"
              fontWeight="bold"
              leftIcon={<Icon as={FaPalette} />}
            >
              <HStack spacing={1}>
                <Icon as={FaPalette} />
                <Text>ART</Text>
              </HStack>
            </Badge>
            <Badge
              colorScheme="purple"
              px={3}
              py={1}
              borderRadius="full"
              fontSize="sm"
              fontWeight="bold"
            >
              <HStack spacing={1}>
                <Icon as={FaCamera} />
                <Text>PHOTOGRAPHY</Text>
              </HStack>
            </Badge>
            <Badge
              colorScheme="pink"
              px={3}
              py={1}
              borderRadius="full"
              fontSize="sm"
              fontWeight="bold"
            >
              <HStack spacing={1}>
                <Icon as={FaMusic} />
                <Text>MUSIC</Text>
              </HStack>
            </Badge>
          </HStack>

          <Divider />

          {/* Action Buttons */}
          <HStack spacing={4} w="full">
            <Button
              leftIcon={<FaEnvelope />}
              colorScheme="gray"
              variant="outline"
              size="md"
              borderRadius="full"
              flex={1}
              _hover={{
                bg: 'gray.50',
                transform: 'translateY(-2px)',
              }}
            >
              Message
            </Button>
            <Button
              leftIcon={<FaUserPlus />}
              colorScheme="blue"
              size="md"
              borderRadius="full"
              flex={1}
              _hover={{
                bg: 'blue.600',
                transform: 'translateY(-2px)',
              }}
            >
              Follow
            </Button>
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default ProfileCard;
