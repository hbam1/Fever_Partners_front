import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthAPI } from "../apis/AuthAPI"

function AchievementReportForm() {
    const { id } = useParams();
    const [goal, setGoal] = useState({});
    console.log(id);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await AuthAPI.get(`/api/goals/${id}/`);
                setGoal(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        if (id) {
            fetchData();
        }
    }, []);

    return (
        <div>
            <h1>{goal.title}</h1>
        </div>
    );
}

export default AchievementReportForm;
