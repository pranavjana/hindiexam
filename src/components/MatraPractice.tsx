import { useState, useMemo } from "react";
import { MATRAS, MATRA_CONSONANTS, shuffle } from "../data";

interface Question {
  devanagari: string;       // combined form shown as the question, e.g. "का"
  correctSound: string;     // e.g. "kā"
  options: string[];         // 4 romanized sounds
  matraKey: string;          // for stats tracking
}

function generateQuestions(count: number): Question[] {
  const questions: Question[] = [];
  const consonants = shuffle(MATRA_CONSONANTS);
  const matras = shuffle(MATRAS);

  for (let i = 0; i < count; i++) {
    const c = consonants[i % consonants.length];
    const m = matras[i % matras.length];
    const devanagari = c.hindi + m.matra;
    const correctSound = c.base + m.roman;

    // 3 wrong options: same consonant + different vowel sounds
    const wrongMatras = shuffle(MATRAS.filter((x) => x.matra !== m.matra)).slice(0, 3);
    const options = shuffle([
      correctSound,
      ...wrongMatras.map((wm) => c.base + wm.roman),
    ]);

    questions.push({ devanagari, correctSound, options, matraKey: m.matra });
  }
  return questions;
}

export default function MatraPractice({ onBack }: { onBack: () => void }) {
  const [mode, setMode] = useState<"menu" | "practice" | "done">("menu");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [stats, setStats] = useState<Record<string, boolean>>(() => {
    const s = localStorage.getItem("hindi-matra-stats");
    return s ? JSON.parse(s) : {};
  });

  const matraMastered = useMemo(() => {
    return MATRAS.filter((m) => stats[m.matra] === true).length;
  }, [stats]);

  const saveStats = (key: string, correct: boolean) => {
    const next = { ...stats, [key]: correct };
    setStats(next);
    localStorage.setItem("hindi-matra-stats", JSON.stringify(next));
  };

  const start = () => {
    setQuestions(generateQuestions(20));
    setIdx(0);
    setSelected(null);
    setScore(0);
    setMode("practice");
  };

  const handleSelect = (opt: string) => {
    if (selected) return;
    setSelected(opt);
    const q = questions[idx];
    const correct = opt === q.correctSound;
    if (correct) setScore((s) => s + 1);
    saveStats(q.matraKey, correct);
  };

  const next = () => {
    setSelected(null);
    if (idx + 1 >= questions.length) setMode("done");
    else setIdx(idx + 1);
  };

  if (mode === "menu") {
    return (
      <div className="container">
        <h1>मात्रा</h1>
        <p className="subtitle">Matra (Vowel Sign) Practice</p>
        <p className="overall">{matraMastered} / {MATRAS.length} mastered</p>
        <div className="matra-reference">
          <div className="stats-grid" style={{ marginTop: "1rem" }}>
            {MATRAS.map((m) => {
              const r = stats[m.matra];
              const s = r === undefined ? "untried" : r ? "good" : "bad";
              return (
                <div key={m.matra} className={`stat-card ${s}`}>
                  <span className="stat-hindi">{m.display}</span>
                  <span className="stat-roman">{m.roman}</span>
                  <span className={`stat-pct ${r === undefined ? "dim" : ""}`}>
                    {r === undefined ? "—" : r ? "✓" : "✗"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="menu">
          <button className="btn primary" onClick={start}>Start Practice</button>
          <button className="btn secondary" onClick={onBack}>Back</button>
        </div>
      </div>
    );
  }

  if (mode === "done") {
    return (
      <div className="container">
        <h1>Session Complete!</h1>
        <p className="overall">{score} / {questions.length} correct</p>
        <div className="menu">
          <button className="btn primary" onClick={start}>Go Again</button>
          <button className="btn secondary" onClick={() => setMode("menu")}>Stats</button>
          <button className="btn secondary" onClick={onBack}>Home</button>
        </div>
      </div>
    );
  }

  const q = questions[idx];
  return (
    <div className="container">
      <div className="progress">{idx + 1} / {questions.length}</div>
      <div className="matra-prompt">
        <span className="matra-equation">{q.devanagari}</span>
        <span className="matra-hint">How does this sound?</span>
      </div>
      <div className="matra-options">
        {q.options.map((opt, i) => {
          let cls = "btn matra-opt sound-opt";
          if (selected) {
            if (opt === q.correctSound) cls += " correct";
            else if (opt === selected) cls += " wrong";
          }
          return (
            <button key={i} className={cls} onClick={() => handleSelect(opt)}>
              {opt}
            </button>
          );
        })}
      </div>
      {selected && (
        <button className="btn primary" onClick={next} style={{ marginTop: "1rem" }}>
          Next
        </button>
      )}
    </div>
  );
}
