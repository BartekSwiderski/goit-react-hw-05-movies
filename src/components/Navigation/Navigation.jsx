import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navigation.modules.css";

const Navigation = () => {
  return (
    <>
      <div className={styles.navigation}>
        <ul className={styles.navigationGrid}>
          <li className={styles.navigationItem}>
            <Link className={styles.navigationLink} to={"/"}>
              Home
            </Link>
          </li>
          <li className={styles.navigationItem}>
            <Link className={styles.navigationLink} to={"/movies"}>
              Movies
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navigation;
