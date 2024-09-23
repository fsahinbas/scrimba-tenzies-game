import React from "react";
import sytles from "./dice.module.css";
const Dice = (props) => {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "#fff",
  };
  return (
    <div className={sytles.dice} style={styles} onClick={props.holdDice}>
      {props.value}
    </div>
  );
};

export default Dice;
