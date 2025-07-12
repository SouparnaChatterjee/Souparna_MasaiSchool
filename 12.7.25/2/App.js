import React, { useState } from 'react';
import {
  Box, Button, Input, VStack, Heading
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo } from './redux/actions';
import TodoItem from './components/TodoItem';

const App = () => {
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos);

  const handleAdd = () => {
    if (title.trim()) {
      dispatch(addTodo(title));
      setTitle('');
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={5} shadow="md" borderWidth="1px">
      <Heading mb={4}>Redux Todo App</Heading>
      <VStack spacing={4}>
        <Input
          placeholder="Enter todo..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button colorScheme="teal" onClick={handleAdd}>Add Todo</Button>

        {todos.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </VStack>
    </Box>
  );
};

export default App;
