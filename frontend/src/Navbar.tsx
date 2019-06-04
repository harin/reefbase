import React from "react";
import { Link } from "react-router-dom";
import { AppContext } from "./AppContext";

class Navbar extends React.Component {
  static contextType = AppContext;
  state = {
    active: false
  };

  logout = async () => {
    // await auth.logout(this.context.user.access_token);
    this.context.updateUser(null);
  };

  closeMenu = () => {
    this.setState({ active: false });
  };

  render() {
    // const { user } = this.context
    return (
      <nav
        className="navbar is-dark"
        id="nav"
        role="navigation"
        aria-label="main navigation"
        style={{ paddingLeft: 10, paddingRight: 10 }}
      >
        <div className="navbar-brand">
          <a href="/" className="navbar-item">
            <div className="title tooltip" style={{ paddingRight: 20 }}>
              Reefbase
            </div>
          </a>
          <a
            href="/"
            role="button"
            className={`navbar-burger burger ${
              this.state.active ? "is-active" : ""
            }`}
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
            onClick={e => {
              e.preventDefault();
              this.setState({ active: !this.state.active });
            }}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>
        </div>
        <div
          className={`navbar-menu ${this.state.active ? "is-active" : ""}`}
          style={{
            backgroundColor: "rgba(0,0,0,0)"
          }}
        >
          <div className="navbar-start">
            <Link className="navbar-item" onClick={this.closeMenu} to="/about">
              About
            </Link>
            <Link
              className="navbar-item"
              onClick={this.closeMenu}
              to="/destinations"
            >
              Destinations
            </Link>
            <Link
              className="navbar-item"
              onClick={this.closeMenu}
              to="/destinations/map"
            >
              Map
            </Link>
          </div>
          {/* {user != null ?
                        <div className="navbar-end">
                            <a href="/" className="navbar-item">{user.username}</a>
                            <a className="navbar-item" onClick={this.logout}>Logout</a>
                        </div>
                        :
                        <div className="navbar-end">
                            <Link className="navbar-item" to="/login">Login</Link>
                        </div>
                    } */}
        </div>
      </nav>
    );
  }
}

export default Navbar;
