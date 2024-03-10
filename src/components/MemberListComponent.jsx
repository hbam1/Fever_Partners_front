import React, { useEffect, useState } from 'react';
import {AuthAPI} from "../apis/AuthAPI"
import feverFire from "../assets/fire.gif"
import noImage from "../assets/noImage.png";
import styles from "../routes/css/GroupRecommendation.module.css";

const MemberListComponent = (room) => {
    const [memberList, setMemberList] = useState([]);
    const roomData = room.room;
    console.log("Room Data", roomData);
    useEffect(() => {
        AuthAPI.get(`/api/rooms/${roomData.id}/activities/member_list/`)
            .then(response => {
                console.log("Members", response.data);
                setMemberList(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <div id="group-member-list">
            {memberList.map((member) => (
                <div key={member.id} className={member.id === roomData.master.id ? 'group-master-intro' : 'group-member-intro'}>
                    <img
                        src={member.profile_image ? `${member.profile_image}` : noImage }
                        alt="프로필 이미지"
                        className="profile-image-group"
                    />
                    <div className="member-intro-text">
                        <h3><span className='member-field-span'></span>{member.id === roomData.master.id ? '👑' : ''}{member.nickname}{member.id === roomData.master.id ? '👑' : ''}</h3>
                        <div><span className='member-field-span'>목표</span>{member.goal}</div>
                        <div className="d3">
                            <span className='member-field-span'>Fever&nbsp;</span>{member.fuel}
                            <img className={styles.fever_gif} src={feverFire} alt="GIF 이미지" />
                            {roomData.cert_required && (
                                <span className='member-field-span'>&nbsp;&nbsp;&nbsp;보증금&nbsp;{member.deposit_left}🪙</span>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MemberListComponent;
