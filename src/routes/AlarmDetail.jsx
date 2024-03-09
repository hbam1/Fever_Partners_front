import React, { useState, useEffect } from "react";
import styles from "./css/Alarm.module.css";
import { AuthAPI } from "../apis/AuthAPI";
import { useParams } from "react-router-dom";

const AlarmDetail = () => {
  const [alarm, setAlarm] = useState({});
  const alarmFrom = alarm?.alarm_from;
  const alarmGoal = alarm?.goal;
  const alarmRoom = alarm?.room;
  const { alarm_id } = useParams();

  useEffect(() => {
    AuthAPI.get(`/api/alarms/retrieve/${alarm_id}/`)
      .then((response) => {
        setAlarm(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className={styles.contentWrap}>
      <div className={styles.header}>
        <a className={styles.goBackLink} href="/alarm">
          <i className="ri-arrow-left-s-line"></i>
        </a>
        <a className={styles.hideArrowIcon} href="">
          <i className="ri-arrow-left-s-line"></i>
        </a>
      </div>
      <div className={styles.alarmContentMain}>
        <p className={styles.fs15emBold}>
          <span className={styles.mainColorText}>{alarmFrom?.nickname}</span>{" "}
          님의 요청!
        </p>
        <p>
          당신의 목표{" "}
          <span className={styles.mainColorText}>'{alarmGoal?.title}'</span> 을
          눈여겨본{" "}
          <span className={styles.mainColorText}>{alarmFrom?.nickname}</span>
          님이 <br />
          그룹가입을 제안했습니다.
        </p>
        <p>
          제안된 그룹:{" "}
          <span className={styles.mainColorText}>{alarmRoom?.title}</span>
        </p>
        <p>
          방장:{" "}
          <span className={styles.mainColorText}>
            {alarmRoom?.master.nickname}
          </span>
        </p>
        <p>
          방장의 Fever:{" "}
          <span className={styles.mainColorText}>{alarmRoom?.master.fuel}</span>
        </p>
        <p>
          활동태그:{" "}
          <span className={styles.mainColorText}>
            {" "}
            {alarmRoom?.activity_tags.map((tag) => tag.tag_name)}
          </span>
        </p>
        <div>
          인증:
          <span className={styles.mainColorText}>
            {alarmRoom?.cert_required ? " 필수" : " 선택"}
          </span>
          {alarmRoom?.cert_required && (
            <div>
              벌금:{" "}
              <span className={styles.mainColorText}>
                {alarmRoom?.penalty_value}🪙
              </span>
              <br />
              보증금:{" "}
              <span className={styles.mainColorText}>
                {alarmRoom?.deposit}🪙
              </span>
            </div>
          )}
        </div>
        <div className={styles.horizontalBtns}>
          <div>
            <button
              onclick="acceptRequest({{alarm.id}})"
              className={styles.whiteMainBtn}
            >
              수락
            </button>
            <form
              method="POST"
              action="{% url 'alarm:reject_request' alarm.id %}"
            >
              <button type="submit" className={styles.whiteMainBtn}>
                거절
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlarmDetail;
