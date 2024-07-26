import { useCallStateHooks } from '@stream-io/video-react-sdk'
import React from 'react'

const Mic_button = () => {
    const { useMicrophoneState } = useCallStateHooks();
    const { microphone, isMute } = useMicrophoneState();
    return (
        <button onClick={async () => {
            if (isMute) {
                await microphone?.enable();
            } else {
                await microphone?.disable();
            }
        }}>{isMute ? "Unmute" : "Mute"}</button>
    )
}

export default Mic_button