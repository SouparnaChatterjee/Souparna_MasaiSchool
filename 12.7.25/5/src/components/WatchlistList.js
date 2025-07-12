
import React from 'react';
import { useSelector } from 'react-redux';
import { SimpleGrid, Heading, Text } from '@chakra-ui/react';
import MovieCard from './MovieCard';

const WatchlistList = () => {
  const watchlist = useSelector(state => state.watchlist);

  return (
    <>
      <Heading mb={4}>Your Watchlist</Heading>
      {watchlist.length === 0 ? (
        <Text>No movies added yet.</Text>
      ) : (
        <SimpleGrid columns={[1, 2, 3]} spacing={6}>
          {watchlist.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </SimpleGrid>
      )}
    </>
  );
};

export default WatchlistList;
