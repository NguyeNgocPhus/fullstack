import React from "react";

function ProfileAbout({ profile }) {
  return (
    <div className="profile-about bg-light p-2">
      {profile.bio && (
        <>
          <h2 className="text-primary">{profile.user.name}'s Bio</h2>
          <p>{profile.bio}</p>
        </>
      )}

      <div className="line"></div>
      <h2 className="text-primary">Skill Set</h2>
      <div className="skills">
        {profile.skill.map((skill, index) => {
          return (
            <div key={index} className="p-1">
              <i className="fa fa-check"></i> {skill}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProfileAbout;
