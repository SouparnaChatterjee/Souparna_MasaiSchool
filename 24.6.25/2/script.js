const API_KEY = "b388dd22";
const searchBox = document.getElementById("search");
const resultsDiv = document.getElementById("results");

let timeoutId;

searchBox.addEventListener("input", () => {
  clearTimeout(timeoutId);

  timeoutId = setTimeout(() => {
    const query = searchBox.value.trim();

    if (query !== "") {
      fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`)
        .then((res) => res.json())
        .then((data) => {
          resultsDiv.innerHTML = "";

          if (data.Search) {
            data.Search.forEach((movie) => {
              const title = document.createElement("div");
              title.className = "movie-title";
              title.textContent = movie.Title;
              resultsDiv.appendChild(title);
            });
          } else {
            resultsDiv.innerHTML = `<p>No results found</p>`;
          }
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
        });
    } else {
      resultsDiv.innerHTML = "";
    }
  }, 500); // 500ms debounce
});
