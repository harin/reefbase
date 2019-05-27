import React, { useState } from 'react';
import { auth } from './api.ts'
import { withRouter } from 'react-router-dom'
import { AppContext } from './AppContext.tsx'

const Login = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    function handleEmailChange(event) {
        setEmail(event.target.value)
    }

    function handlePasswordChange(event) { 
        setPassword(event.target.value)
    }

    async function submitHandler(e) {
        e.preventDefault()
        try {
            const user = await auth.login(email, password)
            props.context.updateUser(user)
            props.history.push('/')
        } catch (error) {
            setError(error.message)
        }

        return false
    }

    return (
        <form onSubmit={submitHandler}>
            <h3 className="title has-text-grey">Login</h3>
            <div className="box">
                <div className="field">
                    <p className="control has-icons-left">
                        <input className="input" type="email" placeholder="Email"
                            value={email}
                            onChange={handleEmailChange}
                        />
                        <span className="icon is-small is-left">
                            <i className="fas fa-envelope"></i>
                        </span>
                    </p>
                </div>

                <div className="field">
                    <div className="control has-icons-left">
                        <input className="input" type="password" 
                        placeholder="Password" value={password} onChange={handlePasswordChange}/>
                        <span className="icon is-small is-left">
                        <i className="fas fa-lock"></i>
                        </span>
                    </div>
                </div>
                <button className="button is-block is-info is-fullwidth" type='submit' >
                    Login</button>
                {error != null ?
                <p class="help is-danger">{error}</p>
                :null}
            </div>
        </form>
    )
}



const Register = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [error, setError] = useState(null)

    function handleEmailChange(event) {
        setEmail(event.target.value)
    }

    function handlePasswordChange(event) { 
        setPassword(event.target.value)
    }

    function handleUsernameChange(event) { 
        setUsername(event.target.value)
    }
    async function submitHandler(e) {
        e.preventDefault()
        try {
            const user = await auth.register({ username, email, password })
            props.context.updateUser(user)
            props.history.push('/')
        } catch (error) {
            setError(error.message)
        }

        return false
    }


    return (
        <form onSubmit={submitHandler}>
            <h3 className="title has-text-grey">Register</h3>
            <div className="box">
                <div className="field">
                    <p className="control has-icons-left">
                        <input className="input" type="text" placeholder="Username"
                            value={username}
                            onChange={handleUsernameChange}
                        />
                        <span className="icon is-small is-left">
                            <i className="fas fa-user"></i>
                        </span>
                    </p>
                </div>
                <div className="field">
                    <p className="control has-icons-left">
                        <input className="input" type="email" placeholder="Email"
                            value={email}
                            onChange={handleEmailChange}
                        />
                        <span className="icon is-small is-left">
                            <i className="fas fa-envelope"></i>
                        </span>
                    </p>
                </div>

                <div className="field">
                    <div className="control has-icons-left">
                        <input className="input"
                            type="password" 
                            placeholder="Password" 
                            value={password} 
                            onChange={handlePasswordChange}
                        />
                        <span className="icon is-small is-left">
                        <i className="fas fa-lock"></i>
                        </span>
                    </div>
                </div>
                <button 
                    className="button is-block is-info is-fullwidth" 
                    submit='submit' 
                    >Register</button>
            </div>
            {error != null ?
                <p class="help is-danger">{error}</p>
                :null}
        </form>
    )
}

            
const LoginPage = (props) => {
    return (
        <AppContext.Consumer>
            {context => 
                <section className="hero is-fullheight">
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <div className="column is-4 is-offset-4">
                            <Login {...props} context={context}/>
                        </div>
                        {/* <div className="column is-4 is-offset-4">
                            <Register {...props} context={context} />
                        </div> */}
                    </div>
                </div>
            </section>}
        </AppContext.Consumer>

    )
}

export default withRouter(LoginPage)

