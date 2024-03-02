import React, { useState, useEffect } from 'react';
import styles from "./css/GroupCreation.module.css";
import {AuthAPI} from "../apis/AuthAPI"

const GoalSelect = ({ defaultSetter, value, onChange, error }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    AuthAPI.get('/api/goals/lists/')
      .then(response => {
        setOptions(response.data);
        if (response.data.length > 0) {
          defaultSetter(response.data[0].id)
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <select value={value} onChange={onChange} name="goal" id="goal">
        {options.map(option => (
          <option key={option.id} value={option.id}>{option.title}</option>
        ))}
      </select>
      {error && <div className={styles.warning}>{error}</div>}
    </>
  );
};

const FavorOfflineSelect = ({ value, onChange }) => (
  <select value={value ? 'True' : 'False'} onChange={onChange} name="favor_offline" id="favor_offline">
    <option value="True">대면활동 하고싶어요</option>
    <option value="False">온라인 선호해요</option>
  </select>
);

const DurationSelection = ({ duration, handleDurationChange, error }) => {
  return (
    <div>
      <div className={[styles.field_title, styles.ignore_margin].join(" ")}>활동기간을 정해주세요</div>
      <div className={styles.duration_div}>
        <input id="duration_first" type="radio" value="P14D" checked={duration === 'P14D'} onChange={handleDurationChange} />
        <label htmlFor="duration_first">2주</label>
        <input id="duration_second" type="radio" value="P28D" checked={duration === 'P28D'} onChange={handleDurationChange} />
        <label htmlFor="duration_second">4주</label>
        <input id="duration_third" type="radio" value="P56D" checked={duration === 'P56D'} onChange={handleDurationChange} />
        <label htmlFor="duration_third">8주</label>
        <input id="duration_fourth" type="radio" value="P84D" checked={duration === 'P84D'} onChange={handleDurationChange} />
        <label htmlFor="duration_fourth">12주</label>
      </div>
      {error && <div className={styles.warning}>{error}</div>}
    </div>
  );
};

const CertRequiredToggle = ({ checked, onChange }) => (
  <div className="toggle-container">
    <input type="checkbox" id="cert_required" checked={checked} onChange={onChange} name="cert_required" className={styles.toggle_checkbox} />
    <label htmlFor="cert_required" className={styles.toggle_label}></label>
  </div>
);

const FormField = ({ label, type, value, onChange, placeholder, error }) => (
  <>
    <div className={styles.field_title}>{label}</div>
    {type === 'textarea' ? (
      <textarea value={value} onChange={onChange} placeholder={placeholder}></textarea>
    ) : (
      <input type={type} value={value} onChange={onChange} placeholder={placeholder} />
    )}
    {error && <div className={styles.warning}>{error}</div>}
  </>
);

const GroupCreationForm = () => {
  const [goal, setGoal] = useState('');
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [duration, setDuration] = useState('');
  const [favorOffline, setFavorOffline] = useState(true);
  const [certRequired, setCertRequired] = useState(false);
  const [certDetail, setCertDetail] = useState('');
  const [penalty, setPenalty] = useState(0);
  const [deposit, setDeposit] = useState(0);
  const [userCoin, setUserCoin] = useState(0);
  const [formErrors, setFormErrors] = useState({
    goal: '',
    title: '',
    detail: '',
    duration: '',
    penalty: '',
    certDetail: '',
    deposit: ''
  });

  // User의 코인 잔액을 확인하는 API 필요
  useEffect(() => {
    setUserCoin(10000)
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = {};
    if (goal === '') {
      errors.goal = '목표를 선택하세요.';
    }
    if (title.trim() === '') {
      errors.title = '방의 제목을 입력하세요.';
    }
    if (detail.trim() === '') {
      errors.detail = '세부사항을 입력하세요.';
    }
    if (duration === '') {
      errors.duration = '활동기간을 선택하세요.';
    }
    if (certRequired) {
      if (certDetail.trim() === '') {
        errors.certDetail = '인증 세부사항을 간단히 적어주세요!(인증주기, 인증시간 등)';
      }
      if (penalty === '') {
        errors.penalty = '벌금을 입력하세요.';
      }
      if (parseInt(penalty) < 0) {
        errors.penalty = '유효한 값이 아닙니다.';
      }
      if (deposit === '') {
        errors.deposit = '보증금을 입력하세요.';
      }
      if (parseInt(deposit) < 0) {
        errors.deposit = '유효한 값이 아닙니다.';
      }
      if (parseInt(deposit) > parseInt(userCoin)) {
        errors.deposit = `보유한 코인이 부족합니다.(현재 보유 : ${userCoin}🪙)`;
      }
    }
    if (Object.keys(errors).length === 0) {
      AuthAPI.post('/api/rooms/create/', {
        'goal_id': goal,
        'title': title,
        'detail': detail,
        'duration': duration,
        'favor_offline': favorOffline,
        'cert_required': certRequired,
        'cert_detail': certDetail,
        'penalty': penalty,
        'deposit': deposit,
      })
      .then(response => {
        if (response.ok) {
          window.location.href = '/main';
        }
      })
      .catch(error => {
        console.error(error);
      });
    } else {
      setFormErrors(errors);
    }
  };

  const handleFavorOfflineChange = (event) => {
    setFavorOffline(event.target.value === 'True');
  };

  const handleCertRequiredChange = (event) => {
    setCertRequired(event.target.checked);
  };

  const handleDurationChange = (event) => {
    setDuration(event.target.value);
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.form_container}>
        <div>
          <form onSubmit={handleSubmit} className={styles.form_setting}>
            <div className={styles.field_title}>방의 목표를 설정하세요!</div>
            <GoalSelect
              defaultSetter={setGoal}
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              error={formErrors.goal}
            />
            <FormField
              label="방의 제목을 지어보세요"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="방 제목을 입력하세요"
              error={formErrors.title}
            />
            <FormField
              label="세부사항을 기입해주세요"
              type="textarea"
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              placeholder="세부사항을 기입해주세요"
              error={formErrors.detail}
            />
            <DurationSelection
              duration={duration}
              handleDurationChange={handleDurationChange}
              error={formErrors.duration}
            />
            <div className={styles.field_title}>대면활동을 하실 계획이 있으신가요?</div>
            <FavorOfflineSelect
              value={favorOffline}
              onChange={handleFavorOfflineChange}
            />
            <div className={[styles.field_title, styles.ignore_margin].join(" ")}>인증 활동을 필수로 하실 건가요?</div>
            <CertRequiredToggle
              checked={certRequired}
              onChange={handleCertRequiredChange}
            />
            { certRequired && (
              <>
                <FormField
                  label="인증 규칙을 설명해주세요. (예: 하루에 한 번 인증)"
                  type="textarea"
                  value={certDetail}
                  onChange={(e) => setCertDetail(e.target.value)}
                  placeholder="디테일 설명"
                  error={formErrors.certDetail}
                />
                <FormField
                  label="벌금 설정"
                  type="number"
                  value={penalty}
                  onChange={(e) => setPenalty(e.target.value)}
                  placeholder="벌금"
                  error={formErrors.penalty}
                />
                <FormField
                  label="보증금 설정"
                  type="number"
                  value={deposit}
                  onChange={(e) => setDeposit(e.target.value)}
                  placeholder="보증금"
                  error={formErrors.deposit}
                />
                {deposit > parseInt(userCoin) && <div className={styles.warning}>{`보유한 코인이 부족합니다.(현재 보유 : ${userCoin}🪙)`}</div>}
              </>
            )}
            <div className={styles.btn_container}><button type="submit" className={styles.submit_btn}>방 생성하기</button></div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GroupCreationForm;