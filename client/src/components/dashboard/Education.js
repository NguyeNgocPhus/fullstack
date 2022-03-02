import React from "react";
import Moment from "react-moment";

function Education({ education }) {
  const educations = education.map((exp) => {
    return (
      <tr key={exp._id}>
        <td>{exp.school}</td>
        <td className="hide-sm">{exp.degree}</td>
        <td className="hide-sm">
          <Moment format="DD/MM/YYYY">{exp.from}</Moment> -{" "}
          {exp.to !== null ? (
            <Moment format="DD/MM/YYYY">{exp.to}</Moment>
          ) : (
            "Now"
          )}
        </td>
        <td>
          <button className="btn btn-danger">Delete</button>
        </td>
      </tr>
    );
  });
  return (
    <>
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Year</th>
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </>
  );
}

export default Education;
