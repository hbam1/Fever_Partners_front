import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react'
import Start from "./routes/Start"
import Login from "./routes/Login"
import Main from "./routes/Main"
import GroupCreationForm from "./routes/GroupCreation";
import GoalCreationForm from "./routes/GoalCreation";
import AchievementReportList from './routes/AchievementReportList';
import GroupRecommendation from "./routes/GroupRecommendation";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/main" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Start />} />
        <Route path="/create_group" element={<GroupCreationForm />}/>
        <Route path="/create_goal" element={<GoalCreationForm />}/>
        <Route path="/achievement_reports_list" element={<AchievementReportList />} />
        <Route path="/group_recommendation/:goalId" element={<GroupRecommendation />} />
      </Routes>
    </Router>
  )
}

export default App
