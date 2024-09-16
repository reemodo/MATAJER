import React from "react";
import "./item.css";

const Item = ({ id, name }) => {
  return <p key={id} className="itemButton">{name}</p>;
};

export default Item;
