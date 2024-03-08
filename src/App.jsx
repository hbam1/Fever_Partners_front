import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Start from "./routes/Start";
import Login from "./routes/Login";
import Main from "./routes/Main";
import MyGoals from "./routes/MyGoals";
import GroupCreationForm from "./routes/GroupCreation";
import GoalCreationForm from "./routes/GoalCreation";
import AchievementReportList from "./routes/AchievementReportList";
import UserDetail from "./routes/UserDetail";
import Signup from "./routes/Signup";
import SignupEmail from "./routes/SignupEmail";
import CreateNickname from "./routes/CreateNickname";
import Alarm from "./routes/Alarm";
import AlarmDetail from "./routes/AlarmDetail";
import MyGroups from "./routes/MyGroups";
import Auth from "./routes/Auth";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/create_nickname" element={<CreateNickname />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup_email" element={<SignupEmail />} />
        <Route path="/my_goals" element={<MyGoals />} />
        <Route path="/my_groups" element={<MyGroups />} />
        <Route path="/main" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Start />} />
        <Route path="/create_group" element={<GroupCreationForm />} />
        <Route path="/create_goal" element={<GoalCreationForm />} />
        <Route
          path="/achievement_reports_list"
          element={<AchievementReportList />}
        />
        <Route path="/user_detail" element={<UserDetail />} />
        <Route path="/alarm" element={<Alarm />} />
        <Route path="/alarm_detail/:alarm_id/" element={<AlarmDetail />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Router>
  );
}

export default App;
