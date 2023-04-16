import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import questions from "../questions.json";
import "./MainPage.css";

const MainPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [randomQuestion, setRandomQuestion] = useState(null);
  const [buttonPositions, setButtonPositions] = useState([]);
  const [finishGame, setFinishGame] = useState(false);
  const [buttonText, setButtonText] = useState("Check results");
  const [result, setResult] = useState(0);
  const arrayOfChosenWords = [];

  useEffect(() => {
    const question = questions[Math.floor(Math.random() * questions.length)];
    setRandomQuestion(question);

    const positions = question.all_words.map(() => ({
      left: `${Math.floor(Math.random() * 400)}px`,
      top: `${Math.floor(Math.random() * 300)}px`,
    }));
    setButtonPositions(positions);
  }, [randomQuestion]);

  const handleWordClick = (item) => {
    item.clicked = !item.clicked;

    const index = arrayOfChosenWords.indexOf(item.word);
    if (item.clicked) {
      arrayOfChosenWords.push(item.word);
    } else {
      if (index > -1) {
        arrayOfChosenWords.splice(index, 1);
      }
    }
  };

  const checkResult = () => {
    const correctAnswers = randomQuestion.good_words.filter((item) => {
      return arrayOfChosenWords.indexOf(item) >= 0;
    });

    const incorrectAnswers = arrayOfChosenWords.filter((item) => {
      return correctAnswers.indexOf(item) < 0;
    });

    console.log(
      `${correctAnswers.length}/${randomQuestion.good_words.length} correct, but ${incorrectAnswers.length} incorrect`
    );

    correctAnswers.forEach((item) => {
      const index = randomQuestion.all_words.map((i) => i.word).indexOf(item);
      document.getElementById(`button-${index}`).style.color = "green";
    });

    incorrectAnswers.forEach((item) => {
      const index = randomQuestion.all_words.map((i) => i.word).indexOf(item);
      document.getElementById(`button-${index}`).style.color = "red";
    });

    setResult(
      2 * correctAnswers.length -
        (incorrectAnswers.length +
          (randomQuestion.good_words.length - correctAnswers.length))
    );

    if (finishGame) {
      navigate("/finish", {
        replace: true,
        state: {
          username: location.state.username,
          result: result,
        },
      });
      console.log(`finish, passing: ${correctAnswers}`);
    }
  };

  return (
    <div className="main-container">
      {randomQuestion && (
        <div>
          <h1>{randomQuestion.question}</h1>
          <div className="wordsContainer">
            {randomQuestion.all_words.map((item, index) => (
              <button
                key={index}
                id={`button-${index}`}
                onClick={() => {
                  handleWordClick(item);
                  if (item.clicked)
                    document.getElementById(`button-${index}`).style.color =
                      "gray";
                  else
                    document.getElementById(`button-${index}`).style.color =
                      "black";
                }}
                style={{
                  background: "none",
                  border: "none",
                  margin: 0,
                  padding: 0,
                  cursor: "pointer",
                  fontSize: "20px",
                  color: "black",
                  position: "absolute",
                  left: buttonPositions[index]?.left,
                  top: buttonPositions[index]?.top,
                }}
              >
                {item.word}
              </button>
            ))}
          </div>
        </div>
      )}
      <button
        class="button-check"
        onClick={() => {
          checkResult();
          setButtonText("Finish game");
          setFinishGame(true);
        }}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default MainPage;
