import React, { useState, useEffect } from 'react';
import styles from "./css/GoalCreation.module.css";
import {AuthAPI} from "../apis/AuthAPI"

const TagSelection = ({ parentTags, selectedParentTag, onParentTagSelect, onChildTagSelect, childTags }) => {
  return (
    <div id={styles.tag_container}>
      <div id={styles.maintag_container}>
        {parentTags.map(parentTag => (
          <React.Fragment key={parentTag.id}>
            <input
              type="radio"
              id={`parent-tag-radio-${parentTag.id}`}
              name="selected_parent_tag"
              value={parentTag.tag_name}
              checked={selectedParentTag && selectedParentTag.id === parentTag.id}
              onChange={() => onParentTagSelect(parentTag)}
            />
            <label htmlFor={`parent-tag-radio-${parentTag.id}`}>{parentTag.tag_name}</label>
          </React.Fragment>
        ))}
      </div>
      <div id={styles.subtag_container}>
        {childTags.map(childTag => (
          <React.Fragment key={childTag.id}>
            <input
              type="radio"
              id={`child-tag-radio-${childTag.id}`}
              name="selected_child_tag"
              value={childTag.tag_name}
              onChange={() => onChildTagSelect(childTag)}
            />
            <label htmlFor={`child-tag-radio-${childTag.id}`}>{childTag.tag_name}</label>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const ActivityTagSelection = ({ activityTags, selectedActivityTags, setSelectedActivityTags }) => {
  const handleCheckboxChange = (tagName) => {
    const isSelected = selectedActivityTags.includes(tagName);
    const updatedSelectedTags = isSelected
      ? selectedActivityTags.filter(name => name !== tagName)
      : [...selectedActivityTags, tagName];
    setSelectedActivityTags(updatedSelectedTags);
  };

  return (
    <div id={styles.acttag_container}>
      {activityTags.map(activityTag => (
        <React.Fragment key={activityTag.id}>
          <input
            type="checkbox"
            id={`activity-tag-checkbox-${activityTag.id}`}
            name="selected_activity_tag"
            value={activityTag.tag_name}
            checked={selectedActivityTags.includes(activityTag.tag_name)}
            onChange={() => handleCheckboxChange(activityTag.tag_name)}
          />
          <label htmlFor={`activity-tag-checkbox-${activityTag.id}`}>{activityTag.tag_name}</label>
        </React.Fragment>
      ))}
    </div>
  );
};

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

const FavorOfflineRadio = ({ value, onChange }) => (
  <div className={styles.radio_choice}>
      <input type="radio" id="offline-radio" name="meeting-preference" value="True" checked={value === true} onChange={() => onChange(true)} />
      <label htmlFor="offline-radio">선호해요</label>
      <input type="radio" id="online-radio" name="meeting-preference" value="False" checked={value === false} onChange={() => onChange(false)} />
      <label htmlFor="online-radio">비대면 원해요</label>
  </div>
);

function GoalCreationForm() {
    const [goalTitle, setGoalTitle] = useState('');
    const [goalDetails, setGoalDetails] = useState('');
    const [meetingPreference, setMeetingPreference] = useState('');
    const [parentTags, setParentTags] = useState([]);
    const [selectedParentTag, setSelectedParentTag] = useState('');
    const [childTags, setChildTags] = useState([]);
    const [selectedChildTag, setSelectedChildTag] = useState('');
    const [activityTags, setActivityTags] = useState([]);
    const [selectedActivityTag, setSelectedActivityTag] = useState([]);
    const [formErrors, setFormErrors] = useState({
        tagSelection: '',
        activityType: '',
        goalTitle: '',
        goalDetails: '',
        meetingPreference: ''
    });

    useEffect(() => {
        getParentTags();
    }, []);

    useEffect(() => {
        if (selectedParentTag) {
            fetchChildTags(selectedParentTag.id);
            setSelectedChildTag('');
        }
    }, [selectedParentTag]);

    useEffect(() => {
      fetchActivityTags();
    }, []);

    const fetchActivityTags = () => {
        AuthAPI.get('api/goals/activity_tags/')
            .then(response => setActivityTags(response.data))
            .catch(error => console.error('Error fetching activity tags:', error));
    };

    const getParentTags = () => {
        AuthAPI.get('/api/goals/tags/')
            .then(response => {
              setParentTags(response.data)
            })
            .catch(error => console.error('Error fetching parent tags:', error));
    };

    const fetchChildTags = (parentId) => {
        AuthAPI.get(`api/goals/subtags/${parentId}`)
            .then(response => setChildTags(response.data))
            .catch(error => console.error('Error fetching child tags:', error));
    };

    function handleSubmit(event) {
        event.preventDefault();
        const errors = {};
        if (selectedParentTag === '') {
            errors.tagSelection = '적어도 하나의 메인 태그를 선택해야 해요.';
        }
        if (activityTags.length === 0) {
            errors.activityType = '적어도 하나는 선택해야 해요.';
        }
        if (goalTitle.trim() === '') {
            errors.goalTitle = '제목을 입력해주세요.';
        }
        if (goalDetails.trim() === '') {
            errors.goalDetails = '세부사항을 입력해주세요.';
        }
        if (meetingPreference === null) {
            errors.meetingPreference = '하나를 선택해주세요.';
        }

        setFormErrors(errors);

        if (Object.values(errors).every(error => error === '')) {
            const btn = document.getElementById('goal-creation-submit');
            btn.value = "처리 중...";
            btn.disabled = true;
            let tags = [selectedParentTag.tag_name]
            if (selectedChildTag) {
              tags.push(selectedChildTag.tag_name);
            }
            const postData = {
              'tags': tags,
              'activity_tags': selectedActivityTag,
              'title': goalTitle,
              'content': goalDetails,
              'favor_offline': meetingPreference,
            };
            console.log(postData);
            AuthAPI.post('/api/goals/', postData)
            .then(response => {
              if (response.status >= 200) {
                window.location.href = window.location.origin + '/main';
              }
            })
            .catch(error => {
              console.error(error);
            });
        }
    }

    return (
        <div className={styles.wrap}>
            <div className={styles.form_container}>
            <form onSubmit={handleSubmit} className={styles.form_setting}>
                <div className={[styles.field_title, styles.no_margin_bottom].join(" ")}>카테고리를 선택하세요</div>
                <TagSelection
                  parentTags={parentTags}
                  selectedParentTag={selectedParentTag}
                  onParentTagSelect={setSelectedParentTag}
                  onChildTagSelect={setSelectedChildTag}
                  childTags={childTags}
                />
                {formErrors.tagSelection && <div className={styles.warning}>{formErrors.tagSelection}</div>}
                <div className={styles.field_title}>어떤 활동을 원하시나요?</div>
                <ActivityTagSelection
                  activityTags={activityTags}
                  selectedActivityTags={selectedActivityTag}
                  setSelectedActivityTags={setSelectedActivityTag}
                />
                {formErrors.activityType && <div className={styles.warning}>{formErrors.activityType}</div>}
                <FormField
                    label="내 목표의 제목을 지어주세요"
                    type="text"
                    value={goalTitle}
                    onChange={(e) => setGoalTitle(e.target.value)}
                    placeholder=""
                    error={formErrors.goalTitle}
                />
                <FormField
                    label="세부사항을 기입해주세요"
                    type="textarea"
                    value={goalDetails}
                    onChange={(e) => setGoalDetails(e.target.value)}
                    placeholder=""
                    error={formErrors.goalDetails}
                />
                <div className={styles.field_title}>대면 활동을 원하시나요?</div>
                <FavorOfflineRadio
                    value={meetingPreference}
                    onChange={setMeetingPreference}
                />
                {formErrors.meetingPreference && <div className={styles.warning}>{formErrors.meetingPreference}</div>}
                <div className={styles.btn_container}>
                    <input type="submit" value="목표 등록하기" className={styles.submit_btn} id="goal-creation-submit" />
                </div>
                </form>
            </div>
        </div>
    );
}

export default GoalCreationForm;