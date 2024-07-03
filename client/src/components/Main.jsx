import { StreamVideo, name } from '@stream-io/video-react-sdk'
import React, { useState } from 'react'
import { Navigate } from "react-router-dom";
import { useUser } from './UserContext'

const Main = () => {
    const { client, user } = useUser();
    const [newRoom, setnewRoom] = useState({ name: "", description: "" });
    if (!client) return <Navigate to="/sign-in" />;
    const createRoom = () => {

    }

    return (
        <StreamVideo client={client}>
            <div className='home'>Welcome, {user?.name}</div>
            <div className="form">
                <h2>Create Your Own Room</h2>
                <input type="text" placeholder='Room name...' onChange={(e) => setnewRoom((prev) => ({ ...prev, name: e.target.value }))} />
                <input type="text" placeholder='Room Description...' onChange={(e) => setnewRoom((prev) => ({ ...prev, description: e.target.value }))} />
                <button onClick={createRoom} style={{ backgroundColor: "rgb(125,7,236" }}>Create Room</button>
            </div>
        </StreamVideo>
    )
}

export default Main