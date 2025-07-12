import React from "react";
import { useSelector } from "react-redux";
import { Box, Heading } from "@chakra-ui/react";

const Favorites = () => {
  const { footballMatches, favorites } = useSelector(state => state);
  const favMatches = footballMatches.filter(m => favorites.includes(m.match_id || m.fifa_id));

  if (favMatches.length === 0) return null;

  return (
    <Box mb={6}>
      <Heading size="md" mb={2}>⭐ Favorites</Heading>
      {favMatches.map(match => (
        <Box key={match.match_id || match.fifa_id} p={2} borderBottom="1px solid gray">
          {match.team1} vs {match.team2} | {match.date}
        </Box>
      ))}
    </Box>
  );
};

export default Favorites;
