import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Navigation = React.lazy(() =>
  import("./components/Navigation/Navigation")
);
const HomePage = React.lazy(() => import("./components/HomePage/HomePage"));
const MovieDetailsPage = React.lazy(() =>
  import("./components/MovieDetails/MovieDetails")
);
const Cast = React.lazy(() => import("./components/Cast/Cast"));
const Reviews = React.lazy(() => import("./components/Reviews/Reviews"));
const MovieSearch = React.lazy(() =>
  import("./components/MovieSearch/MovieSearch")
);

const App = () => {
  return (
    <BrowserRouter>
      <Suspense>
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
