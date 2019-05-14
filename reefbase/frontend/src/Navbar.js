import React from 'react';
import { Link } from "react-router-dom";
import { AppContext } from './AppContext'
import { auth } from './api'

class Navbar extends React.Component {
    static contextType = AppContext

    logout = async () => {
        await auth.logout()
        this.context.updateUser(null)
    }

    render() {
        const { user } = this.context

        return (
            <nav className="navbar is-dark"
                id="nav"
                role="navigation"
                aria-label="main navigation"
                style={{ paddingLeft: 10, paddingRight: 10 }}
            >
                <div className="navbar-brand">
                    <a href="#" role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false"
                        data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>
                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <a href="#" className="navbar-item">
                            <div className="title" style={{ paddingRight: 20 }}>Reefbase</div>
                        </a>
                        <Link className="navbar-item" to="/about">About</Link>
                        <Link className="navbar-item" to="/destinations">Destinations</Link>
                    </div>
                    {user != null ?
                        <div className="navbar-end">
                            <a href="#" className="navbar-item">{user.username}</a>
                            <a className="navbar-item" onClick={this.logout}>Logout</a>
                        </div>
                        :
                        <div className="navbar-end">
                            <Link className="navbar-item" to="/login">Login</Link>
                        </div>
                    }
                </div>
            </nav>
        )
    }
}

export default Navbar;
