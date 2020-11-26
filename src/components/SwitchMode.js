import React, { useContext, useState } from "react";
import {ExpenseTrackerContext} from "../App";

export default function SwitchMode() {
  const { state, dispatch } = useContext(ExpenseTrackerContext);
  const [ boxState, setBox ] = useState(false);

  function changeMode(e) {
    if (e.target.checked) {
      document.querySelector(".switch__expense").classList.replace("disabled", "current");
      document.querySelector(".switch__income").classList.replace("current", "disabled");
      
      setBox(true);

      // Change Type
      dispatch({ type: "CHANGE_MODE", payload: { type: "expense" }})
    } else {
      document.querySelector(".switch__expense").classList.replace("current", "disabled");
      document.querySelector(".switch__income").classList.replace("disabled", "current");

      setBox(false);

      // Change Type
      dispatch({ type: "CHANGE_MODE", payload: { type: "income" }})
    }
  }

  return (
    <div className={`switch ${boxState ? "right" : "left"}`}>
      <span className="switch__income current">Income</span>
      <label className="switch__container">
        <input className="switch__toggle" type="checkbox" onChange={changeMode}/>
        <span className="switch__slider"></span>
      </label>
      <span className="switch__expense disabled">Expense</span>
    </div>
  )
}