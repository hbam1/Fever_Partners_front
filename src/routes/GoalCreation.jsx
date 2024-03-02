import React, { useState, useEffect } from 'react';
import styles from "./css/GoalCreation.module.css";
import {AuthAPI} from "../apis/AuthAPI"

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

  const TagSelection = ({ }) => {
    const [tags, setTags] = useState([]);
  
    useEffect(() => {
      AuthAPI.get('/apis/goals/tags/')
        .then(response => {
          setTags(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }, []);
  
    return (
      <div id='tag-container'>
        <div>
          {tags.map(tag => (
            <>
              <input type="radio" id={`tag-radio-${tag.id}`} name="selected_tag" value={tag.id} onClick={() => loadSubtags(tag.id)} />
              <label htmlFor={`tag-radio-${tag.id}`}>{tag.tag_name}</label>
            </>
          ))}
        </div>
        <div id='detail-tag-container'></div>
      </div>
    );
  };

const ActivitySelection = ({ actTags }) => (
  <div id='acttag-container'>
    {actTags.map(actTag => (
      <React.Fragment key={actTag.id}>
        <input type="checkbox" id={`actTag-checkbox-${actTag.id}`} name="activity-type[]" value={actTag.id} />
        <label htmlFor={`actTag-checkbox-${actTag.id}`}>{actTag.tag_name}</label>
      </React.Fragment>
    ))}
  </div>
);

const FavorOfflineSelection = () => (
    <>
      <div className='black-08em-bold'>대면 활동을 선호하시나요?</div>
      <div className="choice-on-off">
        <input type="radio" id="offline-radio" name="meeting-preference" value="True" />
        <label htmlFor="offline-radio">선호해요</label>
        <input type="radio" id="online-radio" name="meeting-preference" value="False" />
        <label htmlFor="online-radio">비대면 원해요</label>
      </div>
      <div className="warning" id="meeting-preference-warning"></div>
    </>
  );

const GoalCreationForm = ({ goalTitle, handleGoalTitleChange, goalDetails, handleGoalDetailsChange }) => (
  <form onSubmit={handleSubmit} className="goal-form-setting">
    <input type="hidden" name="csrfmiddlewaretoken" value="{% csrf_token %}" />

    <TagSelection tags={tags} loadSubtags={loadSubtags} />

    <div id="tag-selection-warning" className="warning"></div>

    <div className='black-08em-bold'>어떤 활동을 원하시나요?</div>
    <ActivitySelection actTags={actTags} />
    <div id="activity-type-warning" className="warning"></div>

    <FormField
      label="내 목표의 제목을 지어주세요"
      type="text"
      value={goalTitle}
      onChange={handleGoalTitleChange}
      placeholder="목표 제목"
      error={goalTitleError}
    />

    <FormField
      label="세부사항을 기입해주세요"
      type="textarea"
      value={goalDetails}
      onChange={handleGoalDetailsChange}
      placeholder="세부사항"
      error={goalDetailsError}
    />

    <FavorOfflineSelection/>

    <div className="g-btn">
      <input id="goal-creation-submit" type="submit" value="목표 등록하기" className="red-btn goal-btn" />
    </div>
  </form>
);

export default GoalCreationForm;