import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Datatable from './Datatable';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/datatable" element={<Datatable />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
