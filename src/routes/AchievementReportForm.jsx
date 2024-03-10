import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthAPI } from "../apis/AuthAPI";
import styles from "./css/Form.module.css";
import { Link } from "react-router-dom";

function AchievementReportForm() {
    const { id } = useParams();
    const [goal, setGoal] = useState({});
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [isValid, setIsValid] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await AuthAPI.get(`/api/goals/${id}/`);
                setGoal(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        if (id) {
            fetchData();
        }
    }, []);

    const handleContentChange = (event) => {
        setContent(event.target.value);
    };

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('content', content);
        if (image) {
            formData.append('image', image);
        }
        formData.append('goal_id', goal.id); 
        const achievementContentWarning = document.getElementById(
            "achievement-content-warning"
        );
        achievementContentWarning.innerHTML = "";
    
        // 유효성 검사
        if (content.trim() === '') {
            achievementContentWarning.innerHTML = '내용을 입력해주세요.';
            setIsValid(false);
        } else {
            setIsValid(true);
        }
    
        if (isValid) {
            AuthAPI.post(`/api/goals/achievement_reports/`, formData) 
            .then((response) => {
                if (response.ok) {
                    window.location.href = window.location.origin + "/goal/achievement_report/report_list";
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
        }
    };
    
    return (
        <div>
            <div className={styles.header}>
                <Link className={styles.goBack} to="/my_goals">
                    <i className="ri-arrow-left-s-line"></i>
                </Link>
                <p className={styles.roomTitle}>달성 보고</p>
                <a className={styles.hideArrowIcon} href="">
                    <i className="ri-arrow-left-s-line"></i>
                </a>
            </div>
            <div className={styles.formWrap}>
                <div className={styles.formDiv}>
                    <div>
                        <h3>{goal.title}</h3>
                    </div>
                    <div>
                        <label htmlFor="achievement-report-content">달성 내용 및 후기</label><br />
                        <textarea
                            id="achievement-report-content"
                            name="content"
                            rows="4"
                            cols="50"
                            required="required"
                            value={content}
                            onChange={handleContentChange}
                        ></textarea>
                        <div id="achievement-content-warning" className={styles.warning}></div>
                    </div>
                    <div>
                        <label htmlFor="achievement-report-image">사진 첨부</label><br />
                        <input
                            type="file"
                            id="achievement-report-image"
                            name="image"
                            onChange={handleImageChange}
                        />
                        <div className={styles.btn}>
                            <button type="button" onClick={handleSubmit}>보고하기</button>
                        </div>
                    </div>
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
                <Link to={"/achievement_report_list"} className={styles.footer_link}>
                    <div className={styles.footer_item}>
                        <i className="ri-file-list-3-line footer-icon"></i>
                        <span className={styles.footer_text}>달성보고</span>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default AchievementReportForm;
