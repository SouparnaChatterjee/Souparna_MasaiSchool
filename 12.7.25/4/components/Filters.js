import React from "react";
import { HStack, Select } from "@chakra-ui/react";

const Filters = () => {
  return (
    <HStack mb={4} spacing={3}>
      <Select placeholder="Outcome">
        <option value="win">Win</option>
        <option value="loss">Loss</option>
        <option value="draw">Draw</option>
      </Select>
      <Select placeholder="Team">
        <option value="team1">Team 1</option>
        <option value="team2">Team 2</option>
      </Select>
    </HStack>
  );
};

export default Filters;
