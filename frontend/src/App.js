import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, Redirect } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Home from "./page/Home";
import Signup from "./page/Signup";
import Login from "./page/Login";
import PtClient from "./page/PtClient";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import "./App.css";
import Profile from "./page/Profile";

function App() {

//Define the route for the application- Define which page needs authentication. Public route pages need no authentication while protectedRoute will need authentication.
  return (
    <div className="App">
      <BrowserRouter>
      {/* Toaster allow message to be resurfaced on the page*/}
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          {/* Home Page route */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
             {/*Login Page route */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
            {/*Signup page route */}
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />
             {/*This is the Page for personal trainer client page, identified by their id */}
            <Route
            path="/client/:id"
            element={
              <ProtectedRoute>
                <PtClient/>
              </ProtectedRoute>
            }
          />
          {/*This is the Page for both personal trainer and client. This will give logged in user detail*/}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile/>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
