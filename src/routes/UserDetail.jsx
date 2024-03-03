import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./css/UserDetail.module.css";
import { AuthAPI } from "../apis/AuthAPI";
import noImage from "../assets/noImage.png";

const UserDetail = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    AuthAPI.get("/api/users/detail/")
      .then((response) => {
        setUserData(response.data);
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
        <p className={styles.roomTitle}>마이페이지</p>
        <a className={styles.hideArrowIcon} href="">
          <i className="ri-arrow-left-s-line"></i>
        </a>
      </div>
      <div className={styles.userDetailMain}>
        <p className={styles.boldText}>
          <span className={styles.mainColorText}>{userData.nickname}</span>님의
          마이페이지
        </p>
        <img className={styles.profileImage} src={noImage} />
        <p className={`${styles.userDetailBox} ${styles.gray08em}`}>
          이메일: {userData.email}
        </p>
        <p className={`${styles.userDetailBox} ${styles.gray08em}`}>
          보유 코인: {userData.coin}🪙
        </p>
      </div>
    </div>
  );
};

export default UserDetail;
