import React from 'react'
import Mic_button from './Mic_button'
import Live_button from './Live_button'

const Controls = () => {
    return (
        <div className="controls-panel">
            <Mic_button />
            <Live_button />
        </div>
    )
}

export default Controls