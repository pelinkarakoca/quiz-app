import { useState } from "react";
const data = [
  {
    question: "What is the capital of Turkey",
    incorrectAnswers: ["İstanbul", "İzmir"],
    correctAnswer: "Ankara",
    id: 1,
  },
  {
    question: "What is the capital of Germany",
    incorrectAnswers: ["Cologne", "Munich"],
    correctAnswer: "Berlin",
    id: 2,
  },
  {
    question: "What is the capital of Italy",
    incorrectAnswers: ["Venice", "Milano"],
    correctAnswer: "Rome",
    id: 3,
  },
];

function App() {
  return (
    <div className="App">
      <QuizContainer data={data} />
    </div>
  );
}

function QuizContainer({ data }) {
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const item = data.at(currentQuestion);

  return (
    <div className="container">
      {currentQuestion < data.length ? (
        <Quiz
          item={item}
          key={item.id}
          onCorrectAnswer={setCorrectAnswers}
          onCurrentQuestion={setCurrentQuestion}
        />
      ) : (
        <ResultScreen correctAnswers={correctAnswers} />
      )}
    </div>
  );
}
function Quiz({ item, onCorrectAnswer, onCurrentQuestion }) {
  const answers = [...item.incorrectAnswers, item.correctAnswer];
  const [selection, setSelection] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (!selection) return;
    if (selection === item.correctAnswer) onCorrectAnswer((st) => st + 1);
    onCurrentQuestion((prev) => prev + 1);
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>{item.question}</p>
      {answers.map((answer, i) => (
        <Selection
          className="selection"
          key={i}
          answer={answer}
          onChange={setSelection}
        />
      ))}
      <Button className="button">Answer</Button>
    </form>
  );
}

function Selection({ answer, onChange, className }) {
  return (
    <label htmlFor={answer} className={className}>
      <input
        type="radio"
        name="question"
        value={answer}
        onChange={(e) => onChange(e.target.value)}
      />{" "}
      {answer}
    </label>
  );
}

function ResultScreen({ correctAnswers }) {
  return <p>You answered {correctAnswers} questions correct</p>;
}
function Button({ children, className = "" }) {
  return <button className={className}>{children}</button>;
}
export default App;

/*
map((item) => (
          <Quiz item={item} key={item.id} onCorrectAnswer={setCorrectAnswers} />
        ))
     */
