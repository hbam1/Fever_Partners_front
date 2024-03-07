import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import styles from "./css/GroupActivityBase.module.css";
import GroupActivityTab from '../apis/GroupActivityTab';
import MemberListComponent from './MemberListComponent';
import AuthenticationSpaceComponent from './AuthenticationSpaceComponent';
import ShowLogComponent from './ShowLogComponent';

// 더미데이터 사용, 나중에 url 수정
const GroupActivityBase = () => {
    const room = {
        id: 1,
        title: "그룹 제목",
        tags: [
            "태그1", "태그2", "태그3"
        ],
        detail: "그룹 상세 설명입니다. 이곳에는 그룹에 대한 자세한 설명이 들어갑니다.",
        cert_required: true,
        penalty_value: 1000,
        deposit: 5000
    };
    const [selectedTab, setSelectedTab] = useState('');

    const selectComponent = (tab) => {
        switch (tab) {
            case 'member':
                return <MemberListComponent />;
            case 'activate':
                return <AuthenticationSpaceComponent />;
            case 'show_log':
                return <ShowLogComponent />;
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
            setSelectedTab('activate');
        } else {
            setSelectedTab('member');
        }
    }, []);

    return (
        <div id={styles.groupActivatBox}>
            <div id={styles.groupIntrobox}>
                <div className={`${styles.goalHeader} ${styles.goalHeaderW}`}>
                    <div className={styles.pageBackHeader}>
                        <Link to='' className={styles.pageBack}>
                            <i className="fa-solid fa-chevron-left"></i>
                        </Link>
                    </div>
                </div>
                <div id={styles.groupIntroText}>
                    <p className={styles.whiteTitle}>{room.title}</p>
                    <div className={styles.groupIntroTag}>
                        {
                            room
                                .tags
                                .map((tag, index) => (<p key={index}>#{tag}</p>))
                        }
                    </div>
                    <p className={styles.groupDetail}>{room.detail}</p>
                    <p>
                        인증 {
                            room.cert_required
                                ? '필수'
                                : '선택'
                        }
                        {
                            room.cert_required && <> 
                            &nbsp;
                            벌금 {
                                room.penalty_value
                            }
                            🪙 보증금 {
                                room.deposit
                        }
                        🪙 < />}
                    </p>
                </div>
                <div id={styles.groupAdminOrWithdraw}>
                    <a className={styles.groupBtn} href={`/group_management/${room.id}`}>그룹 관리</a>
                    <a className={styles.groupBtn} href={`/withdrawal/${room.id}`}>탈퇴하기</a>
                </div>
            </div>
            <div id={styles.groupSelectActivityList}>
                <a href="#" className={selectedTab === 'member' ? styles.selectedGroupTab : ''} onClick={() => setSelectedTab('member')}>멤버</a>
                <a href="#" id={styles.authSpace} className={selectedTab === 'activate' ? styles.selectedGroupTab : ''} onClick={() => setSelectedTab('activate')}>인증 공간</a>
                <a href="#" className={selectedTab === 'show_log' ? styles.selectedGroupTab : ''} onClick={() => setSelectedTab('show_log')}>활동 현황</a>
                <a href="#" className={selectedTab === 'free_board' ? styles.selectedGroupTab : ''} onClick={() => setSelectedTab('free_board')}>게시판</a>
            </div>
            <div id={styles.groupActivityContent}>
                {selectComponent(selectedTab)}
            </div>
            <div className={styles.footer}>
                <Link to={``} className={styles.footer_link}>
                    <div className={styles.footer_item}>
                        <i className="fa-solid fa-user-group footer-icon"></i>
                        <span className={styles.footer_text}>내 그룹</span>
                    </div>
                </Link>
                <Link to={``} className={styles.footer_link}>
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
    );
}

export default GroupActivityBase;
