export const reducer = (state, action) => {
  switch(action.type) {
    case "INCREASE_COUNT":
      return { count: state.count++}
    case "DECREASE_COUNT":
      console.log("not working");
      return { count: state.count--}
    default:
      return state;
  }
}