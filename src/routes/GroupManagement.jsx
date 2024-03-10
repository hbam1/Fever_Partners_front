import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import {Link} from 'react-router-dom';
import styles from "./css/GroupActivityBase.module.css";
import  MemberManagement from '../components/MemberManagement';
import AuthenticationList from '../components/AuthenticationList';
import InvitationSearch from '../components/DirectInvitation';
import RoomSetting from '../components/RoomSetting';
import Footer from '../components/Footer';
import {AuthAPI} from "../apis/AuthAPI"

function GroupManagement() {
    const [selectedTab, setSelectedTab] = useState('');
    const { roomId } = useParams();
    const [room, setRoom] = useState('');

    useEffect(() => {

        AuthAPI.get(`/api/rooms/${roomId}/`)
            .then(response => {
                setRoom(response.data);
            })
            .catch(error => {
                console.error(error);
            });

        var previousPage = document.referrer;
        
        if (previousPage.includes(window.location.origin + '/group_activity/auth/') || previousPage.includes(window.location.origin + '/group_activity/authentication/')) {
            setSelectedTab('accept');
        } else {
            setSelectedTab('memberManagement');
        }
    }, []);

    const selectComponent = (tab) => {
        switch (tab) {
            case 'memberManagement':
                return <MemberManagement masterId={room.master.id} roomId={room.id}/>;
            case 'accept':
                return <AuthenticationList roomId={room.id}/>;
            case 'invite':
                return <InvitationSearch roomId={room.id}/>;
            case 'setting':
                return <RoomSetting roomId={room.id}/>;
            default:
                return null;
        }
    };

    return (
        <div>
            <div id={styles.GroupManagementBox}>
                <div className={styles.header}>
                        <Link className={styles.goBack} to={`/group_activity/${roomId}`}>
                            <i className="ri-arrow-left-s-line"></i>
                        </Link>
                        <p style={{ color: "white" }}>그룹 관리 페이지</p>
                        <i className="ri-arrow-left-s-line" style={{ color: "#db4455" }}></i>
                </div>
                <div className="groupAdminWrap" style={{ marginTop: '10vh' }}>
                    <div id={styles.groupSelectActivityList}>
                        <Link className={selectedTab === 'memberManagement' ? styles.selectedGroupTab : ''} onClick={() => setSelectedTab('memberManagement')}>멤버 관리</Link>
                        <Link id={styles.authSpace} className={selectedTab === 'accept' ? styles.selectedGroupTab : ''} onClick={() => setSelectedTab('accept')}>인증 수락</Link>
                        <Link className={selectedTab === 'invite' ? styles.selectedGroupTab : ''} onClick={() => setSelectedTab('invite')}>유저 초대</Link>
                        <Link className={selectedTab === 'setting' ? styles.selectedGroupTab : ''} onClick={() => setSelectedTab('setting')}>예약 설정</Link>
                    </div>
                    <div id={styles.groupManageMentContent}>
                        {room && selectComponent(selectedTab)}
                    </div>
                </div>
                <Footer></Footer>
            </div>
        </div>
    );
}

export default GroupManagement;

