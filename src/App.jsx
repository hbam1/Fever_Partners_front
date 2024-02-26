import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react'
import Start from "./routes/Start"
import Login from "./routes/Login"

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Start />} />
      </Routes>
    </Router>
  )
}

export default App
