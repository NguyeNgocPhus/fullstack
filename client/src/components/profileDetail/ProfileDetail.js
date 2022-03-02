import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfileById } from "../../actions/profile.action";
import { useParams, Link } from "react-router-dom";
import Spinder from "../layout/Spinder";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import Experience from "../dashboard/Experience";
import Education from "../dashboard/Education";
import ProfileEducation from "./ProfileEducation";
import ProfileExperience from "./ProfileExperience";

function ProfileDetail() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.myprofile);
  const loading = useSelector((state) => state.profile.loading);
  const auth = useSelector((state) => state.auth);

  const { id } = useParams();
  useEffect(() => {
    dispatch(getProfileById(id));
  }, [dispatch, id]);
  return (
    <React.Fragment>
      {profile === null || loading ? (
        <Spinder></Spinder>
      ) : (
        <>
          <Link to="/profiles" className="btn btn-light">
            Back to developer
          </Link>
          {auth.isAuthenticated && !auth.loading && auth.user._id === id && (
            <Link className="btn btn-light" to="/edit-profile">
              Edit Profile
            </Link>
          )}
          <div className="profile-grid my-1">
            <ProfileTop profile={profile}></ProfileTop>
            <ProfileAbout profile={profile}></ProfileAbout>
            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Experience</h2>
              {profile.experience.length > 0 ? (
                <>
                  {profile.experience.map((exp) => {
                    return (
                      <ProfileExperience
                        key={exp._id}
                        exp={exp}
                      ></ProfileExperience>
                    );
                  })}
                </>
              ) : (
                <h4>No experience credentials</h4>
              )}
            </div>
            {/*  profile education */}
            <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Education</h2>
              {profile.education.length > 0 ? (
                <>
                  {profile.education.map((edu) => {
                    return (
                      <ProfileEducation
                        key={edu._id}
                        edu={edu}
                      ></ProfileEducation>
                    );
                  })}
                </>
              ) : (
                <h4>Not Education credentials</h4>
              )}
            </div>
          </div>
        </>
      )}
    </React.Fragment>
  );
}

export default ProfileDetail;
