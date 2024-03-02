import React, {useEffect, useState} from 'react';
import styles from "./css/AchievementReport.module.css";
import {Link} from 'react-router-dom';
import axios from 'axios';
import {AuthAPI} from "../apis/AuthAPI"

const AchievementReportList = () => {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        AuthAPI
            .get('/api/goals/achievement_reports/')
            .then(response => {
                setReports(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <div className={styles.reportWrap}>
            <div className={styles.header}>
                <a className={styles.goBackLink} href="/main">
                    <i className="ri-arrow-left-s-line"></i>
                </a>
                <p className={styles.roomTitle}>달성보고</p>
                <a className={styles.hideArrowIcon} href="">
                    <i className="ri-arrow-left-s-line"></i>
                </a>
            </div>
            <div className={styles.reportContainer}>
                {
                    reports.map(report => (
                        <div className={styles.reportCard} key={report.id}>
                            <Link key={report.id} to={`/achievement_report_detail/${report.id}`}>
                                {report.goal.title}
                            </Link>
                            <p>
                                <span className={styles.reportSpan}>달성자</span>
                                {report.goal.user.nickname}
                            </p>
                            <p className={`${styles.reportContent} ${styles.reportEllipsis}`}>
                                <span className={styles.reportSpan}>달성 후기</span>
                                {report.content}
                            </p>
                            <div className={styles.likeContainer}>
                                <i className="ri-thumb-up-line"></i>
                                <span id="report-like-count">
                                    {
                                        report.reacted_respectful
                                            ? report.reacted_respectful.length
                                            : 0
                                    }
                                </span>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default AchievementReportList;
