import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCoffee } from "./redux/coffee/actions";
import CoffeeList from "./components/CoffeeList";
import Sidebar from "./components/Sidebar";
import { Flex, Box, Heading } from "@chakra-ui/react";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCoffee());
  }, [dispatch]);

  return (
    <Flex p={5}>
      <Box w="20%">
        <Sidebar />
      </Box>
      <Box w="80%">
        <Heading mb={5}>Coffee List</Heading>
        <CoffeeList />
      </Box>
    </Flex>
  );
}

export default App;
