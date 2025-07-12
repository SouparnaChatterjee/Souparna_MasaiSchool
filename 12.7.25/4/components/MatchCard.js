import React from "react";
import { Box, Text, Button, Stack } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../redux/actions";

const MatchCard = ({ match }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites);
  const isFav = favorites.includes(match.match_id || match.fifa_id);

  return (
    <Box p={4} borderWidth="1px" borderRadius="md" mb={3}>
      <Stack spacing={2}>
        <Text fontWeight="bold">{match.team1} vs {match.team2}</Text>
        <Text>Venue: {match.venue}</Text>
        <Text>Date: {match.date}</Text>
        <Text>Score: {match.team1goals} - {match.team2goals}</Text>
        <Button size="sm" colorScheme={isFav ? "red" : "teal"} onClick={() => dispatch(toggleFavorite(match.match_id || match.fifa_id))}>
          {isFav ? "Remove Favorite" : "Add to Favorites"}
        </Button>
      </Stack>
    </Box>
  );
};

export default MatchCard;
