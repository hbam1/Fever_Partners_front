import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AuthAPI } from "../apis/AuthAPI";
import styles from "./css/Form.module.css";

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
    }, [id]);

    const handleContentChange = (event) => {
        setContent(event.target.value);
    };

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        formData.append('goal', id);

        const achievementContentWarning = document.getElementById("achievement-content-warning");
        achievementContentWarning.innerHTML = "";

        // 유효성 검사
        if (content.trim() === '') {
            achievementContentWarning.innerHTML = '내용을 입력해주세요.';
            setIsValid(false);
            return;
        } else {
            setIsValid(true);
        }

        if (isValid) {
            AuthAPI.post(`/api/goals/achievement_reports/create/${id}/`, formData)
                .then((response) => {
                    if (response.status >= 200) { 
                        window.location.href = window.location.origin + "/goal/achievement_report/report_list";
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit} encType="multipart/form-data">
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
                            required
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
                            <button type="submit">보고하기</button>
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
        </form>
    );
}

export default AchievementReportForm;
