import styles from "./css/Signup.module.css"
import naver from "../assets/naver.png"
import kakao from "../assets/kakao.png"
import google from "../assets/google.webp"
import email from "../assets/email.png"
import { Link } from "react-router-dom";

const Signup = () => {
    return (
        <div id={styles.signup_how_container}>
            <div className={styles.page_back_header}>
                <span className={styles.page_back}>
                    <i class="fa-solid fa-chevron-left"></i>
                </span>
                <p className={styles.header_title}>fever partners</p>
                <p>가입하기</p>
            </div>
            <div id={styles.signup_method}>
                <div>
                    <span>
                        <img src={email} alt="" />
                    </span>
                    <Link to={`/signup_email`}>이메일로 시작하기</Link>
                </div>
                <div>
                    <span>
                        <img src={naver} alt="" />
                    </span>
                    <Link href="">네이버로 시작하기</Link>
                </div>
                <div>
                    <span>
                        <img src={google} alt="" />
                    </span>
                    <Link href="">구글로 시작하기</Link>
                </div>
                <div>
                    <span>
                        <img src={kakao} alt="" />
                    </span>
                    <Link href="">카카오로 시작하기</Link>
                </div>
            </div>
            <div id={styles.return_login}>
                <span>이미 계정이 있나요? </span>
                <Link to={`/login`}>로그인</Link>
            </div>
        </div>
    );
}

export default Signup;
