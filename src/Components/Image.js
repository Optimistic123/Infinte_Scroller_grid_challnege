import React from "react";

const Image = ({ urls, handleClick }) => {
  return (
    <li className="img" onClick={() => handleClick(urls.regular)}>
      <img src={urls.small} alt="Pic" width="250" />
    </li>
  );
};

export default Image;
