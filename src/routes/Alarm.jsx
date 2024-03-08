import { useState, useEffect } from "react";
import styles from "./css/Alarm.module.css";
import { AuthAPI } from "../apis/AuthAPI";
import { Link } from "react-router-dom";

const Alarm = () => {
  const [alarms, setAlarms] = useState([]);

  useEffect(() => {
    AuthAPI.get("/api/alarms/list/")
      .then((response) => {
        setAlarms(response.data);
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
            //alarm 3개 구분하는 로직 구현해야 함
            <li key={alarm.id}>
              <p>
                <span className={styles.mainColorText}>
                  {alarm.alarm_from.nickname}
                </span>{" "}
                님의 요청
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
