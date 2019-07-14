import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import Menu from "./components/MenuBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Container } from "semantic-ui-react";
import { AuthProvider } from "./context/auth-context";
import AuthRoute from "./util/AuthRoute";
import Footer from "./components/Footer";
import Exercise from "./pages/Exercise";
import { UserProvider } from "./context/user-context";
import LoggedInRoute from "./util/LoggedInRoute";
import Request from "./pages/Request";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <UserProvider>
            <Menu />
            <Switch>
              <AuthRoute exact path="/login" component={Login} />
              <AuthRoute exact path="/register" component={Register} />
              <LoggedInRoute exact path="/exercise/:id" component={Exercise} />
              <LoggedInRoute exact path="/request/:id" component={Request} />
              <Route exact path="/" component={Home} />
            </Switch>
          </UserProvider>
        </Container>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
