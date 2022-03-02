import "./App.css";
import React, { useEffect } from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import "./App.css";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

import Alert from "./components/layout/Alert";
import setAuthToken from "./utils/setAuthToken";
import { useDispatch } from "react-redux";
import { loadUser } from "./actions/auth.action";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";
import CreateProfileForm from "./components/profileForm/CreateProfileForm";
import EditProfile from "./components/profileForm/EditProfile";
import AddExperience from "./components/profileForm/AddExperience";
import AddEducation from "./components/profileForm/AddEducation";
import Profiles from "./components/profiles/Profiles";
import ProfileDetail from "./components/profileDetail/ProfileDetail";
import Post from "./components/post/Post";
import PostDetail from "./components/post/PostDetail";
if (localStorage.token) {
  setAuthToken(localStorage.token);
}
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <React.Fragment>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Landing></Landing>} />
      </Routes>
      <section className="container">
        <Alert></Alert>
        <Outlet />
        <Routes>
          <Route path="register" element={<Register></Register>} />
          <Route path="login" element={<Login></Login>} />
          <Route path="profiles" element={<Profiles></Profiles>} />
          <Route
            path="create-profile"
            element={<CreateProfileForm></CreateProfileForm>}
          />
          x
          <Route path="profile/:id" element={<ProfileDetail></ProfileDetail>} />
        </Routes>
        <PrivateRoute path="posts" element={<Post></Post>} />
        <PrivateRoute path="dashboard" element={<Dashboard></Dashboard>} />
        <PrivateRoute path="post/:id" element={<PostDetail></PostDetail>} />

        <PrivateRoute
          path="add-experience"
          element={<AddExperience></AddExperience>}
        />
        <PrivateRoute
          path="edit-profile"
          element={<EditProfile></EditProfile>}
        />
        <PrivateRoute
          path="add-education"
          element={<AddEducation></AddEducation>}
        />
      </section>
    </React.Fragment>
  );
}

export default App;
