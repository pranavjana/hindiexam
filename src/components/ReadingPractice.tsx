import { useState } from "react";
import { READING_PASSAGES } from "../data";
import type { ReadingPassage } from "../data";

function PassageExercise({
  passage,
  onBack,
}: {
  passage: ReadingPassage;
  onBack: () => void;
}) {
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<(boolean | null)[]>(
    () => passage.questions.map(() => null)
  );
  const [done, setDone] = useState(false);

  const handleAnswer = (answer: boolean) => {
    const next = [...answers];
    next[idx] = answer;
    setAnswers(next);

    if (idx + 1 >= passage.questions.length) {
      setDone(true);
    } else {
      setIdx(idx + 1);
    }
  };

  const score = answers.filter((a, i) => a === passage.questions[i].answer).length;

  if (done) {
    return (
      <div className="container" style={{ maxWidth: "700px" }}>
        <h1>Complete!</h1>
        <p className="overall">{score} / {passage.questions.length} correct</p>
        <div className="reading-review">
          {passage.questions.map((q, i) => {
            const userAns = answers[i];
            const isCorrect = userAns === q.answer;
            return (
              <div key={i} className={`review-item ${isCorrect ? "good" : "bad"}`}>
                <span className="review-text">{q.text}</span>
                <span className="review-result">
                  {isCorrect ? "✓" : `✗ (${q.answer ? "सही" : "ग़लत"})`}
                </span>
              </div>
            );
          })}
        </div>
        <div className="menu">
          <button className="btn primary" onClick={() => { setIdx(0); setAnswers(passage.questions.map(() => null)); setDone(false); }}>
            Retry
          </button>
          <button className="btn secondary" onClick={onBack}>Back</button>
        </div>
      </div>
    );
  }

  const q = passage.questions[idx];

  return (
    <div className="container" style={{ maxWidth: "700px" }}>
      <div className="progress">{idx + 1} / {passage.questions.length}</div>
      <div className="reading-passage">{passage.passage}</div>
      <div className="reading-question">
        <p className="reading-q-text">{q.text}</p>
        <div className="answer-buttons">
          <button className="btn correct" onClick={() => handleAnswer(true)}>
            सही (True)
          </button>
          <button className="btn wrong" onClick={() => handleAnswer(false)}>
            ग़लत (False)
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ReadingPractice({ onBack }: { onBack: () => void }) {
  const [selectedPassage, setSelectedPassage] = useState<ReadingPassage | null>(null);

  if (selectedPassage) {
    return <PassageExercise passage={selectedPassage} onBack={() => setSelectedPassage(null)} />;
  }

  return (
    <div className="container">
      <h1>पठन</h1>
      <p className="subtitle">Reading Comprehension</p>
      <div className="section-cards">
        {READING_PASSAGES.map((p, i) => (
          <button key={i} className="section-card" onClick={() => setSelectedPassage(p)}>
            <span className="section-card-title">{p.title}</span>
            <span className="section-card-count">{p.questions.length} questions</span>
          </button>
        ))}
      </div>
      <button className="btn secondary" onClick={onBack} style={{ marginTop: "1rem" }}>
        Back
      </button>
    </div>
  );
}
