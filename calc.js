import { evaluate } from "https://esm.sh/mathjs";
import React, { useState, useEffect } from "https://esm.sh/react";
import { Container, Row } from "https://esm.sh/react-bootstrap";
import ReactDOM from "https://esm.sh/react-dom";
import {
  Provider,
  connect,
  useSelector,
  useDispatch
} from "https://esm.sh/react-redux";
import {
  createStore,
  combineReducers,
  applyMiddleware
} from "https://esm.sh/redux";

console.log(evaluate(`5 * -+5`));

const initialState = "0";

//ACTIONS:
const addToString = (value) => ({
  type: "ADD_TO_STRING",
  value: value
});

const removeFromString = () => ({
  type: "REMOVE_FROM_STRING"
});
const evaluateString = () => ({
  type: "EVALUATE_STRING"
});

const clearString = () => ({
  type: "CLEAR_STRING"
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_STRING":
      if (state === "0") {
        return action.value;
      } else {
        if (["+", "*", "/"].includes(action.value)) {
          
          if (["+", "*", "/"].includes(state[state.length - 1])) {
            return state.slice(0, -1) + action.value;
          } else if (state[state.length - 1] ==="-"){
            return state.slice(0, -2) + action.value;
          } 
            
        } else if (action.value === ".") {
          const numbers = state.split(/[-+*/]/);
          const lastNumber = numbers[numbers.length - 1];
          if (lastNumber.includes(".")) {
            return state;
          }
        }
        return state + action.value;
      }

    case "EVALUATE_STRING":
      return evaluate(state);
    case "CLEAR_STRING":
      return "0";
    case "REMOVE_FROM_STRING":
      return state.substring(0, state.length - 1);
    default:
      return state;
  }
};

const store = createStore(reducer);

const CalculatorButton = ({ buttonValue }) => {
  const dispatch = useDispatch();
  var className = "";
  var itemID = "";
  var action = "";
  console.log(buttonValue);
  switch (buttonValue) {
    case "X":
      className = "button operator-button";
      action = addToString("*");
      itemID = "multiply";
      break;
    case "/":
      className = "button operator-button";
      action = addToString("/");
      itemID = "divide";
      break;
    case "+":
      className = "button operator-button";
      action = addToString("+");
      itemID = "add";
      break;
    case "-":
      className = "button operator-button";
      action = addToString("-");
      itemID = "subtract";
      break;
    case "=":
      className = "button equals-button";
      action = evaluateString();
      itemID = "equals";
      break;
    case "AC":
      className = "button clear-button";
      action = clearString();
      itemID = "clear";
      break;
    case "Del":
      className = "button clear-button";
      action = removeFromString();
      itemID = "delete";
      break;
    case " ":
      className = "button number-button";
      break;
    case "1":
      className = "button number-button";
      action = addToString(buttonValue);
      itemID = "one";
      break;
    case "2":
      className = "button number-button";
      action = addToString(buttonValue);
      itemID = "two";
      break;
    case "3":
      className = "button number-button";
      action = addToString(buttonValue);
      itemID = "three";
      break;
    case "4":
      className = "button number-button";
      action = addToString(buttonValue);
      itemID = "four";
      break;
    case "5":
      className = "button number-button";
      action = addToString(buttonValue);
      itemID = "five";
      break;
    case "6":
      className = "button number-button";
      action = addToString(buttonValue);
      itemID = "six";
      break;
    case "7":
      className = "button number-button";
      action = addToString(buttonValue);
      itemID = "seven";
      break;
    case "8":
      className = "button number-button";
      action = addToString(buttonValue);
      itemID = "eight";
      break;
    case "9":
      className = "button number-button";
      action = addToString(buttonValue);
      itemID = "nine";
      break;
    case "0":
      className = "button number-button";
      action = addToString(buttonValue);
      itemID = "zero";
      break;
    case ".":
      className = "button number-button";
      action = addToString(buttonValue);
      itemID = "decimal";
      break;
    default:
      className = "button number-button";
      action = addToString(buttonValue);
  }

  const handleClick = () => {
    dispatch(action);
  };

  return (
    <div id={itemID} className={className} onClick={handleClick}>
      {buttonValue}
    </div>
  );
};

const CalculatorDisplay = () => {
  const displayValue = useSelector((state) => state);

  return (
    <div className="calculator-display" id="display">
      {displayValue}
    </div>
  );
};

const Calculator = () => {
  return (
    <div className="calculator">
      <CalculatorDisplay />

      <div className="row">
        <CalculatorButton buttonValue="AC" />
        <CalculatorButton buttonValue="Del" />
        <CalculatorButton buttonValue="/" />
      </div>

      <div className="row">
        <CalculatorButton buttonValue="7" />
        <CalculatorButton buttonValue="8" />
        <CalculatorButton buttonValue="9" />
        <CalculatorButton buttonValue="X" />
      </div>
      <div className="row">
        <CalculatorButton buttonValue="4" />
        <CalculatorButton buttonValue="5" />
        <CalculatorButton buttonValue="6" />
        <CalculatorButton buttonValue="-" />
      </div>
      <div className="row">
        <CalculatorButton buttonValue="1" />
        <CalculatorButton buttonValue="2" />
        <CalculatorButton buttonValue="3" />
        <CalculatorButton buttonValue="+" />
      </div>
      <div className="row">
        <CalculatorButton buttonValue=" " />
        <CalculatorButton buttonValue="0" />
        <CalculatorButton buttonValue="." />
        <CalculatorButton buttonValue="=" />
      </div>
    </div>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <Calculator />
  </Provider>,
  document.getElementById("calculator")
);
