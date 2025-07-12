import React from 'react';
import {
  HStack, Text, Button, Checkbox
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { deleteTodo, toggleTodo } from '../redux/actions';

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();

  return (
    <HStack w="100%" justify="space-between">
      <Checkbox
        isChecked={todo.status}
        onChange={() => dispatch(toggleTodo(todo.id))}
      >
        <Text as={todo.status ? 'del' : ''}>{todo.title}</Text>
      </Checkbox>
      <Button size="sm" colorScheme="red" onClick={() => dispatch(deleteTodo(todo.id))}>
        Delete
      </Button>
    </HStack>
  );
};

export default TodoItem;
