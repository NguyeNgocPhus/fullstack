import React from "react";
import Moment from "react-moment";

function Experience({ experience }) {
  const experiences = experience.map((exp) => {
    return (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td className="hide-sm">{exp.title}</td>
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
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Year</th>
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </>
  );
}

export default Experience;
