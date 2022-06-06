import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./components/HomePage/HomePage";
import Register from "./components/Users/Register/Register";
import Login from "./components/Users/Login/Login";
import Navbar from './components/Navigation/Navbar';
import AddNewCategory from "./components/Categories/AddNewCategory";
import CategoryList from "./components/Categories/CategoryList";
import UpdateCategory from "./components/Categories/UpdateCategory";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path='/update-category/:id' element={<UpdateCategory history/>} />
        <Route exact path='/add-category' element={<AddNewCategory />} />
        <Route exact path='/category-list' element={<CategoryList />} />
        <Route exact path='/' element={<HomePage />} />
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/login' element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
