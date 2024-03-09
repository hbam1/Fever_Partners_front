import React, { useState, useEffect } from 'react';
import { AuthAPI } from "../apis/AuthAPI";

const AuthenticationList = ({roomId}) => {
    const [authentications, setAuthentications] = useState([]);

    useEffect(() => {
        AuthAPI.get(`/api/rooms/${roomId}/activities/uncompleted_auth_list/`)
            .then(response => {
                console.log("Pending", response.data);
                setAuthentications(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const acceptAuth = (authId, roomId) => {
        AuthAPI.put(`/api/rooms/${roomId}/activities/accept_auth/${authId}/`);
    };

    const refuseAuth = (authId, roomId) => {
        AuthAPI.put(`/api/rooms/${roomId}/activities/reject_auth/${authId}/`);
    };

    return (
        <div>
            {authentications.map(auth => (
                <div key={auth.id}>
                    <span className="auth-detail-span">{auth.user.nickname}</span>님의 활동 인증 요청
                    <div className="auth-detail-btns">
                        <button onClick={() => acceptAuth(auth.id, auth.room)}>
                            <i className="ri-checkbox-circle-line y"></i>
                        </button>
                        <button onClick={() => refuseAuth(auth.id, auth.room)}>
                            <i className="ri-close-circle-line n"></i>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AuthenticationList;
