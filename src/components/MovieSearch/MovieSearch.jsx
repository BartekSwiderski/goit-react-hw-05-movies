import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./MovieSearch.modules.css";

const MovieSearch = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useSearchParams();
  const query = searchQuery.get("query");
  const API_KEY = "837f028f22fd2591f3672c74a92683e2";
  const fetchSearchMovies = (query) => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
    )
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results);
      })
      .catch((err) => console.log(err));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formQuery = form.elements.query.value;
    if (formQuery === "") {
      return;
    } else {
      setSearchQuery({ query: formQuery });
      fetchSearchMovies(query);
    }
    form.reset();
  };

  useEffect(() => {
    if (query === null || query === "" || movies === null) {
      setMovies([]);
      return;
    }
    fetchSearchMovies(query);
  }, [query, setSearchQuery]);

  return (
    <div className={styles.moviesGrid}>
      <form className={styles.movieSearchForm} onSubmit={onSubmit}>
        <input className={styles.movieSearchInput} type="text" name="query" />
        <button className={styles.movieSearchBtn} type="submit">
          Search
        </button>
      </form>
      <ul className={styles.moviesList}>
        {movies.map(({ id, original_title }) => (
          <li className={styles.movieItem} key={id}>
            <Link className={styles.movieLink} to={`/movies/${id}`}>
              {original_title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieSearch;
