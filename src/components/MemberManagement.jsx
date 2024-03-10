import React, { useEffect, useState } from 'react';
import { AuthAPI } from "../apis/AuthAPI";
import noImage from "../assets/noImage.png";
import styles from "../routes/css/MemberManagement.module.css";

const MemberManagement = ({ masterId, roomId }) => {
    const [members, setMembers] = useState([]);

    useEffect(() => {
        AuthAPI.get(`/api/rooms/${roomId}/activities/member_list/`)
            .then(response => {
                console.log(response.data);
                setMembers(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const expelMember = (memberId, roomId) => {
        // 모달창 작업 요망(용화)
        AuthAPI.put(`/api/rooms/${roomId}/activities/expel_member/${memberId}/`);
    };

    const transferMaster = (memberId, roomId) => {
        // 모달창 작업 요망(용화)
        AuthAPI.put(`/api/rooms/${roomId}/activities/transfer_master/${memberId}/`)
    };

    return (
        <div>
            {members.map(member => (
                member.id !== masterId && (
                    <div key={member.id} id={`member-${member.id}`} className={styles.memberCard}>
                        <div className={styles.memberInfo}>
                            <img
                                src={member.profile_image ? member.profile_image : noImage}
                                alt="프로필 이미지"
                                className={styles.profileImageGroup}
                            />
                            <h3 className={styles.memberNickname}>{member.nickname}</h3>
                            <div className={styles.actionButtons}>
                                <button className={styles.actionButton} onClick={() => expelMember(member.id, roomId)}>추방</button>
                                <button className={styles.actionButton} onClick={() => transferMaster(member.id, roomId)}>관리장 위임</button>
                            </div>
                        </div>
                    </div>
                )
            ))}
        </div>
    );
};

export default MemberManagement;
