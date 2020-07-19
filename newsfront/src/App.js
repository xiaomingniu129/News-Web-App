import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbars from "./components/Navbars/Navbars";
import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/layouts/Home";
import { Provider } from "./context";
import Details from "./components/details/Details";
import SearchPage from "./components/layouts/SearchPage";
import WorldPage from "./components/layouts/WorldPage";
import PoliticsPage from "./components/layouts/PoliticsPage";
import BusinessPage from "./components/layouts/BusinessPage";
import TechnologyPage from "./components/layouts/TechnologyPage";
import SportsPage from "./components/layouts/SportsPage";
import FavoritesPage from "./components/layouts/FavoritesPage";

function App() {
  localStorage.setItem("tabName", "/home");
  return (
    <Provider>
      <Router>
        <Navbars />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <Route path="/world" component={WorldPage} />
          <Route path="/politics" component={PoliticsPage} />
          <Route path="/business" component={BusinessPage} />
          <Route path="/technology" component={TechnologyPage} />
          <Route path="/sports" component={SportsPage} />
          <Route path="/article" component={Details} />
          <Route path="/search" component={SearchPage} />
          <Route path="/favorites" component={FavoritesPage} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
