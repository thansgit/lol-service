import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./components/HomePage/HomePage";
import Register from "./components/Users/Register/Register";
import Login from "./components/Users/Login/Login";
import Navbar from './components/Navigation/Navbar';
import AddNewCategory from "./components/Categories/AddNewCategory";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path='/add-category' element={<AddNewCategory />} />
        <Route exact path='/' element={<HomePage />} />
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/login' element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;