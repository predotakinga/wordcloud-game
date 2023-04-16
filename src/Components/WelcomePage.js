import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./WelcomePage.css";

const WelcomePage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (username.trim().length !== 0) {
      navigate("/game", {
        state: {
          username: username,
        },
      });
    } else {
      console.log("input value is empty");
    }
  }

  return (
    <>
      <div className="container">
        <h1>Wordcloud game</h1>
        <form onSubmit={handleSubmit} className="form-container">
          <label>
            <input
              type="text"
              name="name"
              value={username}
              placeholder="Set username"
              onChange={(event) => setUsername(event.target.value)}
            />
          </label>
          <input type="submit" value="Play" id="submit" />
        </form>
      </div>
    </>
  );
};

export default WelcomePage;
