
import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Spinner, SimpleGrid, Heading, Text } from '@chakra-ui/react';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';

const Home = () => {
  const { data, loading, error } = useSelector(state => state.movies);

  return (
    <Box p={6}>
      <SearchBar />
      {loading ? (
        <Spinner size="xl" />
      ) : error ? (
        <Text color="red.500">{error}</Text>
      ) : (
        <>
          <Heading mb={4}>Search Results</Heading>
          <SimpleGrid columns={[1, 2, 3]} spacing={6}>
            {data.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </SimpleGrid>
        </>
      )}
    </Box>
  );
};

export default Home;
