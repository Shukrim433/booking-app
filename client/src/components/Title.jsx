import React from "react";

const Title = ({ text1, text2 }) => {
  return (
    <p>
      <span className="font-medium">{text1}</span>{" "}
      <span className="font-medium">{text2}</span>
    </p>
  );
};

export default Title;
