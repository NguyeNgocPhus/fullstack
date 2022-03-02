import React from "react";
import Moment from "react-moment";
function ProfileEducation({ edu }) {
  return (
    <div>
      <h3>{edu.school}</h3>
      <p>
        <Moment format="DD/MM/YYYY">{edu.from}</Moment> -{" "}
        {edu.to ? <Moment format="DD/MM/YYYY">{edu.to}</Moment> : "Now"}
      </p>
      <p>
        <strong>Degree: </strong>
        {edu.degree}
      </p>
      <p>
        <strong>Field Of Study: </strong>
        {edu.fieldofstudy}
      </p>
      <p>
        <strong>Description: </strong>
        {edu.desctiption}
      </p>
    </div>
  );
}

export default ProfileEducation;
