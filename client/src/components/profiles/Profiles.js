import React, { useEffect } from "react";
import { getAllProfile } from "../../actions/profile.action";
import { useDispatch, useSelector } from "react-redux";
import ProfileItem from "./ProfileItem";
import Spinder from "../layout/Spinder";
function Profiles() {
  const dispatch = useDispatch();
  const profiles = useSelector((state) => state.profile.profiles);
  const loading = useSelector((state) => state.profile.loading);

  useEffect(() => {
    dispatch(getAllProfile());
  }, [dispatch]);

  return (
    <React.Fragment>
      {loading ? (
        <Spinder></Spinder>
      ) : (
        <>
          <h1 className="large text-primary">Developer</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop"></i> Browse and connect with
            developers
          </p>
          <div className="profiles">
            {profiles.length > 0 ? (
              profiles.map((profile) => {
                return (
                  <ProfileItem
                    key={profile._id}
                    profile={profile}
                  ></ProfileItem>
                );
              })
            ) : (
              <h4>No profile found .......</h4>
            )}
          </div>
        </>
      )}
    </React.Fragment>
  );
}

export default Profiles;
