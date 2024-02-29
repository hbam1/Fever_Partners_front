import React, { useState } from 'react';

const GoalSelect = ({ value, onChange, options, error }) => (
  <>
    <select value={value} onChange={onChange} name="goal" id="goal">
      {options.map(option => (
        <option key={option.id} value={option.id}>{option.title}</option>
      ))}
    </select>
    {error && <div className="warning">{error}</div>}
  </>
);

const FavorOfflineSelect = ({ value, onChange }) => (
  <select value={value ? 'True' : 'False'} onChange={onChange} name="favor_offline" id="favor_offline">
    <option value="True">대면활동 하고싶어요</option>
    <option value="False">온라인 선호해요</option>
  </select>
);

const CertRequiredToggle = ({ checked, onChange }) => (
  <div className="toggle-container">
    <input type="checkbox" id="cert_required" checked={checked} onChange={onChange} name="cert_required" className="toggle-checkbox" />
    <label htmlFor="cert_required" className="toggle-label"></label>
  </div>
);

const FormField = ({ label, type, value, onChange, placeholder, error }) => (
  <>
    <div className='black-08em-bold mar'>{label}</div>
    {type === 'textarea' ? (
      <textarea value={value} onChange={onChange} placeholder={placeholder}></textarea>
    ) : (
      <input type={type} value={value} onChange={onChange} placeholder={placeholder} />
    )}
    {error && <div className="warning">{error}</div>}
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

  const handleSubmit = (event) => {
    event.preventDefault();
    // 유효성 검사
    const errors = {};
    if (goal === '') {
      errors.goal = '목표를 선택하세요.';
    }
    // 이하 생략
    setFormErrors(errors);
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
    <div id='group-wrap'>
      <div id="create-room-container">
        <div>
          <form onSubmit={handleSubmit} className="group-form-setting">
            <GoalSelect
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              options={[]}
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
            <div className='black-08em-bold'>활동기간을 정해주세요</div>
            <div>
                <label>
                <input type="radio" value="P14D" checked={duration === 'P14D'} onChange={handleDurationChange} />
                2주
                </label>
                <label>
                <input type="radio" value="P28D" checked={duration === 'P28D'} onChange={handleDurationChange} />
                4주
                </label>
                <label>
                <input type="radio" value="P56D" checked={duration === 'P56D'} onChange={handleDurationChange} />
                8주
                </label>
                <label>
                <input type="radio" value="P84D" checked={duration === 'P84D'} onChange={handleDurationChange} />
                12주
                </label>
            </div>
            {formErrors.duration && <div className="warning">{formErrors.duration}</div>}
            <FavorOfflineSelect
              value={favorOffline}
              onChange={handleFavorOfflineChange}
            />
            <div className='black-08em-bold mar'>대면활동을 하실 계획이 있으신가요?</div>
            <CertRequiredToggle
              checked={certRequired}
              onChange={handleCertRequiredChange}
            />
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
            {deposit > parseInt(userCoin) && <div className="warning">{`보유한 코인이 부족합니다.(현재 보유 : ${userCoin}🪙)`}</div>}
            <input type="hidden" id="user-coin" value={userCoin} />
            <div className="g-btn"><button type="submit" className="red-btn goal-btn">방 생성하기</button></div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GroupCreationForm;
