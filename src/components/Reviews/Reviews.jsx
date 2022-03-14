import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import styles from "./Reviews.module.css";

const Review = ({ id, author, content }) => {
  return (
    <li className={styles.reviewItem} id={id}>
      <p className={styles.reviewText}>`{content}`</p>
      <h3 className={styles.reviewAuthor}>Author: {author}</h3>
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
  console.log(reviews);
  return (
    <div className={styles.container}>
      <h2 className={styles.reviewsTitle}>Revievs</h2>
      <ul className={styles.reviews}>
        {reviews.length !== 0 ? (
          reviews.map(({ id, author, content }) => (
            <Review key={id} id={id} author={author} content={content} />
          ))
        ) : (
          <p className={styles.noReviews}>No reviews ಥ_ಥ</p>
        )}
      </ul>
    </div>
  );
};

export default Reviews;
