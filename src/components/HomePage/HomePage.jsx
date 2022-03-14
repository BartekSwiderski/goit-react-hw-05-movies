import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./HomePage.modules.css";

const MovieItem = ({ id, title }) => {
  return (
    <li className={s.MovieItemsItem} key={id}>
      <Link className={s.MovieItemsLink} to={`/movies/${id}`}>
        {title}
      </Link>
    </li>
  );
};

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const API_KEY = "837f028f22fd2591f3672c74a92683e2";
  async function fetchApi() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`
      );
      if (!response.ok) {
        setLoaded(false);
        throw new Error(response.status);
      } else {
        return response.json();
      }
    } catch (err) {
      setLoaded(false);
      return console.log(err);
    }
  }
  function renderMovies() {
    fetchApi()
      .then((response) => {
        setMovies(response);
        setLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (!isLoaded) {
      renderMovies();
    }
  });
  return (
    <>
      <section>
        <h2 className={s.header}>Top Trending Movies</h2>
        <ol className={s.HomePageList}>
          <>
            {movies.results.map(({ id, original_title }) => (
              <MovieItem key={id} id={id} title={original_title} />
            ))}
          </>
        </ol>
      </section>
    </>
  );
};

export default HomePage;
