import React, { useState } from 'react';
import { Button, Input, Textarea, Stack, Heading, useToast } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { addFeedback } from '../features/feedback/feedbackSlice';
import { v4 as uuidv4 } from 'uuid';

const FeedbackForm: React.FC = () => {
  const dispatch = useDispatch();
  const toast = useToast();

  const [form, setForm] = useState({
    name: '',
    email: '',
    rating: 0,
    feedback: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === 'rating' ? Number(value) : value,
    }));
  };

  const handleSubmit = () => {
    const { name, email, rating, feedback } = form;

    if (!name || !email || !rating || !feedback) {
      toast({
        title: 'Validation Error',
        description: 'All fields are required.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    dispatch(
      addFeedback({
        ...form,
        id: uuidv4(),
        date: new Date().toISOString(),
      })
    );

    toast({
      title: 'Feedback Submitted',
      status: 'success',
      duration: 2000,
    });

    setForm({ name: '', email: '', rating: 0, feedback: '' });
  };

  return (
    <Stack spacing={4} maxW="500px" mx="auto" mt="8">
      <Heading>Submit Feedback</Heading>
      <Input placeholder="Name" name="name" value={form.name} onChange={handleChange} />
      <Input placeholder="Email" name="email" value={form.email} onChange={handleChange} />
      <Input placeholder="Rating (1-5)" name="rating" type="number" value={form.rating || ''} onChange={handleChange} />
      <Textarea placeholder="Your Feedback" name="feedback" value={form.feedback} onChange={handleChange} />
      <Button colorScheme="teal" onClick={handleSubmit}>Submit</Button>
    </Stack>
  );
};

export default FeedbackForm;
