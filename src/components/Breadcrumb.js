import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ name, lastNavElement }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumb-item">{name}</li>
        {lastNavElement && (
          <li className="breadcrumb-item active" aria-current="page">
            {lastNavElement}
          </li>
        )}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
