import React, { useState } from "react";
import { Input } from "@chakra-ui/react";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  // This can later be connected to filter/search logic

  return (
    <Input
      placeholder="Search by team, venue or date..."
      mb={4}
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
};

export default SearchBar;
