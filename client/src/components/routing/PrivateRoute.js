import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";

function PrivateRoute({ element: Element, ...rest }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);

  return (
    <>
      <Routes>
        <Route
          {...rest}
          element={
            !isAuthenticated && !loading ? (
              <Navigate to="/login"></Navigate>
            ) : (
              Element
            )
          }
        ></Route>
      </Routes>
    </>
  );
}

export default PrivateRoute;
