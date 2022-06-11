import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./components/HomePage/HomePage";
import Register from "./components/Users/Register/Register";
import Login from "./components/Users/Login/Login";
import Navbar from './components/Navigation/Navbar';
import CreatePost from "./components/Posts/CreatePost";
import AddNewCategory from "./components/Categories/AddNewCategory";
import CategoryList from "./components/Categories/CategoryList";
import UpdateCategory from "./components/Categories/UpdateCategory";
import LoggedInRoute from "./components/Navigation/ProtectedRoutes/LoggedInRoute";
import AdminRoute from "./components/Navigation/ProtectedRoutes/AdminRoute";
import PostsList from "./components/Posts/PostsList";


function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Admin routes */}
        <Route element={<AdminRoute />}>
          <Route path='/update-category/:id' element={<UpdateCategory />} />
          <Route path='/add-category' element={<AddNewCategory />} />
          <Route path='/category-list' element={<CategoryList />} />
        </Route>

        {/* Logged in users routes */}
        <Route element={<LoggedInRoute />}>
          <Route path='/create-post' element={<CreatePost />} />
        </Route>

        {/* Public users routes */}
        <Route path='/posts' element={<PostsList />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
