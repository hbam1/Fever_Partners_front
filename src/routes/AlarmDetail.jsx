import React, { useState, useEffect } from "react";
import styles from "./css/Alarm.module.css";
import { AuthAPI } from "../apis/AuthAPI";
import { useParams } from "react-router-dom";

const AlarmDetail = () => {
  const [alarm, setAlarm] = useState({});
  const alarmFrom = alarm?.alarm_from;
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
      </div>
    </div>
  );
};

export default AlarmDetail;
