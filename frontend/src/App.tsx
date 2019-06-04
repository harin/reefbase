import React from "react";
import "./App.scss";
import '../node_modules/bulma-extensions/bulma-calendar/dist/js/bulma-calendar'
import Navbar from "./Navbar";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import Destination from "./Destination";
import DestinationList from "./DestinationList";
import About from "./About";
import MapPage from "./MapPage";
import DiveLogsPage from './DiveLogsPage'
import ErrorView from './components/ErrorView'
import { AppContext, DEFAULT_STATE } from "./AppContext";
import { IUser } from "./api";

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
   
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true }
  }

  componentDidCatch(error: any, info: any) {
    this.setState({ error })
  }

  updateUser = (user: IUser | null) => {
    this.setState({ user });
    localStorage.setItem("user", JSON.stringify(user));
  };

  render() {

    if (this.state.hasError) {
      return (
        <>
          <Navbar />
          <ErrorView />
        </>
      )
    }

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
              <Route
                path='/divelogs'
                component={DiveLogsPage}
              />
              <Route
                path='/divelogs/create'
                component={DiveLogsPage}
              />
            </Switch>
          </div>
        </Router>
      </AppContext.Provider>
    );
  }
}

export default App;
