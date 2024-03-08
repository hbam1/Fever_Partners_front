import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import styles from "./css/GroupActivityBase.module.css";
import  MemberManagement from '../components/MemberManagement';
import Accept from '../components/Accept';
import Invite from '../components/Invite';

function GroupManagement({}) {
    const [selectedTab, setSelectedTab] = useState('');
    const selectComponent = (tab) => {
        switch (tab) {
            case 'memberManagement':
                return <MemberManagement />;
            case 'accept':
                return <Accept />;
            case 'invite':
                return <Invite />;
            // case 'free_board':
            //     return <FreeBoardComponent />;
            default:
                return null;
        }
    };
    useEffect(() => {
        var room_id = '{{ room_id }}';
        var previousPage = document.referrer;
        
        if (previousPage.includes(window.location.origin + '/group_activity/auth/') || previousPage.includes(window.location.origin + '/group_activity/authentication/')) {
            setSelectedTab('accept');
        } else {
            setSelectedTab('memberManagement');
        }
    }, []);

    return (
        <div>
            <div id={styles.GroupManagementBox}>
                <div className={styles.header}>
                        <Link className={styles.goBack} to="/group_activity/${id}">
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
                    </div>
                    <div id={styles.groupActivityContent}>
                        {selectComponent(selectedTab)}
                    </div>
                </div>
                <div className={styles.footer}>
                <Link to={`/my_groups`} className={styles.footer_link}>
                    <div className={styles.footer_item}>
                        <i className="fa-solid fa-user-group footer-icon"></i>
                        <span className={styles.footer_text}>내 그룹</span>
                    </div>
                </Link>
                <Link to={`/my_goals`} className={styles.footer_link}>
                    <div className={styles.footer_item}>
                        <i className="fa-solid fa-bullseye footer-icon"></i>
                        <span className={styles.footer_text}>내 목표</span>
                    </div>
                </Link>
                <Link to={`/achievement_report_list`} className={styles.footer_link}>
                    <div className={styles.footer_item}>
                        <i className="ri-file-list-3-line footer-icon"></i>
                        <span className={styles.footer_text}>달성보고</span>
                    </div>
                </Link>
            </div>
            </div>
        </div>
    );
}

export default GroupManagement;

