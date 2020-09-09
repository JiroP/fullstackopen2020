import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const StatisticLine = ({ description, amount }) => (
  <tr>
    <td>{description}</td>
    <td>{amount}</td>
  </tr>
);

const Statistics = ({ bad, neutral, good }) => {
  const sum = bad + neutral + good;
  const average = (bad * -1 + good * 1) / sum;

  return (
    <>
      {sum ? (
        <table>
          <tbody>
            <StatisticLine description="good" amount={good} />
            <StatisticLine description="neutral" amount={neutral} />
            <StatisticLine description="bad" amount={bad} />
            <StatisticLine description="all" amount={sum} />
            <StatisticLine description="average" amount={average} />
          </tbody>
        </table>
      ) : (
        <p>No feedback given</p>
      )}
    </>
  );
};

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h1>statistics</h1>
      <Statistics bad={bad} neutral={neutral} good={good} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
