import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from "./css/GroupActivityBase.module.css";
import MemberListComponent from '../components/MemberListComponent';
import AuthenticationSpaceComponent from '../components/AuthenticationSpaceComponent';
import ShowLogComponent from '../components/ShowLogComponent';
import { useParams } from 'react-router-dom';
import {AuthAPI} from "../apis/AuthAPI"

const GroupActivityBase = () => {
    const { roomId } = useParams();
    const [room, setRoom] = useState('');
    const [selectedTab, setSelectedTab] = useState('');

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
            setSelectedTab('activate');
        } else {
            setSelectedTab('member');
        }
    }, []);

    const selectComponent = (tab) => {
        switch (tab) {
            case 'member':
                return <MemberListComponent room={room}/>;
            case 'activate':
                return <AuthenticationSpaceComponent room={room}/>;
            case 'show_log':
                return <ShowLogComponent room={room}/>;
            default:
                return null;
        }
    };

    return (
        <div id={styles.groupActivatBox}>
            <div id={styles.groupIntrobox}>
                <div className={`${styles.goalHeader} ${styles.goalHeaderW}`}>
                    <div className={styles.pageBackHeader}>
                        <Link to='/my_groups' className={styles.pageBack}>
                            <i className="fa-solid fa-chevron-left"></i>
                        </Link>
                    </div>
                </div>
                <div id={styles.groupIntroText}>
                    <p className={styles.whiteTitle}>{room.title}</p>
                    <div className={styles.groupIntroTag}>
                        {
                            room.tags && (room
                                .tags
                                .map((tag) => (<p key={tag.id}>#{tag.tag_name}</p>)))
                        }
                    </div>
                    <p className={styles.groupDetail}>{room.detail}</p>
                    <p>
                        인증 {
                            room.cert_required && (room.cert_required
                                ? '필수'
                                : '선택')
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
                                🪙 </>
                        }
                    </p>
                </div>
                <div id={styles.groupAdminOrWithdraw}>
                    <a className={styles.groupBtn} href={`/group_management/${room.id}`}>그룹 관리</a>
                    <a className={styles.groupBtn} href={`/withdrawal/${room.id}`}>탈퇴하기</a>
                </div>
            </div>
            <div id={styles.groupSelectActivityList}>
                <Link className={selectedTab === 'member' ? styles.selectedGroupTab : ''} onClick={() => setSelectedTab('member')}>멤버</Link>
                <Link id={styles.authSpace} className={selectedTab === 'activate' ? styles.selectedGroupTab : ''} onClick={() => setSelectedTab('activate')}>인증 공간</Link>
                <Link className={selectedTab === 'show_log' ? styles.selectedGroupTab : ''} onClick={() => setSelectedTab('show_log')}>활동 현황</Link>
                <Link className={selectedTab === 'free_board' ? styles.selectedGroupTab : ''} onClick={() => setSelectedTab('free_board')}>게시판</Link>
            </div>
            <div id={styles.groupActivityContent}>
                {room && selectComponent(selectedTab)}
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
    );
}

export default GroupActivityBase;
