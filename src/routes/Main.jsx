import styles from "./css/Main.module.css";
import logo from "../assets/main_logo.png"
import { Link } from "react-router-dom";
import {logout, userInfo} from "../apis/user"
import { useState, useEffect } from 'react'
import Footer from "../components/Footer"

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
            console.error('Error getting user info:', error);
        }
    }
    
    return (
        <div>
            <div id={styles.main_container}>
                <div className={styles.main_container_top_part}>
                    <div className={styles.main_container_header}>
                        <span>
                            <img src={logo} alt="" />
                        </span>
                        <span className={styles.header_icons}>
                            <Link to={``} onClick={logout}>
                                <i class="fa-solid fa-right-from-bracket"></i>
                            </Link>
                            <Link to={``}>
                                <i class="fa-solid fa-bell"></i>
                            </Link>
                            <Link to={``}>
                                <i class="fa-solid fa-user"></i>
                            </Link>
                        </span>
                    </div>
                    <div className={styles.main_top_part}>
                        <div class={styles.main_top_part_content}>
                            <div>어서오세요&nbsp; <h1 className={styles.neon}>{data.nickname}</h1>님</div>
                            <div>
                                <p>
                                    지금까지&nbsp;<h1 className={styles.neon}>{data.all_goals}</h1>개의 목표를 등록하고
                                </p>
                            </div>
                            <div>
                                <p>
                                    &nbsp;<h1 className={styles.neon}>{data.completed_goals}</h1>개의 목표를 달성했습니다
                                </p>
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
                        <Link to={``}>new goal</Link>
                        <Link to={``}>new group</Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Main;