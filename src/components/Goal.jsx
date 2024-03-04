import { Link } from "react-router-dom";
import styles from "../routes/css/MyGoals.module.css";
import PropTypes from "prop-types";

const Goal = ({ id, title, content, tags, activityTags, isInGroup, isCompleted}) => {
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

Goal.propTypes = {
    id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    isInGroup: PropTypes.bool.isRequired,
    isCompleted: PropTypes.bool.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    activityTags: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

export default Goal;
