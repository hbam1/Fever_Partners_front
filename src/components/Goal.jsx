import { Link } from "react-router-dom";
import styles from "../routes/css/MyGoals.module.css";

const Goal = ({ id, title, content, tags, activityTags, isInGroup, isCompleted}) => {
    console.log(activityTags)
    return (
        <div className={styles.group_div}>
            <div className={styles.group_icon2}>
                <i class="ri-flag-2-line"></i>
                {isInGroup ? 
                    <Link>
                        {title}
                        <span> 그룹에 참여하고있어요!</span>
                    </Link> :
                    <Link>
                        {title}
                        <span> 새 그룹을 찾아보세요!</span>
                    </Link>
                }
            </div>
            <p><span>내용 </span>{content}</p>
            <p>
                <span>태그 </span>
                {tags.map(tag => tag.tag_name).join(' ')}
            </p>
            <p>
                <span>활동태그 </span>
                {activityTags.map(tag => tag.tag_name).join(' ')}
            </p>
            <div className={styles.goal_btns}>
                <Link className={styles.ac_btn}>삭제</Link>
                <Link className={styles.ac_btn} style={{ display: isCompleted ? 'none' : 'inline-block' }}>목표 달성 보고</Link>
                <Link className={styles.ac_btn} style={{ display: isInGroup ? 'none' : 'inline-block' }}>그룹추천</Link>
            </div>
        </div>
    );
}

export default Goal;
