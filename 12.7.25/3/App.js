import React from 'react';
import { Container, Heading } from '@chakra-ui/react';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import Filters from './components/Filters';

const App = () => {
  return (
    <Container maxW="container.md" mt={6}>
      <Heading textAlign="center" mb={6}>📚 Redux Book Store</Heading>
      <BookForm />
      <Filters />
      <BookList />
    </Container>
  );
};

export default App;
