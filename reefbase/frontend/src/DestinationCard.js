import React from 'react';

class DestinationCard extends React.Component {
    render() {
        const {site, note = {}, updateNoteHandler, isLoggedIn} = this.props
        if (site == null) {
            return (
                <div>
                    <h2 className="title is-two">No Dive Site Selected!</h2>
                </div>
            )
        }

        let textarea
        if (isLoggedIn === true) {
            textarea = (
                <div className='full-height'>
                    <textarea 
                        autoFocus={true}
                        className="textarea" 
                        placeholder="Take notes here."
                        ref={ c => this._input = c}
                        value={note.content}
                    >

                    </textarea>
                    <button className='button' onClick={updateNoteHandler}>submit</button>
                </div>
            )
        } else {
            textarea = (
                <div>
                    <textarea className="textarea" placeholder="Please login to take notes" disabled></textarea>
                </div>
            )
        }

        return (
        <div>
            <h2 className="title is-two">{site.name}</h2>
            <h3 className="subtitle is-four">{site.destination}, {site.country}</h3>
            { textarea }

        </div>
        )
    }
}

export default DestinationCard