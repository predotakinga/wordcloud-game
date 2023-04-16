import { Routes, Route } from "react-router-dom";
import WelcomePage from "./Components/WelcomePage";
import MainPage from "./Components/MainPage";
import ResultsPage from "./Components/ResultsPage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />}></Route>
      <Route path="/game" element={<MainPage />}></Route>
      <Route path="/finish" element={<ResultsPage />}></Route>
    </Routes>
  );
}

export default App;
