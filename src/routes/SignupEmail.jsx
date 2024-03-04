import styles from "./css/SignupEmail.module.css";
import { useState } from 'react'
import { signUp } from "../apis/AuthAPI"

const SignupEmail = () => {
    const [values, setValues] = useState({
        email: "",
        password: "",
        password2: "",
    });

    const handleChange = async (e) => {
        setValues({...values,
            [e.target.id]: e.target.value,
        });
    }

    const handleSubmit = async (e) => {
        signUp(values)
        .then((response) => {
            // HTTP 응답의 데이터에서 토큰 값을 가져옵니다.
            const { access, refresh } = response.token;
            // 토큰 값을 쿠키에 설정합니다.
            document.cookie = `access=${access};`;
            document.cookie = `refresh=${refresh};`;
            window.location.href = `/create_nickname`;
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <div id={styles.signup_email_container}>
            <div className={styles.page_back_header}>
                <span className={styles.page_back}>
                    <i class="fa-solid fa-chevron-left"></i>
                </span>
                <p className={styles.header_title}>fever partners</p>
                <p>회원가입</p>
            </div>
            <div className={styles.signup_email_form}>
                <span>계정</span>
                <div id={styles.login_form}>
                    <input placeholder="이메일 입력" id="email" onChange={handleChange} value={values.email}></input>
                    <input placeholder="비밀번호 입력" id="password" onChange={handleChange} value={values.password}></input>
                    <input placeholder="비밀번호 확인" id="password2" onChange={handleChange} value={values.password2}></input>
                    <button type="submit" onClick={handleSubmit}>회원가입</button>
                </div>
            </div>
        </div>
    );
}

export default SignupEmail;
