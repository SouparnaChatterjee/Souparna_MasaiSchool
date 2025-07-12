import React from 'react';
import { useSelector } from 'react-redux';
import { VStack } from '@chakra-ui/react';
import BookItem from './BookItem';

const BookList = () => {
  const books = useSelector((state) => state.books);
  const { author, genre, status } = useSelector((state) => state.filters);

  const filtered = books.filter((book) => {
    const matchesAuthor = author ? book.author.includes(author) : true;
    const matchesGenre = genre ? book.genre.includes(genre) : true;
    const matchesStatus =
      status === 'read' ? book.isRead :
      status === 'unread' ? !book.isRead : true;

    return matchesAuthor && matchesGenre && matchesStatus;
  });

  return (
    <VStack spacing={4} mt={4}>
      {filtered.map((book) => (
        <BookItem key={book.id} book={book} />
      ))}
    </VStack>
  );
};

export default BookList;
