import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AuthAPI } from "../apis/AuthAPI";
import styles from "./css/AchievementReportDetail.module.css";

const AchievementReportDetail = () => {
    const { id } = useParams();
    const [report, setReportDetail] = useState(null);

    useEffect(() => {
        AuthAPI
            .get(`/api/goals/achievement_reports/${id}/`)
            .then(response => {
                setReportDetail(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [id]);

    return (
        <div>
            <div className={styles.header}>
                <Link to="/achievement_report_list/" className={styles.goBackLink}>
                    <i className="ri-arrow-left-s-line"></i>
                </Link>
                <p className={styles.roomTitle}>달성보고 상세</p>
                <i className={`ri-arrow-left-s-line ${styles.hideArrowIcon}`}></i>
            </div>
            <div className={styles.reportDetailWrap}>
                {report && (
                    <>
                        <div>
                            <span className={styles.reportSpan}>목표</span>
                            <div>{report.goal.title}</div>
                        </div>
                        <div>
                            <span className={styles.reportSpan}>달성자</span>
                            <div>{report.goal.user.nickname}</div>
                        </div>
                        <div>
                            <span className={styles.reportSpan}>내용 및 달성후기</span>
                            <div>{report.content}</div>
                        </div>
                        {report.image && (
                            <img className={styles.reportImage} src={report.image} alt="이미지" />
                        )}
                        <br />
                        <div className={styles.reportReactionBtns}>
                            <div>
                                <button id='report-love-btn'>
                                    <i className="ri-heart-add-line"></i>
                                </button>
                                <label htmlFor="report-love-btn"></label>
                                <span id='report-love-count'>{report.reacted_love ? report.reacted_love.length : 0}</span>
                            </div>

                            <div>
                                <button id='report-like-btn'>
                                    <i className="ri-thumb-up-line"></i>
                                </button>
                                <label htmlFor="report-like-btn"></label>
                                <span id='report-like-count'>{report.reacted_respectful ? report.reacted_respectful.length : 0}</span>
                            </div>

                            <div>
                                <button id='report-dislike-btn'>
                                    <i className="ri-thumb-down-line"></i>
                                </button>
                                <label htmlFor="report-dislike-btn"></label>
                                <span id='report-dislike-count'>{report.reacted_dislike ? report.reacted_dislike.length : 0}</span>
                            </div>
                            <div>
                                <button id='report-user-report-btn'>
                                    <i className="ri-alarm-warning-line"></i>
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default AchievementReportDetail;
