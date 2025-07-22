import React from 'react';
import { ChakraProvider, Box, Button, Stack } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FeedbackForm from './components/FeedbackForm';
import FeedbackDashboard from './components/FeedbackDashboard';

const App: React.FC = () => {
  return (
    <ChakraProvider>
      <Router>
        <Box p={4}>
          <Stack direction="row" spacing={4} mb={6}>
            <Button as={Link} to="/" colorScheme="blue">Form</Button>
            <Button as={Link} to="/dashboard" colorScheme="green">Dashboard</Button>
          </Stack>

          <Routes>
            <Route path="/" element={<FeedbackForm />} />
            <Route path="/dashboard" element={<FeedbackDashboard />} />
          </Routes>
        </Box>
      </Router>
    </ChakraProvider>
  );
};

export default App;
