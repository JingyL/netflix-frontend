import React from "react";
import { render } from "@testing-library/react";
import Profile from "./Profile";
import { UserProvider } from "../../testUtils";
import { BrowserRouter } from "react-router-dom";


it("matches snapshot", function () {
  const { asFragment } = render(
    <BrowserRouter>
      <UserProvider>
        <Profile />
      </UserProvider>
    </BrowserRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});
