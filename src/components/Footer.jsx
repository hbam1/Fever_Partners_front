import styles from "../routes/css/Main.module.css";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
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
    );
}

export default Footer;
