import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from "./css/GroupRecommendation.module.css";
import {AuthAPI} from "../apis/AuthAPI"

const GroupRecommendation = () => {
  const { goalId } = useParams();
  const [goal, setGoal] = useState({});
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetchData(goalId);
  }, []);

  const fetchData = (goalId) => {
    AuthAPI.get(`/api/goals/${goalId}/`)
      .then(response => {
        setGoal(response.data);
      })
      .catch(error => {
        console.error(error);
      });

    AuthAPI.get(`/api/goals/recommend_group/${goalId}/`)
      .then(response => {
        setRooms(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const onRegisterRequest = (master, room) => {
    const postData = {
      'alarm_to': master.id,
      'goal': goal.id,
      'room': room.id,
    }
    AuthAPI.post('/api/alarms/create/', postData)
    .then(response => {
      const btn = document.getElementById(`register-btn-${room.id}`)
      btn.disabled = true;
    })
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.title_container}>
        <h5>나의 목표</h5>
      </div>
      <div className={[styles.recom_container, styles.basis_goal].join(" ")}>
        <h3>{goal.title}</h3>
        <p className={styles.field_container}>
          <span>내용</span>
          <span>{goal.content}</span>
        </p>
        <p className={styles.field_container}>
          <span>태그</span>
          {goal.tags && goal.tags.map(tag => 
            <span>{tag.tag_name}</span>
            )}
        </p>
        <p className={styles.field_container}>
          <span>활동태그</span>
          {goal.activity_tags && goal.activity_tags.map(activityTag => 
            <span>{activityTag.tag_name}</span>
            )}
        </p>
      </div>
      <div className={styles.title_container}>
        <h5>추천된 그룹 리스트</h5>
      </div>
      {rooms.map(room => (
        <div className={[styles.recom_container, styles.recom_object_container].join(" ")} key={room.id}>
            <h3>{room.title}</h3>
            <p className={styles.field_container}>
              <span>방장</span>
              {room.master.nickname}
            </p>
            <p className={styles.field_container}>
              <span>태그</span>
              {room.tags && room.tags.map(tag => 
                <span>{tag.tag_name}</span>)}
            </p>
            <p className={styles.field_container}>
              <span>활동태그</span>
              {room.activity_tags && room.activity_tags.map(activityTag => 
                <span>{activityTag.tag_name}</span>)}
            </p>
            <p className={styles.field_container}>
              <span>인증</span>
              {room.cert_required ? '필수' : '선택'}
              {room.cert_required &&
                <React.Fragment>
                  <span className={styles.penalty_detail_title}>벌금</span>
                  {room.penalty_value}🪙
                  <span className={styles.penalty_detail_title}>보증금</span>
                  {room.deposit}🪙
                </React.Fragment>
              }
            </p>
            <button
              className={styles.register_btn}
              id={`register-btn-${room.id}`}
              onClick={() => onRegisterRequest(room.master, room)}>가입신청</button>
        </div>
      ))}
    </div>
  );
};

export default GroupRecommendation;