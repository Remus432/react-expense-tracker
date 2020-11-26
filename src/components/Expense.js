import React, { useContext } from "react";
import { ExpenseTrackerContext } from "../App";

export default function Expense({ amount, source, mode, currency, id }) {
  const { dispatch } = useContext(ExpenseTrackerContext);

  console.log(currency, "this IS THE CURRENCY")

  function removeExpense() {
    dispatch({ type: "REMOVE_EXPENSE", id: id })
  }
  
  return (
    <div className="expense__card">
      <span className={`expense__card-label ${mode == "income" ? " income" : " expense"}`}>{mode}</span>
      <h1 >{source} - <span className="expense__card-amount">{amount} {currency}</span></h1>
      <button className="expense__card-remove" onClick={removeExpense}>X</button>
    </div>
  )
}