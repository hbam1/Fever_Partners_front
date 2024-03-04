import React, { useState, useEffect } from "react";
import styles from "./css/Alarm.module.css";
import { AuthAPI } from "../apis/AuthAPI";

const Alarm = () => {
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
    </div>
  );
};

export default Alarm;
