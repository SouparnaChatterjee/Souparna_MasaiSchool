import React from 'react';
import { useDispatch } from 'react-redux';
import { Box, Button, Text, Stack } from '@chakra-ui/react';
import { deleteBook, markAsRead } from '../redux/actions/bookActions';

const BookItem = ({ book }) => {
  const dispatch = useDispatch();

  return (
    <Box p={4} borderWidth="1px" borderRadius="md">
      <Stack>
        <Text fontWeight="bold">{book.title}</Text>
        <Text>Author: {book.author}</Text>
        <Text>Genre: {book.genre}</Text>
        <Text>Status: {book.isRead ? "Read" : "Unread"}</Text>
        <Stack direction="row">
          {!book.isRead && (
            <Button size="sm" colorScheme="blue" onClick={() => dispatch(markAsRead(book.id))}>
              Mark as Read
            </Button>
          )}
          <Button size="sm" colorScheme="red" onClick={() => dispatch(deleteBook(book.id))}>
            Delete
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default BookItem;
