import React, { useContext, useState, useEffect } from "react";
import Expense from "./Expense";
import { ExpenseTrackerContext } from "../App";

export default function Expenses() {
  const { state, dispatch } = useContext(ExpenseTrackerContext);
  const [ currentExpenses, setExpenses ] = useState({ expenses: state.expenses});
  const [ filterType, setFilter ] = useState("");
  const [ sortType, setSort ] = useState("");

  function sortExpenses(e) {
   setSort(e.target.value);

    switch(e.target.value) {
      case "amount":
        console.log(state)
        dispatch({ type: "SORT_AMOUNT" })
      case "date":
        dispatch({ type: "SORT_DATE" })
      default:
        return null
    }
    
  }

  function filterExpenses(e) {
    setFilter(e.target.value)


     const newState = state.expenses.filter(item => {
       if (e.target.value == "income") {
         console.log(item, "item");
         return item.mode == "income";
       }

       if (e.target.value == "expenses") {
         return item.mode == "expense"
       }

       return item;
     })

    setExpenses({ expenses: newState })

    //  console.log(currentExpenses)

    // dispatch({ type: "FILTER_EXPENSES", data: currentExpenses.expenses })
  }

  function filterItems(item) {
    
    if (filterType == "income") {
      return item.mode == "income";
    } 

    if (filterType == "expenses") {
      return item.mode == "expense"
    }

    return item;
  }

  function sortItems(a, b) {
      switch(sortType) {
        case "high_amount":
          return b.amount - a.amount
        case "low_amount":
          return a.amount - b.amount
        case "latest":
          return b.date - a.date
        case "oldest":
          return a.date - b.date
      } 
  }

  return (
    <div className="expenses">
     { state.expenses !== [] ? 
      (<div className="expenses__control">
        <div className="expenses__sort">
          <span>Sort by: </span>
          <select onChange={sortExpenses}>
            <option value="high_amount">Highest Amounts</option>
            <option value="low_amount">Lowest Amounts</option>
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
        <div className="expenses__filter">
          <span>Show: </span>
          <select onChange={filterExpenses}>
            <option value="income">Income</option>
            <option value="expenses">Expenses</option>
            <option value="all">All</option>
          </select>
        </div>
      </div>) : null}
      <div className="expenses__cards">
        {state.expenses.sort(sortItems).filter(filterItems).map(item => <Expense currency={item.currency} amount={item.amount} source={item.source} mode={item.mode} id={item.id}/>)}
      </div>
    </div>
  )
}