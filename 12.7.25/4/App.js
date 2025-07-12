import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMatches } from "./redux/actions";
import { Box, Heading, Spinner, Alert } from "@chakra-ui/react";
import MatchCard from "./components/MatchCard";
import SearchBar from "./components/SearchBar";
import Filters from "./components/Filters";
import Favorites from "./components/Favorites";

const App = () => {
  const dispatch = useDispatch();
  const { isLoading, isError, footballMatches } = useSelector(state => state);

  useEffect(() => {
    dispatch(fetchMatches());
  }, [dispatch]);

  return (
    <Box p={5}>
      <Heading mb={5}>⚽ Football Matches Tracker</Heading>
      <SearchBar />
      <Filters />
      <Favorites />

      {isLoading && <Spinner size="xl" />}
      {isError && <Alert status="error">Failed to load matches.</Alert>}

      {footballMatches.map(match => (
        <MatchCard key={match.match_id || match.fifa_id || JSON.stringify(match)} match={match} />
      ))}
    </Box>
  );
};

export default App;
