import styles from "../routes/css/MyGroups.module.css";
import { Link } from "react-router-dom";
import React from 'react';

const Group = ({ id, title, master, members, tags, activityTags, isActive, closingDate, currentUserId }) => {
    const Title = () => {
        if (isActive) {
            return (
                // 그룹 활동 메인페이지
                <Link to={``}><h3>{title}</h3></Link>
            );
        } else {
            if (master.id === currentUserId) {
                // 유저 추천 링크
                return (
                    <Link to={``}><h3>{title}</h3></Link>
                );
            } else {
                // 경고창 띄우기
                return (
                    <Link to={``}><h3>{title}</h3></Link>
                );
            }
        }
        
    }

    const EndBtn = () => {
        const currentDate = new Date(); // 현재 날짜
        // 받은 날짜 데이터를 Date 객체로 변환
        const parsedReceivedDate = new Date(closingDate);
        if (master.id === currentUserId && currentDate > parsedReceivedDate) {
            return (
                <Link className={styles.ac_btn}>활동종료</Link>
            );
        }
        return;
    }

    const StartBtn = () => {
        if (!isActive && master.id === currentUserId) {
            return (
                <React.Fragment>
                    <Link className={styles.ac_btn} to="">활동개시</Link>
                    <Link className={styles.ac_btn} to="">유저추천</Link>
                </React.Fragment>
            );
        }
    }

    return (
        <div className={styles.group_div}>
            <div className={styles.no_ac}>
                <div className={styles.group_icon}>
                    <div className={styles.icon}>
                        <i class="ri-group-line"></i>
                        <Title />
                    </div>
                    <div>
                        <Link className={styles.ac_btn} to="" style={{ display: isActive ? 'inline-block' : 'none'}}>그룹</Link>
                        <EndBtn />
                        <StartBtn />
                    </div>
                </div>
            </div>
            <div class={styles.room_detail}>
                <p><span>방장</span> {master.nickname} &nbsp;&nbsp; <span>인원수 </span>{members.length}</p>
                <p><span>태그 </span>{tags.map(tag => tag.tag_name).join(' ')}</p>
                <p><span>활동태그 </span>{activityTags.map(tag => tag.tag_name).join(' ')}</p>
                <p style={{ display: isActive ? 'inline-block' : 'none'}}><span>활동 종료일 </span>{closingDate}</p>
            </div>
        </div>
    );
}

export default Group;
