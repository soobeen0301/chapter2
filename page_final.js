document.addEventListener("DOMContentLoaded", async () => {
  let movies = [];

  const renderMovies = (movies) => {
    const movielist = document.getElementById("movie-list");
    movielist.innerHTML = ""; // 영화 목록 초기화

    movies.map((movie) => {
      const movieCard = createMoviecard(movie);
      movielist.appendChild(movieCard);
    });
  };

  const createMoviecard = (movie) => {
    const { id, title, overview, vote_average, poster_path } = movie;
    // 새로운 HTML 요소 생성
    const card = document.createElement("div");
    const image = document.createElement("img");
    const titleElement = document.createElement("h3");
    const overviewElement = document.createElement("p");
    const voteaverageElement = document.createElement("p");
    // 각 요소 클래스 이름 지정
    card.className = "moviecard";
    image.className = "image";
    titleElement.className = "title";
    overviewElement.className = "overview";
    voteaverageElement.className = "vote";
    image.src = poster_path
      ? `https://image.tmdb.org/t/p/w500${poster_path}`
      : "이미지 없음";
    // 값 설정
    titleElement.textContent = title;
    overviewElement.textContent = overview;
    voteaverageElement.textContent = `⭐: ${vote_average}`;
    // 새로운 요소들 카드에 추가
    card.appendChild(image);
    card.appendChild(titleElement);
    card.appendChild(overviewElement);
    card.appendChild(voteaverageElement);
    // 카드 클릭 시 영화 id 띄우기
    card.addEventListener("click", () => {
      alert(`이 영화의 ID는 ${id} 입니다.`);
    });
    // 값을 출력합니다.
    return card;
  };

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYmQ0YTRiZjc4MWI1YTA4MTdlMjRhZmUzNjRiZWNhMCIsInN1YiI6IjY2MmIzNTc2NzY0ODQxMDExZTJjM2U2MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5pdEmFDv2ba8pnOTwdwumfzbukzsR3Kwe33j2nNjnXI",
    },
  };

  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
      options
    );
    const responseData = await response.json();
    movies = responseData.results;
    renderMovies(movies);
  } catch (err) {
    console.error(err);
  }

  const searchButton = document.getElementById("searchbut");
  const searchInput = document.getElementById("searchinput");

  // 검색 버튼 클릭 시 이벤트 리스너 추가
  searchButton.addEventListener("click", searchMovies);

  // Enter 키 입력 시 검색 실행
  searchInput.addEventListener("keypress", async (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // 새로고침 중지
      await searchMovies();
    }
  });

  // 검색 함수 정의
  async function searchMovies() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const filteredMovies = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm)
    );
    renderMovies(filteredMovies);
  }

  // 페이지 로드 후 검색 입력란에 포커스 설정
  searchInput.focus();
});
