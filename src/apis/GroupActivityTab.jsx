import React, { useEffect, useState } from 'react';

function GroupActivityTab({ roomId }) {
    const [selectedTab, setSelectedTab] = useState('member');
    const [content, setContent] = useState('');

    useEffect(() => {
        let url = '';
        switch (selectedTab) {
            case 'member':
                url = `${window.location.origin}/group_activity/member_list/${roomId}`;
                break;
            case 'activate':
                url = `${window.location.origin}/group_activity/activate/${roomId}`;
                break;
            case 'show_log':
                url = `${window.location.origin}/group_activity/show_log/${roomId}`;
                break;
        }

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                setContent(data);
            })
            .catch(error => {
                console.error('Error during fetch operation:', error);
            });
    }, [selectedTab, roomId]);

    return (
        <div>
            <div id="groupSelectActivityList">
                {/* 탭 선택 */}
            </div>
            <div id="groupActivityContent">
                {/* content를 안전하게 처리하여 렌더링 */}
                <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
        </div>
    );
}

export default GroupActivityTab;
