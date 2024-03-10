import React, { useState, useEffect } from "react";
import styles from "./css/Alarm.module.css";
import { AuthAPI } from "../apis/AuthAPI";
import { useParams, useNavigate } from "react-router-dom";

const AlarmDetail = () => {
  const [alarm, setAlarm] = useState({});
  const [currentUser, setCurrentUser] = useState();
  const alarmFrom = alarm?.alarm_from;
  const alarmGoal = alarm?.goal;
  const alarmRoom = alarm?.room;
  const { alarm_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    AuthAPI.get(`/api/users/alarms/${alarm_id}/`)
      .then((response) => {
        setAlarm(response.data);
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

  // 거절을 눌렀을 때
  const handleReject = async (event) => {
    event.preventDefault();

    try {
      await AuthAPI.delete(`/api/users/alarms/${alarm_id}/reject/`);
      navigate("/alarm");
    } catch (error) {
      console.error("API 호출 중 오류 발생:", error);
    }
  };

  // 수락을 눌렀을 때
  const handleAccept = async (event) => {
    event.preventDefault();
    try {
      await AuthAPI.delete(`/api/users/alarms/${alarm_id}/accept/`);
      navigate("/alarm");
    } catch (error) {
      console.error("API 호출 중 오류 발생:", error);
    }
  };

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

      {/* 현재 유저가 그룹장인지 멤버인지 구분해서 알림 디테일 표시 */}
      {currentUser?.id === alarmRoom?.master.id ? (
        <div className={styles.alarmContentMain}>
          <p className={styles.fs15emBold}>
            <span className={styles.mainColorText}>{alarmFrom?.nickname}</span>{" "}
            님의 그룹가입 신청!
          </p>
          <p>
            <span className={styles.mainColorText}>'{alarmGoal?.title}'</span>{" "}
            을 목표로 하는{" "}
            <span className={styles.mainColorText}>{alarmFrom?.nickname}</span>
            님이 <br />
            <span className={styles.mainColorText}>
              '{alarmRoom?.title}'
            </span>{" "}
            에 가입하기를 희망합니다.
          </p>
          <p>
            Fever:{" "}
            <span className={styles.mainColorText}>{alarmFrom?.fuel}</span>
          </p>
          <p>
            태그:{" "}
            <span className={styles.mainColorText}>
              {alarmRoom?.tags.map((tag) => tag.tag_name).join(" ")}
            </span>
          </p>
          <p>
            활동태그:{" "}
            <span className={styles.mainColorText}>
              {" "}
              {alarmRoom?.activity_tags.map((tag) => tag.tag_name)}
            </span>
          </p>
          <div className={styles.horizontalBtns}>
            <div>
              <button className={styles.whiteMainBtn} onClick={handleAccept}>
                수락
              </button>
              <form onSubmit={handleReject}>
                <button type="submit" className={styles.whiteMainBtn}>
                  거절
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.alarmContentMain}>
          <p className={styles.fs15emBold}>
            <span className={styles.mainColorText}>{alarmFrom?.nickname}</span>{" "}
            님의 그룹가입 제안!
          </p>
          <p>
            당신의 목표{" "}
            <span className={styles.mainColorText}>'{alarmGoal?.title}'</span>{" "}
            을 눈여겨본{" "}
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
            <span className={styles.mainColorText}>
              {alarmRoom?.master.fuel}
            </span>
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
              <button className={styles.whiteMainBtn} onClick={handleAccept}>
                수락
              </button>
              <form onSubmit={handleReject}>
                <button type="submit" className={styles.whiteMainBtn}>
                  거절
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlarmDetail;
