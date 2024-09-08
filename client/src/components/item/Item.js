import React from "react";
import "./item.css";

const Item = ({ name }) => {
  return <button className="itemButton">{name}</button>;
};

export default Item;
