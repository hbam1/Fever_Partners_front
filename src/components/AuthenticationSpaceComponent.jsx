import React, { useEffect, useState } from 'react';
import { AuthAPI } from "../apis/AuthAPI";
import styles from "../routes/css/Authentication.module.css";

const AuthenticationSpaceComponent = (room) => {
    const [authentications, setAuthentications] = useState([]);
    const [currentTime, setCurrentTime] = useState(new Date());
    const roomData = room.room;

    useEffect(() => {
        AuthAPI.get(`/api/rooms/${roomData.id}/activities/auth_list/`)
            .then(response => {
                setAuthentications(response.data);
                console.log("Auths", response.data);
            })
            .catch(error => {
                console.error(error);
            });
        
        // 1초에 한번 주기로 확인
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const checkCurTime = (endTime) => {
        const endDateTime = new Date(endTime);
        return currentTime < endDateTime;
    };

    const closeAuth = (authId) => {
        AuthAPI.delete(`/api/rooms/${roomData.id}/activities/authentications/${authId}/`)
        .then(response => {
            if (response.status >= 200) {
                // 인증 컨테이너 삭제하는 코드 작성바람(용화)
            }
        })
    };

    return (
        <div id={styles["activate-auths"]}>
            {authentications.map(auth => {
                const startDateTime = new Date(auth.start);
                const endDateTime = new Date(auth.end);
                return (
                    <div key={auth.id} id={`auth-${auth.id}`} className={styles["activate-auth"]}>
                        
                        {startDateTime > currentTime && (
                            <>
                                <div className={`${styles["gray-08em"]} v1`}>아직 인증이 시작되지 않았습니다</div>
                                <div className={styles["gray-08em"]}>인증시간</div>
                                <div>{auth.start}</div>
                            </>
                        )}
                        {endDateTime < currentTime && (
                            <>
                                <div className={`${styles["gray-08em"]} v1`}>이미 종료된 인증입니다.</div>
                                <div className={styles["gray-08em"]}>[ 인증시간 ]</div>
                                <div>{auth.start}</div>
                                <div className={styles["activate-auth-bottom"]}>
                                    <div></div>
                                    <a onClick={() => closeAuth(auth.id)} className={styles["blue-bc-text"]}>인증마감</a>
                                </div>
                            </>
                        )}
                        {startDateTime <= currentTime && endDateTime >= currentTime && (
                            <>
                                <div className={`${styles["main-color-08em"]} v1`}>현재 활성화 된 인증</div>
                                <div className={styles["gray-08em"]}>[ 인증시간 ]</div>
                                <div>{auth.start}</div>
                                <div className={styles["activate-auth-bottom"]}>
                                    <div></div>
                                    {auth.participated ? (
                                        <div className={styles["green-bc-text"]}>참여완료</div>
                                    ) : (
                                        <a href={`/group_activity/create_authentication/${room_id}/${auth.id}`} onClick={() => checkCurTime(auth.end)} className={styles["auth-btn-style red-btn"]}>인증하기</a>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default AuthenticationSpaceComponent;
