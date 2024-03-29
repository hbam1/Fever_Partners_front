import styles from "./css/Main.module.css";
import logo from "../assets/main_logo.png"
import {Link} from "react-router-dom";
import {logout, userInfo} from "../apis/user"
import {useState, useEffect} from 'react'

function Main() {
    const [data, showData] = useState({});
    useEffect(() => {
        getUserInfo();
    }, []);

    const getUserInfo = async () => {
        try {
            const user = await userInfo(); // userInfo 함수 호출하고 응답을 기다림
            showData(user);
        } catch (error) {
            console.error("Error getting user info:", error);
            window.location.href = window.location.origin;
        }
    }

    return (
        <div>
            <div id={styles.main_container}>
                <div className={styles.main_container_top_part}>
                    <div className={styles.main_container_header}>
                        <span>
                            <img src={logo} alt=""/>
                        </span>
                        <span className={styles.header_icons}>
                            <Link to={``} onClick={logout}>
                                <i className="fa-solid fa-right-from-bracket"></i>
                            </Link>
                            <Link to={`/alarm`}>
                                <i className="fa-solid fa-bell"></i>
                            </Link>
                            <Link to={`/user_detail`}>
                                <i className="fa-solid fa-user"></i>
                            </Link>
                        </span>
                    </div>
                    <div className={styles.main_top_part}>
                        <div className={styles.main_top_part_content}>
                            <div>어서오세요&nbsp;
                                <h1 className={styles.neon}>{data.nickname}</h1>님</div>
                            <div>
                                지금까지&nbsp;<h1 className={styles.neon}>{data.all_goals}</h1>개의 목표를 등록하고
                            </div>
                            <div>
                                &nbsp;<h1 className={styles.neon}>{data.completed_goals}</h1>개의 목표를 달성했습니다
                            </div>
                            <div className={styles.gage_bar}>
                                <p>My Fever Gage</p>
                                <progress value={data.fuel} max="100"></progress>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.main_container_bottom_part}>
                    <div className={styles.main_container_bottom_part_content}>
                        <Link to={`/create_goal`}>new goal</Link>
                        <Link to={`/create_group`}>new group</Link>
                    </div>
                </div>
            </div>
            <div className={styles.footer}>
                <Link to={`/my_groups`} className={styles.footer_link}>
                    <div className={styles.footer_item}>
                        <i className="fa-solid fa-user-group footer-icon"></i>
                        <span className={styles.footer_text}>내 그룹</span>
                    </div>
                </Link>
                <Link to={`/my_goals`} className={styles.footer_link}>
                    <div className={styles.footer_item}>
                        <i className="fa-solid fa-bullseye footer-icon"></i>
                        <span className={styles.footer_text}>내 목표</span>
                    </div>
                </Link>
                <Link to={"/achievement_report_list"} className={styles.footer_link}>
                    <div className={styles.footer_item}>
                        <i className="ri-file-list-3-line footer-icon"></i>
                        <span className={styles.footer_text}>달성보고</span>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default Main;