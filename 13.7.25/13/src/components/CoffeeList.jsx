import { useSelector } from "react-redux";
import { Grid, Box, Text, Spinner } from "@chakra-ui/react";

const CoffeeList = () => {
  const { data, loading, error } = useSelector((state) => state.coffee);

  if (loading) return <Spinner size="xl" />;
  if (error) return <Text>Error fetching coffee data</Text>;

  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={4}>
      {data.map((item) => (
        <Box key={item.id} border="1px solid #ccc" p={4} borderRadius="md">
          <Text fontWeight="bold">{item.title}</Text>
          <Text>Price: ₹{item.price}</Text>
          <Text>Type: {item.type}</Text>
        </Box>
      ))}
    </Grid>
  );
};

export default CoffeeList;
