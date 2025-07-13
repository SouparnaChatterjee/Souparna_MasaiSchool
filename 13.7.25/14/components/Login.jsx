import React, { useState } from 'react';
import { Box, Input, Button, Heading, VStack } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LOGIN_FAILURE, LOGIN_SUCCESS } from '../redux/actionTypes';

const Login = () => {
  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("cityslicka");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    axios.post("https://reqres.in/api/login", { email, password })
      .then(res => {
        dispatch({ type: LOGIN_SUCCESS, payload: res.data.token });
        navigate("/quiz");
      })
      .catch(err => {
        dispatch({ type: LOGIN_FAILURE, payload: err.message });
        alert("Login failed!");
      });
  };

  return (
    <VStack spacing={4} mt={20}>
      <Heading>Login</Heading>
      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        w="300px"
      />
      <Input
        placeholder="Password"
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        w="300px"
      />
      <Button colorScheme="teal" onClick={handleLogin}>
        Login
      </Button>
    </VStack>
  );
};

export default Login;
