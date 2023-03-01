import React from "react";
import UserContext from "./hooks/UserContext";

const demoUser = {
  username: "testuser",
  first_name: "testfirst",
  last_name: "testlast",
  email: "test@test.net",
};

const UserProvider =
    ({ children, currentUser = demoUser, addedMovies=[] }) => (
    <UserContext.Provider value={{ currentUser, addedMovies }}>
      {children}
    </UserContext.Provider>
);

export { UserProvider };
