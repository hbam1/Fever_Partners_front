import React, { useEffect, useState } from 'react';
import { AuthAPI } from "../apis/AuthAPI";
import noImage from "../assets/noImage.png";

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
                    <div key={member.id} id={`member-${member.id}`} className="member-card">
                        <div className="member-info">
                            <img
                                src={member.profile_image ? member.profile_image : noImage}
                                alt="프로필 이미지"
                                className="profile-image-group"
                            />
                            <h3 className="member-nickname">{member.nickname}</h3>
                            <div className="action-buttons">
                                <button className="action-button" onClick={() => expelMember(member.id, roomId)}>추방</button>
                                <button className="action-button" onClick={() => transferMaster(member.id, roomId)}>관리장 위임</button>
                            </div>
                        </div>
                    </div>
                )
            ))}
        </div>
    );
};

export default MemberManagement;