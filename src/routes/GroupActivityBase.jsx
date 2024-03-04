import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import styles from "./css/GroupActivityBase.module.css";

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

    return (
        <div id="group-activat-box">
            <div id="group-introbox">
                <div className='goal-header goal-header-w'>
                    <div className={styles.page_back_header}>
                        <Link to='group_management:group_list' className="page_back">
                            <i className="fa-solid fa-chevron-left"></i>
                        </Link>
                    </div>
                </div>
                <div id="group-intro-text">
                    <p className="white-title">{room.title}</p>
                    <div className="group-intro-tag">
                        {
                            room
                                .tags
                                .map((tag, index) => (<p key={index}>#{tag}</p>))
                        }
                    </div>
                    <p>{room.detail}</p>
                    <p>
                        인증 {
                            room.cert_required
                                ? '필수'
                                : '선택'
                        }
                        {
                            room.cert_required && (<> &nbsp;
                            &nbsp;
                            벌금 {
                                room.penalty_value
                            }
                            🪙 보증금 {
                                room.deposit
                        }
                        🪙 < />
                )}
                    </p>
                </div>
                <div id="group-admin-or-withdraw">
                    <a className="group-btn" href={`/group_management/${room.id}`}>그룹 관리</a>
                    <a className="group-btn" href={`/withdrawal/${room.id}`}>탈퇴하기</a>
                </div>
            </div>
            <div id="group-select-activity-list">
                <a href={`/member_list/${room.id}`} className="selected-group-tab">멤버</a>
                <a href={`/activate/${room.id}`} id="auth-space">인증 공간</a>
                <a href={`/show_log/${room.id}`}>활동 현황</a>
                <a href={`/free_board/${room.id}`}>게시판</a>
            </div>
            <div id="group-activity-content">
                {/* 이 곳에 컨텐츠 렌더링 */}
            </div>
            <div className="footer">
                <a
                    href="/group_management/group_list"
                    className="footer-link"
                    style={{
                        display: 'flex'
                    }}>
                    <div className="footer-item">
                        <i className="fa-solid fa-user-group footer-icon"></i>
                        <span className="footer-text">내 그룹</span>
                    </div>
                </a>
                <a
                    href="/goal_management/goal_list"
                    className="footer-link"
                    style={{
                        display: 'flex'
                    }}>
                    <div className="footer-item">
                        <i className="fa-solid fa-bullseye footer-icon"></i>
                        <span className="footer-text">내 목표</span>
                    </div>
                </a>
                <a
                    href="/goal_management/achievement_report_list"
                    className="footer-link"
                    style={{
                        display: 'flex'
                    }}>
                    <div className="footer-item">
                        <i className="ri-file-list-3-line footer-icon"></i>
                        <span className="footer-text">달성보고</span>
                    </div>
                </a>
            </div>
        </div>
    );
}

export default GroupActivityBase;
