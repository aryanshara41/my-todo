import React, { FC } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

type Props = {
  text: string;
};

const SingleTodo: FC<Props> = ({ text }) => {
  return (
    <div className="border-2 p-2 rounded-xl shadow-md shadow-gray-600 ">
      {text}
    </div>
  );
};

export default SingleTodo;
