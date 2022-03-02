import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentProfile } from "../../actions/profile.action";
import Spinder from "../layout/Spinder";
import DashboardAction from "./DashboardAction";
import Education from "./Education";
import Experience from "./Experience";
function Dashboard() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.profile.loading);
  const profile = useSelector((state) => state.profile.myprofile);

  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    dispatch(getCurrentProfile());
  }, [dispatch]);

  return loading && profile === null ? (
    <Spinder></Spinder>
  ) : (
    <React.Fragment>
      <h1>DashBoard</h1>
      <p className="lead">
        <i className="fas fa-user">Welcome {user && user.name}</i>
      </p>
      {profile !== null ? (
        <React.Fragment>
          <DashboardAction></DashboardAction>
          <Experience experience={profile.experience}></Experience>
          <Education education={profile.education}></Education>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <p>bạn ko có profile , vui lòng thiết lập profile</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create profile
          </Link>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default Dashboard;
