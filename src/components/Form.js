import React, { useState, useContext, useEffect } from "react";
import { ExpenseTrackerContext } from "../App";
import 'react-dates/initialize';
import { v4 as uuidv4 } from "uuid"; 
import { reducer } from "../reducer/reducer";
import 'react-dates/lib/css/_datepicker.css';
import moment from "moment";
import { SingleDatePicker } from "react-dates";

export default function Form() {
  const [currDate, setDate] = useState(moment())
  const [focus, setFocus] = useState(false)
  const [inputSource, setSource] = useState(false);
  const [inputAmount, setAmount] = useState(false);

  const { state, dispatch } = useContext(ExpenseTrackerContext);
 
  const [ currencies, setCurrencies ] = useState([]);

  useEffect(() => {
    loadCurrencies();
  }, []);

  async function loadCurrencies() {
    const res = await fetch("https://gist.githubusercontent.com/joseluisq/59adf057a8e77f625e44e8328767a2a5/raw/e26aa3a0a540a88049a69b9a50d8010004deb34d/currencies.json");
    const data = await res.json();
    setCurrencies(Object.keys(data));
  }

  function clearStates() {
    setSource(false);
    setAmount(false);
  }

  function addAmount(e) {
    e.preventDefault();

    const { type, amount, currency } = e.target;

    console.log(currency, "this is it")

    if (type.value && amount.value) {
        const data = {
          amount: parseInt(amount.value),
          source: type.value,
          mode: state.type,
          currency: currency.value,
          id: uuidv4(),
          date: currDate.valueOf()
        }

        dispatch({ type: "ADD_AMOUNT", data })

        type.value = "";
        amount.value = "";
      } else {
        type.value == "" & setSource(true);
        amount.value == "" && setAmount(true);

        setTimeout(clearStates, 1500)
      }
    }

  function checkAmount(e) {
    const numbRegex = /^[1-9]{1,}\.?(\d{1,})?$/;

    if (e.target.value) {
      if (numbRegex.test(e.target.value)) {
      } else {
        e.preventDefault();
      }
    }
  }

  return (
    <form className="form" onSubmit={addAmount}>
      <div className="input__group">
        <input className={`form__type ${inputSource && "alert"}`} name="type" type="text" placeholder="Source (Ex: Bills)"/>
        <input className={`form__amount ${inputAmount && "alert"}`} onKeyPress={checkAmount} name="amount" type="text" placeholder="Amount"/>
        <select className="form__currency" name="currency">
        {
          currencies.map(currency => <option value={currency}>{currency}</option>)
        }
        </select>
        <SingleDatePicker 
          onDateChange={(date) => setDate(date)}
          date={currDate}
          onFocusChange={({ focused }) => setFocus(focused)}
          focused={focus}
          numberOfMonths={1}
          isOutsideRange={() => false}
          />
      </div>
      <div className="message">
        {}
      </div>
      <input className="form__add" type="submit" value="Add"/>
    </form>
  )
}