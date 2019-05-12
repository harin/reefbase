import react from 'react';

const DestinationCard = () => {
    return (
        <div>
        <div v-if="activeSite != null">
        <h2 className="title is-two">{site.name}</h2>
        <h3 className="subtitle is-four">{site.country}</h3>
        <div v-if="user != null">
            <textarea className="textarea" placeholder="Take notes here."></textarea>
            <button >submit</button>
        </div>
        <div>
            <textarea className="textarea" placeholder="Please login to take notes" disabled></textarea>
        </div>

    </div>
    <div>
        <h2 className="title is-two">No Dive Site Selected!</h2>
    </div>
    </div>
    )
}

export default DestinationCard