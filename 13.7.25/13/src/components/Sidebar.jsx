import { Button, VStack } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { getCoffee } from "../redux/coffee/actions";

const Sidebar = () => {
  const dispatch = useDispatch();

  const handleSort = (order) => {
    dispatch(getCoffee(order));
  };

  return (
    <VStack spacing={4} align="stretch">
      <Button colorScheme="teal" onClick={() => handleSort("asc")}>
        Sort by Price (Low to High)
      </Button>
      <Button colorScheme="teal" onClick={() => handleSort("desc")}>
        Sort by Price (High to Low)
      </Button>
    </VStack>
  );
};

export default Sidebar;
