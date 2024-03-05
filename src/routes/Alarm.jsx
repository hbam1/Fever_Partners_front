import React, { useState, useEffect } from "react";
import styles from "./css/Alarm.module.css";
import { AuthAPI } from "../apis/AuthAPI";

const Alarm = () => {
  const [alarms, setAlarms] = useState([]);

  useEffect(() => {
    AuthAPI.get("/api/alarms/list/")
      .then((response) => {
        setAlarms(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className={styles.userDetailWrap}>
      <div className={styles.header}>
        <a className={styles.goBackLink} href="/main">
          <i className="ri-arrow-left-s-line"></i>
        </a>
        <p className={styles.roomTitle}>알림창</p>
        <a className={styles.hideArrowIcon} href="">
          <i className="ri-arrow-left-s-line"></i>
        </a>
      </div>
      <div className={styles.alarmListMain}>
        <ul>
          {alarms.map((alarm) => (
            <li key={alarm.id}>
              <p>
                <span className={styles.mainColorText}>{alarm.alarm_from}</span>{" "}
                님의 요청
              </p>
              <a href="" className={styles.requestDetailBtn}>
                상세보기
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Alarm;
