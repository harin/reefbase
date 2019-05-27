import React from 'react';
import { IDiveSite, Note } from './api'
import { AppContext } from './AppContext'

interface IDestinationCardProps {
    site: IDiveSite;
    // updateNoteHandler: () => any,
    isLoggedIn: boolean;
    country: string;
    city: string;
}

class DestinationCard extends React.Component<IDestinationCardProps, any> {
    static contextType = AppContext
    _textarea: any

    async syncNote() {
        const diveSiteId = this.props.site.id
        const content = await Note.getNote({ diveSiteId, user: this.context.user })
        this._textarea.value = content
    }

    async componentWillMount() {
        if (this.context.user == null) return
        // await this.syncNote()
    }

    async componentDidUpdate(prevProps: any) {
        if (this.props.site.id !== prevProps.site.id) {
            this._textarea.value = ''
            // this.syncNote()
        }
    }

    async onNoteSave(event: any) {
        const diveSiteId = this.props.site.id
        // TODO: check result and feedback UI
        await Note.updateNote({ 
            diveSiteId, 
            user: this.context.user,
            content: this._textarea.value
        })
    }

    render() {
        const {site, country, city} = this.props
        if (site == null) {
            return (
                <div>
                    <h2 className="title is-two">No Dive Site Selected!</h2>
                </div>
            )
        }

        let textarea
        if (this.context.user != null) {
            textarea = (
                <div className='full-height'>
                    <textarea 
                        autoFocus={true}
                        className="textarea" 
                        placeholder="Take notes here."
                        ref={c => this._textarea = c}
                    >
                    </textarea>
                    <button className='button' 
                        onClick={this.onNoteSave.bind(this)}>submit</button>
                </div>
            )
        } else {
            textarea = (
                <div>
                    <textarea 
                        className="textarea" 
                        placeholder="Please login to take notes" 
                        ref={c => this._textarea = c}
                        disabled></textarea>
                </div>
            )
        }

        return (
        <div>
            <h2 className="title is-two">{site.name}</h2>
            <h3 className="subtitle is-four">{city}, {country}</h3>
            { textarea }

        </div>
        )
    }
}

export default DestinationCard