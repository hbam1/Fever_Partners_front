import styles from "./css/MyGoals.module.css";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Goal from "../components/Goal";
import { goalList } from "../apis/goal";
import { useEffect, useState } from "react";

const MyGoals = () => {
    const [userGoals, setGoals] = useState([]);

    useEffect(() => {
        getGoalList();
    }, [])

    const getGoalList = async () => {
        try {
            const list = await goalList();
            setGoals(list);
        } catch (error) {
            console.error("Error getting goals info:", error);
            window.location.href = window.location.origin;
        }
        
    }

    return (
        <div>
            <header className={styles.header}>
                <Link className={styles.go_back} to="/main">
                    <i class="ri-arrow-left-s-line"></i>
                </Link>
                <p>목표</p>
                <i class="ri-arrow-left-s-line" style={{ color: "white" }}></i>
            </header>
            <div className={styles.group_wrap}>
                {userGoals.map((goal) => (
                    <Goal 
                        id={goal.id}
                        title={goal.title}
                        content={goal.content}
                        tags={goal.tags}
                        activityTags={goal.activity_tags}
                        isInGroup={goal.is_in_group}
                        isCompleted={goal.is_completed}
                    />
                ))}
            </div>
            <Footer />
        </div>
    );
}

export default MyGoals