import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Cast.modules.css";

const CastItem = ({ id, name, profile_path, character }) => {
  const CAST_IMG_URL = "http://image.tmdb.org/t/p/w200";
  const castImg = `${CAST_IMG_URL}${profile_path}`;

  return (
    <li className={styles.castItem} key={id}>
      {profile_path !== null ? (
        <img className={styles.castImg} src={castImg} alt="poster" />
      ) : (
        <img
          className={styles.castImg}
          src="../img/placeholder.jpg"
          alt="poster"
        />
      )}
      <p className={styles.castName}>{name}</p>
      <p className={styles.castChar}>{character}</p>
    </li>
  );
};

const Cast = () => {
  const { id } = useParams();
  const [cast, setCast] = useState([]);
  const API_KEY = "837f028f22fd2591f3672c74a92683e2";
  const fetchCast = (id) => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        setCast(data.cast);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchCast(id);
  }, [id, setCast]);

  return (
    <>
      <ul className={styles.castList}>
        {cast !== null
          ? cast.map(({ id, name, profile_path, character }) => (
              <CastItem
                key={id}
                id={id}
                character={character}
                name={name}
                profile_path={profile_path}
              />
            ))
          : `Sorry, no cast here`}
      </ul>
    </>
  );
};

export default Cast;
