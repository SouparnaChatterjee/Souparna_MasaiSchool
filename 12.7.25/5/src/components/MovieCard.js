// File: src/components/MovieCard.js
import React from 'react';
import {
  Box,
  Image,
  Text,
  Button,
  VStack,
  HStack,
  Badge,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { addToWatchlist, removeFromWatchlist } from '../redux/watchlistSlice';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const watchlist = useSelector(state => state.watchlist);

  const isInWatchlist = watchlist.some(item => item.id === movie.id);

  const handleWatchlist = () => {
    if (isInWatchlist) {
      dispatch(removeFromWatchlist(movie.id));
    } else {
      dispatch(addToWatchlist(movie));
    }
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      w="250px"
      p="4"
      boxShadow="md"
    >
      <Image
        src={movie.image?.medium || 'https://via.placeholder.com/210x295'}
        alt={movie.name}
        mb={3}
        borderRadius="md"
        mx="auto"
      />
      <VStack align="start" spacing={2}>
        <Text fontWeight="bold" fontSize="lg">{movie.name}</Text>
        <HStack>
          {movie.genres.map((genre, idx) => (
            <Badge key={idx} colorScheme="teal">{genre}</Badge>
          ))}
        </HStack>
        <Button colorScheme="blue" size="sm" onClick={() => navigate(`/booking/${movie.id}`)}>
          Book Now
        </Button>
        <Button
          colorScheme={isInWatchlist ? 'red' : 'green'}
          size="sm"
          onClick={handleWatchlist}
        >
          {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
        </Button>
      </VStack>
    </Box>
  );
};

export default MovieCard;
