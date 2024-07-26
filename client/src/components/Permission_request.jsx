import { useCall } from '@stream-io/video-react-sdk';
import React, { useCallback, useEffect, useState } from 'react'

const Permission_request = () => {
    const [permissionRequests, setpermissionRequests] = useState([]);
    const call = useCall();
    useEffect(() => {
        return call?.on("call.permission_request", (event) => {
            const request = event;
            setpermissionRequests((req) => [...req, request]);
        })
    }, [call]);

    const handlePermissionRequest = useCallback(async (event, boolean) => {
        const { user, permissions } = request;
        try {
            if (boolean) await call?.grantPermissions(user.id, permissions);
            else await call?.revokePermissions(user.id, permissions);
            setpermissionRequests((req) => req.filter((req) => req !== request));
        } catch (err) {
            alert("Error while approving while getting request")
        }
    }, [call]);

    return (
        <div className='permission-requests'>
            {" "}
            <h4>Permission Requests</h4>
            {permissionRequests.map((request) => (
                <div className='permission-request' key={request.user.id}>
                    <span>
                        {" "}
                        {request.user.name} requested to {request.permissions.join(", ")}
                    </span>
                    <button onClick={() => handlePermissionRequest(request, true)}>Approve</button>
                    <button onClick={() => handlePermissionRequest(request, false)}>Deny</button>
                </div>
            ))}
        </div>
    )
}

export default Permission_request