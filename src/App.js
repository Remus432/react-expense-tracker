import React, {useReducer } from "react";
import { reducer } from "./reducer/reducer";
import { initialState } from "./initialState"; 
import Expenses from "./components/Expenses";
import Form from "./components/Form";
import Graph from "./components/Graph";
import SwitchMode from "./components/SwitchMode";

import "./style.css";

export const ExpenseTrackerContext = React.createContext();


export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div className="container">
      <ExpenseTrackerContext.Provider value={{state, dispatch}}>
        <SwitchMode/>
        <Form/>
        <div className="expenses__container">
          <Expenses/>
          <Graph/>
        </div>
      </ExpenseTrackerContext.Provider>
    </div>
  );
}
