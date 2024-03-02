import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Start from "./routes/Start";
import Login from "./routes/Login";
import Main from "./routes/Main";
import GroupCreationForm from "./routes/GroupCreation";
import Auth from "./routes/Auth";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/main" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Start />} />
        <Route path="/create_group" element={<GroupCreationForm />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Router>
  );
}

export default App;
