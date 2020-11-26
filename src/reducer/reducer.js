export const reducer = (state, action) => {
  // const { expenses } = state
  switch(action.type) {
    case "CHANGE_MODE":
      return {
        expenses: [...state.expenses],
        type: action.payload.type
      }
    case "ADD_AMOUNT":
      return {
        expenses: [...state.expenses, action.data],
        type: state.type
      }
    case "REMOVE_EXPENSE":
      console.log(action, "removed");
      return {
        expenses: state.expenses.filter(item => item.id !== action.id),
        type: state.type
      }
    case "SORT_AMOUNT":
      console.log("amount")
      return {
        expenses: state.expenses.sort((a, b) => {
          return a.amount - b.amount
        }),
        type: state.type
      }
    case "SORT_DATE":
      return {
        expenses: state.expenses.sort((a, b) => {
          return a.date - b.date
        }),
        type: state.type
      }
    case "FILTER_EXPENSES":
      return {
        expenses: [...action.data],
        type: state.type
      }
    default:
      return state;
  }
}
