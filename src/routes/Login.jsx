import styles from "./css/Login.module.css";
import { Link } from "react-router-dom";
import naver from "../assets/naver.png";
import kakao from "../assets/kakao.png";
import google from "../assets/google.webp";
import { login } from "../apis/AuthAPI";
import { useState } from "react";

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = async (e) => {
    setValues({ ...values, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    login(values)
      .then((response) => {
        // HTTP 응답의 데이터에서 토큰 값을 가져옵니다.
        const { access, refresh } = response.token;
        // 토큰 값을 쿠키에 설정합니다.
        document.cookie = `access=${access};`;
        document.cookie = `refresh=${refresh};`;
        window.location.href = `/main`;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div id={styles.login_container}>
      <div className={styles.page_back_header}>
        <span className={styles.page_back}>
          <i class="fa-solid fa-chevron-left"></i>
        </span>
      </div>
      <div id={styles.login_box}>
        <span>계정</span>
        <div id={styles.login_form}>
          <input
            placeholder="이메일 입력"
            id="email"
            onChange={handleChange}
            value={values.email}
          ></input>
          <input
            placeholder="비밀번호 입력"
            id="password"
            onChange={handleChange}
            value={values.password}
          ></input>
          <button type="submit" onClick={handleSubmit}>
            로그인
          </button>
        </div>
        <div id={styles.login_service}>
          <Link to={``}>계정 찾기</Link>
          <Link to={``}>비밀번호 찾기</Link>
          <Link to={`/signup`}>회원가입</Link>
        </div>
      </div>
      <div id={styles.social_login}>
        <div className={styles.social_login_btn}>
          <div>
            <button type="submit">
              <img src={naver} />
            </button>
          </div>
        </div>
        <div className={styles.social_login_btn}>
          <div>
            <button type="submit">
              <img src={google} />
            </button>
          </div>
        </div>
        <div className={styles.social_login_btn}>
          <div>
            <button type="submit">
              <img src={kakao} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
