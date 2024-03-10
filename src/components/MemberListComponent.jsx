import React, {useEffect, useState} from 'react';
import {AuthAPI} from "../apis/AuthAPI"
import feverFire from "../assets/fire.gif"
import noImage from "../assets/noImage.png";
import styles from "../routes/css/MemberList.module.css";

const MemberListComponent = (room) => {
    const [memberList, setMemberList] = useState([]);
    const roomData = room.room;
    console.log("Room Data", roomData);
    useEffect(() => {
        AuthAPI
            .get(`/api/rooms/${roomData.id}/activities/member_list/`)
            .then(response => {
                console.log("Members", response.data);
                setMemberList(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <div className={styles.groupMemberList}>
            {
                memberList.map((member) => (
                    <div
                        key={member.id}
                        className={member.id === roomData.master.id
                            ? styles.groupMasterIntro
                            : styles.groupMemberIntro}>
                        <img
                            src={member.profile_image
                                ? `${member.profile_image}`
                                : noImage}
                            alt="프로필 이미지"
                            className={styles.profileImageGroup}/>
                        <div className={styles.memberIntroText}>
                            <h3>
                                <span className={styles.memberFieldSpan}></span>{
                                    member.id === roomData.master.id
                                        ? '👑'
                                        : ''
                                }{member.nickname}{
                                    member.id === roomData.master.id
                                        ? '👑'
                                        : ''
                                }</h3>
                            <div>
                                <span className={styles.memberFieldSpan}>목표&nbsp;</span>{member.goal}</div>
                            <div className={styles.d3}>
                                <span className={styles.memberFieldSpan}>Fever&nbsp;</span>{member.fuel}
                                <img className={styles.feverGif} src={feverFire} alt="GIF 이미지"/> {
                                    roomData.cert_required && (
                                        <><span className={styles.memberFieldSpan}>&nbsp;&nbsp;보증금&nbsp;</span>{member.deposit_left}🪙</>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default MemberListComponent;
