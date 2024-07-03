import { StreamVideo, name } from '@stream-io/video-react-sdk'
import React, { useState } from 'react'
import { Navigate, useNavigate } from "react-router-dom";
import { useUser } from './UserContext';
import CryptoJS from 'crypto-js';

const Main = () => {
    const { client, user, setCall, isLoadingClient } = useUser();
    const [newRoom, setnewRoom] = useState({ name: "", description: "" });
    const navigate = useNavigate();
    const hashRoomName = (roomName) => {
        const hash = CryptoJS.SHA256(roomName).toString(CryptoJS.enc.Base64);
        return hash.replace(/[^a-zA-Z0-9_-]/g, "");
    }
    if (isLoadingClient) return <h1>...</h1>
    if (!isLoadingClient && !user || !isLoadingClient && !client) return <Navigate to="/sign-in" />;
    const createRoom = async () => {
        const { name, description } = newRoom;
        if (!client || !user || !name || !description) return;

        const call = client.call("audio_room", hashRoomName(name));
        await call.join({
            create: true,
            date: {
                members: [{ user_id: user.username }],
                custom: {
                    title: name,
                    description,
                }
            }
        });
        setCall(call);
        Navigate("/room");
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