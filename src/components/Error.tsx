import React from "react";
import "../styles/Error.scss";

interface Props {
  msg: string;
}

const Error: React.FC<Props> = ({ msg }) => {
  return (
    <div className="error_container">
      <p>An error occurred: {msg}</p>
    </div>
  );
};

export default Error;
