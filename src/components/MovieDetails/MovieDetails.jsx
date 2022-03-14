import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./MovieDetails.modules.css";
import { Link, useNavigate } from "react-router-dom";

const MovieDetailsPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const API_KEY = "837f028f22fd2591f3672c74a92683e2";
  const POSTER_URL = "http://image.tmdb.org/t/p/w600";

  const fetchApi = (id) => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        setMovie(data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchApi(id);
  }, [id, setMovie]);

  const {
    original_title,
    poster_path,
    vote_average,
    overview,
    genres,
    release_date,
  } = movie;

  return (
    <>
      <button className={styles.back} onClick={goBack}>
        Go back
      </button>
      <div className={styles.movie}>
        <div className={styles.moviePage}>
          {poster_path !== undefined ? (
            <img
              className={styles.moviePoster}
              src={`${POSTER_URL}${poster_path}`}
              alt="Poster"
            />
          ) : (
            <img
              className={styles.moviePoster}
              src="../img/posterPlaceholder.jpg"
              alt="Poster"
            />
          )}
          <div className={styles.movieInfo}>
            <h2 className={styles.movieTitle}>{original_title}</h2>
            <div className={styles.movieDescription}>
              <p className={styles.movieDate}>{release_date} / </p>
              <ul className={styles.movieGenres}>
                {genres !== undefined ? (
                  genres.map(({ id, name }) => (
                    <li className={styles.movieGenresItem} key={id}>
                      {name}
                      {", "}
                    </li>
                  ))
                ) : (
                  <p className={styles.movieGenresItem}>`No genres`</p>
                )}
              </ul>
            </div>
            <p className={styles.movieScore}>User Score: {vote_average}</p>
            <h3 className={styles.overview}>Overview:</h3>
            <p className={styles.overviewText}>{overview}</p>
            <ul className={styles.movieLinksGrid}>
              <li className={styles.movieLinks}>
                <Link className={styles.movieLink} to={`/movies/${id}/cast`}>
                  Cast
                </Link>
              </li>
              <li className={styles.movieLinks}>
                <Link className={styles.movieLink} to={`/movies/${id}/reviews`}>
                  Reviews
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetailsPage;
