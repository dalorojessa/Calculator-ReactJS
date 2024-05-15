import React, { useState } from 'react';
import './App.css';

const Calculator = () => {
  const [display, setDisplay] = useState('');
  const [numbers, setNumbers] = useState([]);
  const [operations, setOperations] = useState([]);
  const [currentNumber, setCurrentNumber] = useState('');

  const numberClick = (n) => {
    setCurrentNumber((prev) => prev + n);
    setDisplay((prev) => prev + n);
  };

  const operationClick = (op) => {
    if (currentNumber !== '') {
      setNumbers((prev) => [...prev, parseFloat(currentNumber)]);
      setCurrentNumber('');
      setOperations((prev) => [...prev, op]);
      setDisplay((prev) => prev + op);
    }
  };

  const calculate = () => {
    if (currentNumber !== '') {
      setNumbers((prev) => [...prev, parseFloat(currentNumber)]);
    }

    let nums = [...numbers, parseFloat(currentNumber)];
    let ops = [...operations];

    while (ops.includes('x') || ops.includes('/')) {
      let opIndex = ops.indexOf('x') !== -1 ? ops.indexOf('x') : ops.indexOf('/');
      let firstNumber = nums[opIndex];
      let secondNumber = nums[opIndex + 1];
      let op = ops[opIndex];

      if (op === 'x') {
        nums.splice(opIndex, 2, firstNumber * secondNumber);
      } else {
        nums.splice(opIndex, 2, firstNumber / secondNumber);
      }
      ops.splice(opIndex, 1);
    }

    while (ops.includes('+') || ops.includes('-')) {
      let opIndex = ops.indexOf('+') !== -1 ? ops.indexOf('+') : ops.indexOf('-');
      let firstNumber = nums[opIndex];
      let secondNumber = nums[opIndex + 1];
      let op = ops[opIndex];

      if (op === '+') {
        nums.splice(opIndex, 2, firstNumber + secondNumber);
      } else {
        nums.splice(opIndex, 2, firstNumber - secondNumber);
      }
      ops.splice(opIndex, 1);
    }

    let result = nums[0];
    setDisplay(result.toString());
    setCurrentNumber(result.toString());
    setNumbers([]);
    setOperations([]);
  };

  const clearDisplay = () => {
    setDisplay('');
    setCurrentNumber('');
    setNumbers([]);
    setOperations([]);
  };

  const toggleSign = () => {
    if (currentNumber.startsWith('-')) {
      setCurrentNumber(currentNumber.substring(1));
      setDisplay(currentNumber.substring(1));
    } else {
      setCurrentNumber('-' + currentNumber);
      setDisplay('-' + currentNumber);
    }
  };

  const addPoint = () => {
    if (!currentNumber.includes('.')) {
      setCurrentNumber(currentNumber + '.');
      setDisplay(display + '.');
    }
  };

  return (
    <div className="border">
      <p>C A L C U L A T O R</p>
      <input type="text" id="display" readOnly value={display} />
      <div className="row">
        <button className="clear" onClick={clearDisplay}>C</button>
        <button onClick={toggleSign}>+/-</button>
        <button onClick={() => operationClick('/')}>/</button>
      </div>
      <div className="row">
        <button onClick={() => numberClick('7')}>7</button>
        <button onClick={() => numberClick('8')}>8</button>
        <button onClick={() => numberClick('9')}>9</button>
        <button onClick={() => operationClick('x')}>x</button>
      </div>
      <div className="row">
        <button onClick={() => numberClick('4')}>4</button>
        <button onClick={() => numberClick('5')}>5</button>
        <button onClick={() => numberClick('6')}>6</button>
        <button onClick={() => operationClick('-')}>-</button>
      </div>
      <div className="row">
        <button onClick={() => numberClick('1')}>1</button>
        <button onClick={() => numberClick('2')}>2</button>
        <button onClick={() => numberClick('3')}>3</button>
        <button onClick={() => operationClick('+')}>+</button>
      </div>
      <div className="row">
        <button onClick={() => numberClick('0')}>0</button>
        <button onClick={addPoint}>.</button>
        <button onClick={calculate} className="equal">=</button>
      </div>
    </div>
  );
};

export default Calculator;
