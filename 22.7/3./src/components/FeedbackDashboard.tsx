import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { Bar } from 'react-chartjs-2';
import {
  Heading,
  Input,
  Stack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale);

const FeedbackDashboard: React.FC = () => {
  const entries = useSelector((state: RootState) => state.feedback.entries);
  const [filter, setFilter] = useState('');

  const filteredEntries = entries.filter(entry =>
    entry.rating.toString().includes(filter)
  );

  const ratingCounts = [1, 2, 3, 4, 5].map(
    r => entries.filter(e => e.rating === r).length
  );

  return (
    <Stack maxW="800px" mx="auto" mt="8" spacing={6}>
      <Heading>Feedback Dashboard</Heading>

      <Input
        placeholder="Filter by rating"
        value={filter}
        onChange={e => setFilter(e.target.value)}
      />

      <Bar
        data={{
          labels: ['1', '2', '3', '4', '5'],
          datasets: [
            {
              label: 'Rating Count',
              data: ratingCounts,
              backgroundColor: '#3182ce',
            },
          ],
        }}
      />

      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Rating</Th>
              <Th>Date</Th>
              <Th>Feedback</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredEntries.map(entry => (
              <Tr key={entry.id}>
                <Td>{entry.name}</Td>
                <Td>{entry.email}</Td>
                <Td>{entry.rating}</Td>
                <Td>{new Date(entry.date).toLocaleDateString()}</Td>
                <Td>{entry.feedback}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default FeedbackDashboard;
