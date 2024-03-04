import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Start from "./routes/Start";
import Login from "./routes/Login";
import Main from "./routes/Main";
import MyGoals from "./routes/MyGoals";
import GroupCreationForm from "./routes/GroupCreation";
import GoalCreationForm from "./routes/GoalCreation";
import AchievementReportList from './routes/AchievementReportList';
import AchievementReportDetail from './routes/AchievementReportDetail';
import UserDetail from "./routes/UserDetail";
import Signup from "./routes/Signup";
import SignupEmail from "./routes/SignupEmail";
import CreateNickname from "./routes/CreateNickname";
import Alarm from "./routes/Alarm";
import GroupActivityBase from './routes/GroupActivityBase';
import MyGroups from "./routes/MyGroups";

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
        <Route path="/create_group" element={<GroupCreationForm />}/>
        <Route path="/achievement_report_list" element={<AchievementReportList />} />
        <Route path="/achievement_report_detail/:id" element={<AchievementReportDetail />} />
        <Route path="/create_goal" element={<GoalCreationForm />}/>
        id 추가 필요
        <Route path="/group_activity" element={<GroupActivityBase />}/>  
        <Route path="/user_detail" element={<UserDetail />} />
        <Route path="/alarm" element={<Alarm />} />
      </Routes>
    </Router>
  );
}

export default App;
