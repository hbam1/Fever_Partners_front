import React, { useState } from 'react';
import { AuthAPI } from "../apis/AuthAPI";

const RoomSetting = ({roomId}) => {
    const [startTime, setStartTime] = useState('');
    const [duration, setDuration] = useState(30);
    const [selectedDays, setSelectedDays] = useState([]);

    const handleStartTimeChange = (e) => {
        setStartTime(e.target.value);
    };

    const handleDurationChange = (e) => {
        setDuration(e.target.value);
    };

    const handleDayChange = (e) => {
        const value = e.target.value;
        if (selectedDays.includes(value)) {
            setSelectedDays(selectedDays.filter(day => day !== value));
        } else {
            setSelectedDays([...selectedDays, value]);
        }
        console.log(selectedDays);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        AuthAPI.post(`/api/rooms/${roomId}/activities/member_list/create_auto_authentication/`, {
            'start_time': startTime,
            'duration': duration,
            'day_of_week': selectedDays
        })
        .catch(error => {
            console.error(error);
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                시작 시간:
                <input type="time" value={startTime} onChange={handleStartTimeChange} />
            </label>
            <br />
            <label>
                지속 시간:
                <select value={duration} onChange={handleDurationChange}>
                    <option value="30">30분</option>
                    <option value="60">1시간</option>
                    <option value="90">1시간 30분</option>
                    <option value="120">2시간</option>
                </select>
            </label>
            <br />
            <div>
                요일 설정
                <div>
                    <input type="checkbox" id="mon" value="mon" checked={selectedDays.includes("mon")} onChange={handleDayChange} />
                    <label htmlFor="mon" style={{ fontWeight: selectedDays.includes("mon") ? 'bold' : 'normal' }}>월요일</label>
                </div>
                <div>
                    <input type="checkbox" id="tue" value="tue" checked={selectedDays.includes("tue")} onChange={handleDayChange} />
                    <label htmlFor="tue" style={{ fontWeight: selectedDays.includes("tue") ? 'bold' : 'normal' }}>화요일</label>
                </div>
                <div>
                    <input type="checkbox" id="wed" value="wed" checked={selectedDays.includes("wed")} onChange={handleDayChange} />
                    <label htmlFor="wed" style={{ fontWeight: selectedDays.includes("wed") ? 'bold' : 'normal' }}>수요일</label>
                </div>
                <div>
                    <input type="checkbox" id="thu" value="thu" checked={selectedDays.includes("thu")} onChange={handleDayChange} />
                    <label htmlFor="thu" style={{ fontWeight: selectedDays.includes("thu") ? 'bold' : 'normal' }}>목요일</label>
                </div>
                <div>
                    <input type="checkbox" id="fri" value="fri" checked={selectedDays.includes("fri")} onChange={handleDayChange} />
                    <label htmlFor="fri" style={{ fontWeight: selectedDays.includes("fri") ? 'bold' : 'normal' }}>금요일</label>
                </div>
                <div>
                    <input type="checkbox" id="sat" value="sat" checked={selectedDays.includes("sat")} onChange={handleDayChange} />
                    <label htmlFor="sat" style={{ fontWeight: selectedDays.includes("sat") ? 'bold' : 'normal' }}>토요일</label>
                </div>
                <div>
                    <input type="checkbox" id="sun" value="sun" checked={selectedDays.includes("sun")} onChange={handleDayChange} />
                    <label htmlFor="sun" style={{ fontWeight: selectedDays.includes("sun") ? 'bold' : 'normal' }}>일요일</label>
                </div>
            </div>
            <br />
            <button type="submit">제출</button>
        </form>
    );
};

export default RoomSetting;
