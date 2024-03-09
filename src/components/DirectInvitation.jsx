import React, { useState } from 'react';
import { AuthAPI } from "../apis/AuthAPI";

const InvitationSearch = ({ roomId }) => {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleInputChange = (event) => {
        const keyword = event.target.value.trim();
        setSearchKeyword(keyword);
        if (keyword !== '') {
            fetchSearchResults(keyword);
        } else {
            setSearchResults([]);
        }
    };

    const fetchSearchResults = (keyword) => {
        AuthAPI.get(`/api/rooms/${roomId}/activities/search/`, {
            params: { 'nickname' : keyword }
        })
        .then(response => {
            setSearchResults(response.data);
        })
        .catch(error => {
            console.error('검색 중 오류 발생:', error);
        });
    };

    const suggestDirectJoin = (userId) => {
        const postData = {
            'alarm_to': userId,
            'room': roomId,
          }
          AuthAPI.post('/api/alarms/create/', postData)
          .then(response => {
            const btn = document.getElementById(`suggest-btn-${userId}`)
            btn.disabled = true;
          })
    };

    return (
        <div className="i_m_d">
            <p className="invite_user_p">유저 닉네임을 직접 입력해서 멤버를 초대하세요!</p>
            <input type="text" id="nickname" placeholder="유저 닉네임을 입력하세요" value={searchKeyword} onChange={handleInputChange} />
            <div id="searchResults">
                {searchKeyword !== '' && searchResults.length > 0 ? (
                    searchResults.map(result => (
                        <div key={result.id}>
                            <span>{result.nickname}</span>
                            <button id={`suggest-btn-${result.id}`} className="direct-invitation-button" onClick={() => suggestDirectJoin(result.id)}>가입제안</button>
                        </div>
                    ))
                ) : (
                    searchKeyword !== '' && <div>검색 결과가 없습니다.</div>
                )}
            </div>
        </div>
    );
};

export default InvitationSearch;