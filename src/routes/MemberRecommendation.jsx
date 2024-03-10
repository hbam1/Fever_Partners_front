import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from "./css/GroupRecommendation.module.css";
import {AuthAPI} from "../apis/AuthAPI"
import noImage from "../assets/noImage.png";
import feverFire from "../assets/fire.gif"

const MemberRecommendation = () => {
    const { roomId } = useParams();
    const [room, setRoom] = useState({});
    const [goals, setGoals] = useState([]);

    useEffect(() => {
        AuthAPI.get(`/api/rooms/${roomId}/`)
            .then(response => {
                setRoom(response.data);
            })
            .catch(error => {
                console.error(error);
            });

        AuthAPI.get(`/api/rooms/recommend_member/${roomId}/`)
            .then(response => {
                setGoals(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const suggestJoin = (userId, goalId) => {
        const postData = {
            'alarm_to': userId,
            'goal': goalId,
            'room': room.id,
          }
          AuthAPI.post('/api/alarms/create/', postData)
          .then(response => {
            const btn = document.getElementById(`join-btn-${goalId}`)
            btn.disabled = true;
          })
    };

    return (
        <div className={styles.wrap}>
            <div className={styles.title_container}>
                <h5>나의 그룹</h5>
            </div>
            <div className={[styles.recom_container, styles.basis_goal].join(" ")}>
                <h3>{room.title}</h3>
                <p className={styles.field_container}>
                    <span>방장</span>
                    {room.master && <span>{room.master.nickname}</span>}
                </p>
                <p className={styles.field_container}>
                    <span>태그</span>
                    {room.tags && room.tags.map(tag => (
                        <span>{tag.tag_name}</span>
                    ))}
                </p>
                <p className={styles.field_container}>
                    <span>활동태그</span>
                    {room.activity_tags && room.activity_tags.map(activityTag => (
                        <span>{activityTag.tag_name}</span>
                    ))}
                </p>
                <p className={styles.field_container}>
                    <span>인증</span>
                    <span>{room.cert_required ? 'O' : 'X'}</span>
                </p>
            </div>

            <div className={styles.title_container}>
                <h5>추천된 유저 목록</h5>
            </div>

            {goals.map(goal => (
                <div className={styles.recom_container} key={goal.id}>
                    <div className={styles.horizontal_div}>
                        <div className={styles.recom_object_container}>
                            {goal.user && goal.user.profile_image ? (
                                <img
                                    src={`${goal.user.profile_image}`}
                                    alt="프로필 이미지"
                                    className={styles.profile_image}
                                />
                            ) : (
                                <img
                                    src= {noImage}
                                    alt="대체 이미지"
                                    className={styles.profile_image}
                                />
                            )}
                        </div>
                        <div>
                            <p className={styles.larger_font}>{goal.user && goal.user.nickname}</p>
                            <p className={styles.field_container}>
                                <span>Fever</span>
                                {goal.user && goal.user.fuel}
                                <img
                                    className={styles.fever_gif}
                                    src={feverFire}
                                    alt="열정마크 이미지"
                                />
                            </p>
                         </div>
                        <button
                            className={styles.join_button}
                            id={`join-btn-${goal.id}`}
                            onClick={() => suggestJoin(goal.user.id, goal.id)}
                        >
                            가입제안
                        </button>
                    </div>
                    <div className={styles.horizontal_div}>
                        <p className={styles.field_container}>
                            <span>목표</span>
                            {goal.title}
                        </p>
                        <p className={styles.field_container}>
                            <span>대면활동</span>
                            {goal.favor_offline ? '선호' : '비선호'}
                        </p>
                    </div>
                    <div className={styles.horizontal_div}>
                        <p className={styles.field_container}>
                            <span>태그</span>
                            {goal.tags && goal.tags.map(tag => (
                                <span>{tag.tag_name}</span>
                            ))}
                        </p>
                        <p className={styles.field_container}> 
                            <span>활동태그</span>
                            {goal.activity_tags && goal.activity_tags.map(activityTag => (
                                <span>{activityTag.tag_name}</span>
                            ))}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MemberRecommendation;
