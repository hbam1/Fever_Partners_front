import React, { useState, useEffect } from 'react';
import { AuthAPI } from "../apis/AuthAPI";
import styles from "../routes/css/AuthenticationList.module.css";

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
        <div className={styles.authenticationList}>
            {authentications.map(auth => (
                <div key={auth.id} className={styles.authDetail}>
                    <p><span className={styles.authDetailSpan}>{auth.user.nickname}</span>님의 활동 인증 요청</p>
                    <div className={styles.authDetailBtns}>
                        <button onClick={() => acceptAuth(auth.id, auth.room)}>
                            <i className={`${styles.authIcon} ri-checkbox-circle-line y`} style={{ color: '#db4455' }}></i>
                        </button>
                        <button onClick={() => refuseAuth(auth.id, auth.room)}>
                            <i className={`${styles.authIcon} ri-close-circle-line n`}></i>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AuthenticationList;
