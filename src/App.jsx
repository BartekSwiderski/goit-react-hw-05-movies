import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Navigation = lazy(() => import("./components/Navigation/Navigation"));
const HomePage = lazy(() => import("./components/HomePage/HomePage"));
const MovieDetailsPage = lazy(() =>
  import("./components/MovieDetails/MovieDetails")
);
const Cast = lazy(() => import("./components/Cast/Cast"));
const Reviews = lazy(() => import("./components/Reviews/Reviews"));
const MovieSearch = lazy(() => import("./components/MovieSearch/MovieSearch"));

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Navigation />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HomePage />
              </>
            }
          />
          <Route
            path="/movies/:id"
            element={
              <>
                <MovieDetailsPage />
              </>
            }
          />
          <Route
            path="/movies/:id/cast"
            element={
              <>
                <MovieDetailsPage />
                <Cast />
              </>
            }
          />
          <Route
            path="/movies/:id/reviews"
            element={
              <>
                <MovieDetailsPage />
                <Reviews />
              </>
            }
          />
          <Route
            path="/movies"
            element={
              <>
                <MovieSearch />
              </>
            }
          />
          <Route
            path="/movies?query=:query"
            element={
              <>
                <MovieSearch />
              </>
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
