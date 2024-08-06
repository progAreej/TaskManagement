

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import TaskManagement from './components/TaskManagement';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/TaskManagement" element={<TaskManagement />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
