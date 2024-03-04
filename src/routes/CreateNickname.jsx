import styles from "./css/CreateNickname.module.css";
import { useState } from 'react';
import { createNickname } from "../apis/AuthAPI";


const CreateNickname = () => {
    const [values, setValues] = useState({
        nickname: "",
        profile: "",
        region: "",
        region_detail: "",
    });

    const handleChange = async (e) => {
        setValues({...values,
            [e.target.id]: e.target.value,
        });
    }

    const handleSubmit = async (e) => {
        createNickname(values)
        .then((response) => {
            console.log(response)
            window.location.href = `/main`;
        }).catch((error) => {
            console.log(error);
            window.location.href = window.location.origin;
        });
    }

    return (
        <div id={styles.input_nickname_container}>
            <div class={styles.page_back_header}>
                <span class={styles.page_back}>
                    <i class="fa-solid fa-chevron-left"></i>
                </span>
                <p style={{marginTop:"2vh"}}>fever partners</p>
                <p>회원가입</p>
            </div>
            <div class={styles.input_nickname_form} style={{width:"60vw"}}>
                <span>계정</span>
                <div id={styles.login_form}>
                    <input id="nickname" onChange={handleChange} value={values.nickname} placeholder="닉네임 입력" />
                    <input id="profile" onChange={handleChange} value={values.profile} placeholder="소개글 입력" />
                    <input id="region" onChange={handleChange} value={values.region} placeholder="거주지역 입력" />
                    <input id="region_detail" onChange={handleChange} value={values.region_detail} placeholder="거주지역 세부 입력" />
                    <button type="submit" onClick={handleSubmit}>회원가입</button>
                </div>
            </div>
        </div>
    );
}

export default CreateNickname;
