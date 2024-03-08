import styles from "./css/MyGroups.module.css";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Group from "../components/Group";
import { groupList } from "../apis/group";
import { useEffect, useState } from "react";

const MyGroups = () => {
    const [userGroups, setGroups] = useState([]);

    useEffect(() => {
        getGroupList();
    }, [])

    const getGroupList = async () => {
        try {
            const list = await groupList();
            setGroups(list);
        } catch (error) {
            console.error("Error getting groups info:", error);
            
            if (error.response && error.response.status === 401) {
                // 401 상태 코드를 받으면 로그인 페이지로 리디렉션합니다.
                window.location.href = window.location.origin;
            }
        }
    }

    return (
        <div>
            <header className={styles.header}>
                <Link className={styles.go_back} href="">
                    <i class="ri-arrow-left-s-line"></i>
                </Link>
                <p>그룹</p>
                <i class="ri-arrow-left-s-line" style={{ color: "white" }}></i>
            </header>
            <div className={styles.group_wrap}>
                {userGroups.map((group) => (
                    <Group 
                        id={group.id}
                        title={group.title}
                        master={group.master}
                        members={group.members}
                        tags={group.tags}
                        activityTags={group.activity_tags}
                        isActive={group.is_active}
                        currentUserId={group.current_user_id}
                        closingDate={group.closing_date}
                    />
                ))}
                
            </div>
            <Footer />
        </div>
    );
}

export default MyGroups;
