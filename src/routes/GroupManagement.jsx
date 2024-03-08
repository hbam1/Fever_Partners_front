import React from 'react';
import { Link } from 'react-router-dom'; 
import styles from "./css/GroupManagement.module.css";

function GroupManagement({}) {
    return (
        <div id={styles.GroupManagementBox}>
            <div className={`${styles.goalHeader} ${styles.goalHeaderW}`}>
                <header className={styles.header}>
                    <Link className={styles.goBack} to=""> 
                        <i className="ri-arrow-left-s-line"></i>
                    </Link>
                    <p>그룹 활동 페이지</p>
                    <i className="ri-arrow-left-s-line" style={{ color: "white" }}></i>
                </header>
            </div>
            <div className='GroupManagementMain'>
            
            </div>
        </div>
    );
}

export default GroupManagement;

