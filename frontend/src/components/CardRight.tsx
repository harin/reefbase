import React, { ReactChildren } from 'react';


const CardRight = ({ children }: { children: React.ReactNode }) => 
    <section className="section">
    <div className="container is-fluid">
        <div className="columns">
            <div className="column is-three-quarters"></div>
            <div className="column">
                <div className="tile box is-vertical" id="main-content">
                    {children}
                </div>
            </div>
        </div>
    </div>
    </section>

export default CardRight