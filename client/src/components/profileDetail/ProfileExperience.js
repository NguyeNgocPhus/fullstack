import React from "react";
import Moment from "react-moment";
function ProfileExperience({ exp }) {
  return (
    <div>
      <h3 className="text-dark">{exp.company}</h3>
      <p>
        <Moment format="DD/MM/YYY">{exp.from}</Moment> -{" "}
        {!exp.to ? "Now" : <Moment format="DD/MM/YYY">{exp.to}</Moment>}
      </p>
      <p>
        <strong>Position: </strong>
        {exp.title}
      </p>
      <p>
        <strong>Description: </strong>
        {exp.description}
      </p>
    </div>
  );
}

export default ProfileExperience;
