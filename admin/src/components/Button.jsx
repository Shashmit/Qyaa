import React from "react";

const Button = (props) => {
  return (
    <button
      type="submit"
      className="bg-orange rounded-2xl py-2 text-gray hover: cursor-pointer hover:ring-2 hover:ring-opacity-5 text-m px-3"
    >
      {props.name}
    </button>
  );
};

export default Button;
