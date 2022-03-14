import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import styles from "./Reviews.modules.css";

const Review = ({ id, author, content }) => {
  return (
    <li className={styles.reviewItems} id={id}>
      <p className={styles.reviewsText}>`{content}`</p>
      <h3 className={styles.reviewsAuthor}>Author: {author}</h3>
    </li>
  );
};

const Reviews = () => {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const API_KEY = "837f028f22fd2591f3672c74a92683e2";

  const fetchReviews = (id) => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        setReviews(data.results);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchReviews(id);
  }, [id, setReviews]);

  return (
    <>
      <ul className={styles.reviews}>
        {reviews !== null ? (
          reviews.map(({ id, author, content }) => (
            <Review key={id} id={id} author={author} content={content} />
          ))
        ) : (
          <p className={styles.noReviews}>`No reviews`</p>
        )}
      </ul>
    </>
  );
};

export default Reviews;
