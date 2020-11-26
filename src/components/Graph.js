import React, { useState, useContext, useEffect } from "react";
import { ExpenseTrackerContext } from "../App";
import { Line } from "react-chartjs-2";
import moment from "moment";

export default function Graph() {
  const { state, dispatch } = useContext(ExpenseTrackerContext);
  const [ total, setTotal ] = useState([]);

  const expenses = state.expenses.length == 0 ? [{ amount: 0}, { amount: 0}] : state.expenses.filter(item => item.mode == "expense")
  const income = state.expenses.length == 0 ? [{ amount: 0}, { amount: 0}] : state.expenses.filter(item => item.mode == "income")
  const totalExpenses = expenses.map(item => item.amount).reduce((a,b) => {
    return a + b
  }, 0)
  const totalIncome = income.map(item => item.amount).reduce((a,b) => {
    return a + b;
  }, 0)

  useEffect(() => {
    
    setTotal([...total, totalIncome - totalExpenses])
    console.log(total, "Dadsad")
  }, [totalExpenses, totalIncome])

  const options = {
    scaleShowGridLines: true,
    scaleGridLineColor: 'rgba(0,0,0,.05)',
    scaleGridLineWidth: 1,
    scaleShowHorizontalLines: true,
    scaleShowVerticalLines: true,
    bezierCurve: true,
    bezierCurveTension: 0.4,
    pointDot: true,
    pointDotRadius: 4,
    pointDotStrokeWidth: 1,
    pointHitDetectionRadius: 20,
    datasetStroke: true,
    datasetStrokeWidth: 2,
    datasetFill: true,
    scales: {
      xAxes: [{
        ticks: {
          display: false
        }
      }]
    }
  }

  const [ chartState, setChart ] = useState({
    labels: ["January, February, March, April"],
    backgroundColor: ['rgba(102,220,220,0.2)'],
    fillColor: ["rgba(0,10,220,0.5)","rgba(220,0,10,0.5)","rgba(220,0,0,0.5)","rgba(120,250,120,0.5)" ],
    datasets: [
      {
        label: "Total",
        data: [],
        borderWidth: 5,
        backgroundColor: "#fff"
      },
      {
        label: "Expenses",
        data: [expenses.map(item => item.amount)],
        backgroundColor: "#FF6B6B"
      },
      {
        label: "Income",
        data: [income.map(item => item.amount)],
        backgroundColor: "#4ECDC4"
      }
    ]
  })

   useEffect(() => {

     setChart({
       labels: [...state.expenses.map(item => moment(item.date).format("MMM Do YY"))],
       datasets: [
        {
          label: "Total",
          data: [...total]
        },
        {
          label: "Expenses",
          data: [...expenses.map(item => item.amount)],
        },
        {
          label: "Income",
          data: [...income.map(item => item.amount)],
        }
      ]
    })
   }, [ state ])

  return (
    <div className="graph">
      <Line data={chartState}
        width={600}
        height={500}
        options={options}/>
    </div>
  )
}