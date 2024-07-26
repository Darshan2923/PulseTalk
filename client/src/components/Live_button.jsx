import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk'
import React from 'react'

const Live_button = () => {
    const { useIsCallLive } = useCallStateHooks();
    const call = useCall();
    const isLive = useIsCallLive();
    return (
        <div>
            <button
                style={{ backgroundColor: "rgb(35,35,35)", boxShadow: isLive ? "0 0 1px 2px green" : 'none' }}
                onClick={async () => {
                    if (isLive) call?.stopLive();
                    else call?.goLive();
                }}>{isLive ? "Stop Live" : "Go Live"}</button>
        </div>
    )
}

export default Live_button