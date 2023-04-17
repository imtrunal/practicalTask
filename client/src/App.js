import React from 'react';
import './App.css';
import Login from "../src/Components/Login";
import SignUp from "../src/Components/Signup"
import Home from "../src/Components/Home";
import AddD from "../src/Components/Add"
import { Route, Routes } from 'react-router-dom';
import Employee from './Components/Emp';
import EmployeeDetail from "./Components/Employee"


function App() {
  const role = localStorage.getItem("role")
  console.log("hello",role)
  return (
    <div className="App">
      <Routes>
        <Route path='' element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        {role == 2 && <>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/add" element={<AddD />} /></>}

        <Route path="/employe-deatil" element={<EmployeeDetail />} />
      </Routes>
    </div>
  );
}

export default App;
