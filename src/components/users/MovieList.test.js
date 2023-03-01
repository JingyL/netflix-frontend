import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { render as renderDOM, unmountComponentAtNode } from "react-dom";
import MovieList from "./MovieList";
import { UserProvider } from "../../testUtils";
import { BrowserRouter } from "react-router-dom";
import NetflixApi from "../../api/Api";
import { act } from "react-dom/test-utils";


let container = null;
let addedMovies = [];

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

async function fetchData(moviename){
  return [{
      backdrop_path: "1qpUk27LVI9UoTS7S0EixUBj5aR.jpg",
    id: 52814,
  name: "Halo",
  poster_path: "1qpUk27LVI9UoTS7S0EixUBj5aR.jpg",
  overview:"Depicting an epic 26th-century conflict between humanity and an alien threat known as the Covenant, the series weaves deeply drawn personal stories with action, adventure and a richly imagined vision of the future."
}]
}

it("matches snapshot", async function () {
  window.scrollTo = jest.fn();

  const { asFragment} = render(
    <BrowserRouter>
      <UserProvider>
        <MovieList fetchData={NetflixApi.search}/>
      </UserProvider>
    </BrowserRouter>,
  );
  expect(asFragment()).toMatchSnapshot();

  act(() => {
    renderDOM(
      <BrowserRouter>
      <UserProvider value={{ addedMovies}}>
    <MovieList fetchData={fetchData}/>
    </UserProvider >
    </BrowserRouter>, container);
  });
  expect(container.textContent).toBe("SearchMy ListProfileSign OutMy List");

  addedMovies = [[52814, "Halo"]]
  await act(async () => {
    renderDOM(
      <BrowserRouter>
      <UserProvider value={{addedMovies}}>
    <MovieList fetchData={fetchData}/>
    </UserProvider >
    </BrowserRouter>, container);
  });
  
  expect(container.textContent).toBe("SearchMy ListProfileSign OutMy List");
  let image = container.getElementsByClassName('posters');
  expect(image.item(0).src).toBe("http://image.tmdb.org/t/p/original/1qpUk27LVI9UoTS7S0EixUBj5aR.jpg");
  

  fireEvent.click(container.getElementsByTagName("img").item(1));
  expect(container.getElementsByClassName('icon').item(0).className["animVal"]).toBe("svg-inline--fa fa-play icon");
  expect(container.getElementsByClassName('icon').item(1).className["animVal"]).toBe("svg-inline--fa fa-minus icon");
  expect(container.getElementsByClassName('icon').item(2).className["animVal"]).toBe("svg-inline--fa fa-circle-info icon")

  // console.log(container.getElementsByClassName('icon').item(1).className["animVal"])

  // async function click(){
  //   fireEvent.click(container.getElementsByClassName('icon').item(1));
  // }

  // await click()
  // expect(container.textContent).toBe("SearchMy ListProfileSign OutMy List");
  // let removed_container = container.getElementsByClassName('section-posters-list');
  // console.log(removed_container.item(0).innerHTML)
  // expect(removed_container).toBeEmpty();

});
