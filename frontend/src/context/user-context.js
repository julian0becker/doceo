import React, { createContext, useState } from "react";

let initialState = "exercises";
if (localStorage.getItem("page")) {
  initialState = localStorage.getItem("page");
}

const UserContext = createContext({
  page: null,
  setPage: () => {}
});

function UserProvider(props) {
  const [page, setThePage] = useState(initialState);

  function setPage(name) {
    localStorage.setItem("page", name);
    setThePage(name);
  }

  return <UserContext.Provider value={{ page, setPage }} {...props} />;
}

export { UserContext, UserProvider };
