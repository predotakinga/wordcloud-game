import React from "react";
import { useLocation } from "react-router-dom";
import "./ResultsPage.css";

const ResultsPage = () => {
  const location = useLocation();
  let { username, result } = location.state;

  console.log(username);

  return (
    <div className="container">
      <h1>Congrats, {username}!</h1>
      <h1>Your score:</h1>
      <h1 style={{ color: "dodgerblue" }}>{result} points</h1>
    </div>
  );
};

export default ResultsPage;
