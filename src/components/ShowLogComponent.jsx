import React, { useEffect, useState } from 'react';
import { AuthAPI } from "../apis/AuthAPI";
import styles from "../routes/css/ShowLog.module.css";

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
        <div className={styles.authLogs}>
            {authLogs.map(auth => (
                <div key={auth.id} className={styles.authLog}>
                    <p className={styles.gray08em}>{auth.created_date}</p>
                    {auth.is_auth ? (
                        <div className={styles.authText}>
                            <i className={`ri-checkbox-circle-fill ${styles.authIcon}`}></i>
                            <p><span className={styles.mainColorBold}>{auth.user.nickname}</span>님이 인증을 <span className={styles.authSuccess}>성공</span>했습니다.</p>
                        </div>
                    ) : (
                        <div className={styles.authText}>
                            <i className={`ri-close-circle-fill ${styles.authIcon}`} style={{ color: 'red' }}></i>
                            <p><span className={styles.mainColorBold}>{auth.user.nickname}</span>님이 인증을 <span className={styles.authFail}>실패</span>했습니다.</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ShowLogComponent;
