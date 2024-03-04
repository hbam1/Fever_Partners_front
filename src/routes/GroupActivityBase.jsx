import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import styles from "./css/GroupActivityBase.module.css";

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
    useEffect(() => {
        initializeAct();
    }, []);
    function initializeAct() {
        var room_id = '{{ room_id }}';
        var previousPage = document.referrer;
        
        if (previousPage.includes(window.location.origin + '/group_activity/auth/') || previousPage.includes(window.location.origin + '/group_activity/authentication/')) {
            document.addEventListener('DOMContentLoaded', function () {
                authActivate(room_id)
            });
        } else {
            document.addEventListener('DOMContentLoaded', function () {
                defaultActivate(room_id);
            });
        }
    }

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
                            room.cert_required && <> & nbsp;
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
                <a href={`group_activity/member_list/${room.id}`} className={styles.selectedGroupTab}>멤버</a>
                <a href={`group_activity/activate/${room.id}`} id={styles.authSpace}>인증 공간</a>
                <a href={`group_activity/show_log/${room.id}`}>활동 현황</a>
                <a href={`group_activity/free_board/${room.id}`}>게시판</a>
            </div>
            <div id={styles.groupActivityContent}>
                {/* 이 곳에 컨텐츠 렌더링 */}
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
