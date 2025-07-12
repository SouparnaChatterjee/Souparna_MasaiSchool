import React from 'react';
import { useDispatch } from 'react-redux';
import {
  Box, Input, Select, Stack
} from '@chakra-ui/react';
import { setFilter } from '../redux/actions/bookActions';

const Filters = () => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(setFilter({ [e.target.name]: e.target.value }));
  };

  return (
    <Box mb={6}>
      <Stack spacing={2} direction={{ base: 'column', md: 'row' }}>
        <Input name="author" placeholder="Filter by Author" onChange={handleChange} />
        <Input name="genre" placeholder="Filter by Genre" onChange={handleChange} />
        <Select name="status" placeholder="Filter by Status" onChange={handleChange}>
          <option value="read">Read</option>
          <option value="unread">Unread</option>
        </Select>
      </Stack>
    </Box>
  );
};

export default Filters;
