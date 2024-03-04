import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react'
import Start from "./routes/Start"
import Login from "./routes/Login"
import Main from "./routes/Main"
import MyGoals from "./routes/MyGoals"
import GroupCreationForm from "./routes/GroupCreation";
import GoalCreationForm from "./routes/GoalCreation";
import AchievementReportList from './routes/AchievementReportList';
import AchievementReportDetail from './routes/AchievementReportDetail';
import GroupActivityBase from './routes/GroupActivityBase';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/my_goals" element={<MyGoals />} />
        <Route path="/main" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Start />} />
        <Route path="/create_group" element={<GroupCreationForm />}/>
        <Route path="/achievement_report_list" element={<AchievementReportList />} />
        <Route path="/achievement_report_detail/:id" element={<AchievementReportDetail />} />
        <Route path="/create_goal" element={<GoalCreationForm />}/>
        id 추가 필요
        <Route path="/group_activity_base" element={<GroupActivityBase />}/>  
      </Routes>
    </Router>
  )
}

export default App
