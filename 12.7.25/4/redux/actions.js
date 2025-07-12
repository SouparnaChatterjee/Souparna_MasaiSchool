export const FETCH_MATCHES_REQUEST = "FETCH_MATCHES_REQUEST";
export const FETCH_MATCHES_SUCCESS = "FETCH_MATCHES_SUCCESS";
export const FETCH_MATCHES_FAILURE = "FETCH_MATCHES_FAILURE";
export const TOGGLE_FAVORITE = "TOGGLE_FAVORITE";

export const fetchMatches = () => async (dispatch) => {
  dispatch({ type: FETCH_MATCHES_REQUEST });
  try {
    const response = await fetch("https://jsonmock.hackerrank.com/api/football_matches?page=2");
    const data = await response.json();
    dispatch({ type: FETCH_MATCHES_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: FETCH_MATCHES_FAILURE });
  }
};

export const toggleFavorite = (matchId) => ({
  type: TOGGLE_FAVORITE,
  payload: matchId
});
