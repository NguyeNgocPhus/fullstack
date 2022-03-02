import React from "react";
import { Link } from "react-router-dom";
function ProfileItem({ profile }) {
  return (
    <div className="profile bg-light">
      <img src={profile.user.avatar} alt="" className="round-img" />
      <div>
        <h2>{profile.user.name}</h2>
        <p>
          {profile.status}
          {profile.company && <span>&ensp;at {profile.company}</span>}
        </p>
        <p className="my-1">
          {profile.location && <span>{profile.location}</span>}
        </p>
        <Link to={`/profile/${profile.user._id}`} className="btn btn-primary">
          View Profile
        </Link>
      </div>

      <ul>
        {profile.skill.slice(0, 4).map((skill, index) => {
          return (
            <li key={index} className="text-primary">
              <i className="fas fa-check"></i>
              &emsp;{skill}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ProfileItem;
