import React from 'react'
import GithubCorner from 'react-github-corner';

const About = () =>
    <div className="section">
        <GithubCorner 
            svgStyle={{
                top: 50
            }}
            href="https://github.com/harin/reefbase"
        />
        <div className="container">
            <div className="columns">
                <div className="column is-half is-offset-one-quarter">
                    <h2 className="title is-2">About</h2>
                    <p>The goal of <a href="/" className="has-text-weight-bold">Reefbase</a> is to be a place where scuba divers can collect information about a dive site before, during, and after a diving trip.</p><br />
                    <p>Currently, the application is in development mode, so things will change and data could get lost.</p><br />
                    <p>The dive site geo GPS coordinate are from <a href="http://divesites.com" target="_blank" rel="noopener noreferrer">divesites.com</a></p><br />
                    <p>Created by <a href="https://harinsang.com" target="_blank" rel="noopener noreferrer">Harin Sanghirun</a>.</p>
                </div>
            </div>
        </div>
    </div>

export default About
