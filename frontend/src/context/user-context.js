import React, { createContext, useState } from "react";

let initialState = "home";
if (localStorage.getItem("page")) {
  initialState = localStorage.getItem("page");
}

let initialStateLang = null;
if (localStorage.getItem("languages")) {
  const value = localStorage.getItem("languages");
  initialStateLang = JSON.parse(value);
}

const UserContext = createContext({
  page: null,
  languages: null,
  setPage: () => {}
});

function UserProvider(props) {
  const [page, setThePage] = useState(initialState);
  const [languages, setTheLanguages] = useState(initialStateLang);

  function setPage(name) {
    localStorage.setItem("page", name);
    setThePage(name);
  }

  function setLanguages(languages) {
    localStorage.setItem("languages", JSON.stringify(languages));
    setTheLanguages(languages);
  }

  return (
    <UserContext.Provider
      value={{ page, setPage, languages, setLanguages }}
      {...props}
    />
  );
}

export { UserContext, UserProvider };
