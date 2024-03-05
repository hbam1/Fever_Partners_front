import React, { useState, useEffect } from "react";
import styles from "./css/Alarm.module.css";
import { AuthAPI } from "../apis/AuthAPI";

const AlarmDetail = () => {
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
        <p>알림 디테일 페이지</p>
      </div>
    </div>
  );
};

export default AlarmDetail;
