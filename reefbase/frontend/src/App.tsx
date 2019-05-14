import React, { Component } from 'react';
import './App.css';
import './index.css';
import Navbar from './Navbar'
import 'bulma-extensions/bulma-tooltip/dist/css/bulma-tooltip.min.css'
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Destination from './Destination'
import DestinationList from './DestinationList'
import Login from './Login'
import { AppContext, DEFAULT_STATE } from './AppContext'
import { getDestinations, auth } from './api'

function DestinationPage(props: any) {
  return <Destination {...props}></Destination>
}

function About() {
  return <h2>About</h2>;
}

// function PrivateRoute({ component: Component, ...rest }) {
//   return (
//     <Route
//       {...rest}
//       render={props =>
//         auth.isAuthenticated() ? (
//           <Component {...props} />
//         ) : (
//           <Redirect
//             to={{
//               pathname: "/login",
//               state: { from: props.location }
//             }}
//           />
//         )
//       }
//     />
//   );
// }

interface User {
  username: string;
  access_token: string;
}

class App extends React.Component{
  state = DEFAULT_STATE
  constructor(props: any) {
    super(props)
    let user = localStorage.getItem('user')
    if (user != null) {
      this.state.user = JSON.parse(user)
    }
  }

  updateUser = (user: User) => {
    this.setState({ user })
    localStorage.setItem('user', JSON.stringify(user))
  }

  render() {
    return (
      <AppContext.Provider value={{
          ...this.state, 
          updateUser: this.updateUser
      }}>
        <Router>
          <div>
            <Navbar />
            <Route path="/login/" component={Login} />
            <Route path="/about/" component={About} />
            <Route path="/destinations/" exact component={DestinationList} />
            <Route path="/destinations/:country/:name" component={DestinationPage} />
          </div>
        </Router>
      </AppContext.Provider>
    );
  }
}

export default App;

