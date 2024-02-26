import { useEffect, useState } from "react";
import styles from "./css/Start.module.css"
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"


function Start() {
    return (
        <div id={styles.start_container}>
            <div className={styles.logo}>
                <img src={logo} />
            </div>
            <div className={styles.start_btn}>
                <Link to={`/login`}>Get Started</Link>
            </div>
        </div>
    );
}

export default Start;