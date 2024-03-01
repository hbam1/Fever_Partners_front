import styles from "./css/Main.module.css";
import logo from "../assets/main_logo.png"
import { Link } from "react-router-dom";
import { AuthAPI } from "../AuthAPI"

function Main() {
    return (
        <div>
            <div id={styles.main_container}>
                <div className={styles.main_container_top_part}>
                    <div className={styles.main_container_header}>
                        <span>
                            <img src={logo} alt="" />
                        </span>
                        <span className={styles.header_icons}>
                            <Link to={``}>
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
                            <div>어서오세요&nbsp; <h1 className={styles.neon}>닉네임</h1>님</div>
                            <div>
                                    지금까지&nbsp;<h1 className={styles.neon}>100</h1>개의 목표를 등록하고
                            </div>
                            <div>
                                    &nbsp;<h1 className={styles.neon}>50</h1>개의 목표를 달성했습니다
                            </div>
                            <div className={styles.gage_bar}>
                                <p>My Fever Gage</p>
                                <progress value="50" max="100"></progress>
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
            <div className={styles.footer}>
                <Link to={``} className={styles.footer_link}>
                    <div className={styles.footer_item}>
                        <i class="fa-solid fa-user-group footer-icon"></i>
                        <span className={styles.footer_text}>내 그룹</span>
                    </div>
                </Link>
                <Link to={``} className={styles.footer_link}>
                <div className={styles.footer_item}>
                    <i class="fa-solid fa-bullseye footer-icon"></i>
                    <span className={styles.footer_text}>내 목표</span>
                </div>
                </Link>
                <Link to={``} className={styles.footer_link}>
                <div className={styles.footer_item}>
                    <i class="ri-file-list-3-line footer-icon"></i>
                    <span className={styles.footer_text}>달성보고</span>
                </div>
                </Link>
            </div>
        </div>
    );
}

export default Main;