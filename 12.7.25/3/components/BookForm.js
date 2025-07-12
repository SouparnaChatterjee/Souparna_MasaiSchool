import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Box, Button, Input, Stack
} from '@chakra-ui/react';
import { addBook } from '../redux/actions/bookActions';

const BookForm = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    title: '', author: '', genre: ''
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    if (form.title && form.author && form.genre) {
      dispatch(addBook(form));
      setForm({ title: '', author: '', genre: '' });
    }
  };

  return (
    <Box mb={4}>
      <Stack spacing={2}>
        <Input name="title" placeholder="Title" value={form.title} onChange={handleChange} />
        <Input name="author" placeholder="Author" value={form.author} onChange={handleChange} />
        <Input name="genre" placeholder="Genre" value={form.genre} onChange={handleChange} />
        <Button colorScheme="teal" onClick={handleSubmit}>Add Book</Button>
      </Stack>
    </Box>
  );
};

export default BookForm;
