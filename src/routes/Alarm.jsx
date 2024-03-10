import { useState, useEffect } from "react";
import styles from "./css/Alarm.module.css";
import { AuthAPI } from "../apis/AuthAPI";
import { Link } from "react-router-dom";

const Alarm = () => {
  const [alarms, setAlarms] = useState([]);
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    AuthAPI.get("/api/alarms/list/")
      .then((response) => {
        setAlarms(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // 현재 로그인 한 유저 정보를 가져옴
  useEffect(() => {
    AuthAPI.get("/api/users/current/detail/")
      .then((response) => {
        setCurrentUser(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className={styles.contentWrap}>
      <div className={styles.header}>
        <a className={styles.goBackLink} href="/main">
          <i className="ri-arrow-left-s-line"></i>
        </a>
        <p className={styles.roomTitle}>알림창</p>
        <a className={styles.hideArrowIcon} href="">
          <i className="ri-arrow-left-s-line"></i>
        </a>
      </div>
      <div className={styles.alarmContentMain}>
        <ul>
          {alarms.map((alarm) => (
            <li key={alarm.id}>
              <p>
                <span className={styles.mainColorText}>
                  {alarm.alarm_from.nickname}
                </span>{" "}
                {/* 현재 유저가 그룹장인지 멤버인지 구분해서 알림 표시 */}
                {currentUser?.id === alarm.room?.master.id
                  ? " 님이 그룹가입 신청"
                  : " 님이 그룹가입 제안"}
              </p>
              <Link
                to={`/alarm_detail/${alarm.id}/`}
                className={styles.requestDetailBtn}
              >
                상세보기
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Alarm;
