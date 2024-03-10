import React, { useEffect, useState } from 'react';
import {AuthAPI} from "../apis/AuthAPI"

const ShowLogComponent = (room) => {
    const [authLogs, setAuthLogs] = useState([]);
    const roomData = room.room;

    useEffect(() => {
        AuthAPI.get(`/api/rooms/${roomData.id}/activities/auth_log_list/`)
            .then(response => {
                setAuthLogs(response.data);
                console.log("Auth Logs", response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <div id="auth-logs">
            {authLogs.map(auth => (
                <div key={auth.id} className="auth-log">
                    <p className="gray-08em">{auth.created_date}</p>
                    {auth.is_auth ? (
                        <div className="auth-text">
                            <i className="ri-checkbox-circle-fill"></i>
                            <p><span className="main-color-bold">{auth.user.nickname}</span>님이 인증을 <span className="auth-success">성공</span>했습니다.</p>
                        </div>
                    ) : (
                        <div className="auth-text">
                            <i className="ri-close-circle-fill"></i>
                            <p><span className="main-color-bold">{auth.user.nickname}</span>님이 인증을 <span className="auth-fail">실패</span>했습니다.</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ShowLogComponent;
