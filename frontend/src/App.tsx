import React from "react";
import "./App.scss";
import Navbar from "./Navbar";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import Destination from "./Destination";
import DestinationList from "./DestinationList";
import Login from "./Login";
import About from "./About";
import MapPage from "./MapPage";
import { AppContext, DEFAULT_STATE } from "./AppContext";
import { IUser, auth } from "./api";

function DestinationPage(props: any) {
  return <Destination {...props} />;
}

function DestinationListPage(props: any) {
  const pathname = props.location.pathname;
  if (pathname === "/destinations") {
    return <DestinationList 
      locationType="countries" 
      history={props.history}
    />;
  }
  return (
    <DestinationList
      locationType="cities"
      country={props.match.params.country}
      history={props.history}
    />
  );
}

class App extends React.Component {
  state = DEFAULT_STATE;
  constructor(props: any) {
    super(props);
    let user = localStorage.getItem("user");
    if (user != null) {
      let tempUser = JSON.parse(user) || {};
      if (tempUser.access_token != null) {
        this.state.user = tempUser;
        auth.isTokenValid(tempUser.access_token).then(isValid => {
          if (isValid === false) {
            this.updateUser(null);
          }
        });
      }
    }
  }

  updateUser = (user: IUser | null) => {
    this.setState({ user });
    localStorage.setItem("user", JSON.stringify(user));
  };

  render() {
    return (
      <AppContext.Provider
        value={{
          ...this.state,
          updateUser: this.updateUser
        }}
      >
        <Router>
          <div>
            <Navbar />
            <Route
              exact
              path="/"
              render={() => <Redirect to="/destinations" />}
            />
            <Route path="/login/" component={Login} />
            <Route path="/about/" component={About} />
            <Route
              path="/destinations/"
              exact
              component={DestinationListPage}
            />
            <Switch>
              <Route path="/destinations/map" exact component={MapPage} />
              <Route
                path="/destinations/:country"
                exact
                component={DestinationListPage}
              />
              <Route
                path="/destinations/:country/:city"
                exact
                component={DestinationPage}
              />
            </Switch>
          </div>
        </Router>
      </AppContext.Provider>
    );
  }
}

export default App;
