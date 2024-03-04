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
    AuthAPI.get(`/api/goals/${goalId}`)
      .then(response => {
        setGoal(response.data);
      })
      .catch(error => {
        console.error('Error fetching goal data:', error);
      });

    AuthAPI.get(`/api/goals/recommend_group/${goalId}`)
      .then(response => {
        setRooms(response.data);
      })
      .catch(error => {
        console.error('Error fetching rooms data:', error);
      });
  };

  const onRegisterRequest = () => {

  };

  return (
    <div className={styles.wrap}>
      <div className={styles.title_container}>
        <h5>나의 목표</h5>
      </div>
      <div className={[styles.recom_container, styles.basis_goal].join(" ")}>
        <h3>{goal.title}</h3>
        <p>
          <span>내용</span>
          {goal.content}
        </p>
        <p>
          <span>태그</span>
          {goal.tags && goal.tags.map(tag => tag)}
        </p>
        <p>
          <span>활동태그</span>
          {goal.activity_tags && goal.activity_tags.map(activityTag => activityTag)}
        </p>
      </div>
      <div className={styles.title_container}>
        <h5>추천된 그룹 리스트</h5>
      </div>
      {rooms.map(room => (
        <div className={[styles.recom_container, styles.recom_object_container].join(" ")} key={room.id}>
          <div>
            <h3>{room.title}</h3>
            <p>
              <span>방장</span>
              {room.master.nickname}
            </p>
            <p>
              <span>태그</span>
              {room.tags && room.tags.map(tag => tag.tag_name)}
            </p>
            <p>
              <span>활동태그</span>
              {room.activity_tags && room.activity_tags.map(activityTag => activityTag.tag_name)}
            </p>
            <p>
              <span>인증</span>
              {room.cert_required ? '필수' : '선택'}
              {room.cert_required &&
                <>
                  <span>벌금</span>
                  {room.penalty_value}🪙
                  <span>보증금</span>
                  {room.deposit}🪙
                </>
              }
            </p>
            <button
              className={styles.register_btn}
              onClick={onRegisterRequest(room.id)}>가입신청</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GroupRecommendation;