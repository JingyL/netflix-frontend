import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "../hooks/UserContext";

// Routes that can only be seen by auth users
function PrivateRoute({ exact, path, children }) {
  const { currentUser } = useContext(UserContext);
  if (!currentUser) {
    return <Redirect to="/signin" />;
  }

  return (
      <Route exact={exact} path={path}>
        {children}
      </Route>
  );
}

export default PrivateRoute;