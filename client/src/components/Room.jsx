import { OwnCapability, useCallStateHooks, useRequestPermission } from '@stream-io/video-react-sdk'
import React from 'react'
import Controls from './Controls';
import { useUser } from './UserContext';
import Permission_request from './Permission_request';
import Participants from './Participants';

const Room = () => {
    const { useCallCustomData, useParticipants, useCallCreatedBy } = useCallStateHooks();
    const custom = useCallCustomData();
    const user = useUser();
    const participants = useParticipants();
    const createdBy = useCallCreatedBy();
    const { hasPermission, requestPermission } = useRequestPermission(OwnCapability.SEND_AUDIO)
    return (
        <div className='room'>
            <h2 className='title'>{custom?.title ?? "TITLE"}</h2>
            <h3 className='description'>{custom?.description ?? "DESCRIPTION"}</h3>
            <p className='participant-count'>{participants.length} participants</p>
            <Participants />
            {user?.username === createdBy?.id && <Permission_request />}
            {hasPermission ? <Controls /> : <button onClick={requestPermission}>&#9995;</button>}
        </div>
    )
}

export default Room