import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PersonnelList from './components/PersonnelList';
import DepartmentList from './components/DepartmentList';
import TitleList from './components/TitleList';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<PersonnelList />} />
          <Route path="/departments" element={<DepartmentList />} />
          <Route path="/titles" element={<TitleList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
