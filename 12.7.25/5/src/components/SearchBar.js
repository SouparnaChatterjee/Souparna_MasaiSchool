
import React, { useState, useEffect } from 'react';
import { Input, Box } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { fetchMovies } from '../redux/movieSlice';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query.trim()) {
        dispatch(fetchMovies(query));
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [query, dispatch]);

  return (
    <Box w="100%" maxW="600px" mx="auto" mb={6}>
      <Input
        placeholder="Search for a show..."
        size="lg"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        borderColor="gray.400"
      />
    </Box>
  );
};

export default SearchBar;
