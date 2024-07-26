import { Avatar } from '@stream-io/video-react-sdk'
import React from 'react'

const IndiParticipant = (props) => {

    return (
        <div className='participant'>
            <Avatar imageSrc={props.participant.image} style={{ width: 60, height: 60, borderRadius: 50, boxShadow: props.participant.isSpeaking ? "0 0 1px 2px green" : 'none' }} />
            <p>{props.participant.name}</p>
        </div>
    )
}

export default IndiParticipant