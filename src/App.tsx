import { useState, useCallback } from "react";
import "./App.css";

interface Consonant {
  hindi: string;
  romanized: string;
  pronunciation: string;
}

const CONSONANTS: Consonant[] = [
  { hindi: "क", romanized: "ka", pronunciation: "like 'k' in kite" },
  { hindi: "ख", romanized: "kha", pronunciation: "aspirated 'k'" },
  { hindi: "ग", romanized: "ga", pronunciation: "like 'g' in go" },
  { hindi: "घ", romanized: "gha", pronunciation: "aspirated 'g'" },
  { hindi: "ङ", romanized: "ṅa", pronunciation: "like 'ng' in sing" },

  { hindi: "च", romanized: "cha", pronunciation: "like 'ch' in chat" },
  { hindi: "छ", romanized: "chha", pronunciation: "aspirated 'ch'" },
  { hindi: "ज", romanized: "ja", pronunciation: "like 'j' in jam" },
  { hindi: "झ", romanized: "jha", pronunciation: "aspirated 'j'" },
  { hindi: "ञ", romanized: "ña", pronunciation: "like 'ny' in canyon" },

  { hindi: "ट", romanized: "ṭa", pronunciation: "retroflex 't'" },
  { hindi: "ठ", romanized: "ṭha", pronunciation: "aspirated retroflex 't'" },
  { hindi: "ड", romanized: "ḍa", pronunciation: "retroflex 'd'" },
  { hindi: "ढ", romanized: "ḍha", pronunciation: "aspirated retroflex 'd'" },
  { hindi: "ण", romanized: "ṇa", pronunciation: "retroflex 'n'" },

  { hindi: "त", romanized: "ta", pronunciation: "dental 't'" },
  { hindi: "थ", romanized: "tha", pronunciation: "aspirated dental 't'" },
  { hindi: "द", romanized: "da", pronunciation: "dental 'd'" },
  { hindi: "ध", romanized: "dha", pronunciation: "aspirated dental 'd'" },
  { hindi: "न", romanized: "na", pronunciation: "like 'n' in net" },

  { hindi: "प", romanized: "pa", pronunciation: "like 'p' in pin" },
  { hindi: "फ", romanized: "pha", pronunciation: "aspirated 'p'" },
  { hindi: "ब", romanized: "ba", pronunciation: "like 'b' in bat" },
  { hindi: "भ", romanized: "bha", pronunciation: "aspirated 'b'" },
  { hindi: "म", romanized: "ma", pronunciation: "like 'm' in mat" },

  { hindi: "य", romanized: "ya", pronunciation: "like 'y' in yes" },
  { hindi: "र", romanized: "ra", pronunciation: "like 'r' in run" },
  { hindi: "ल", romanized: "la", pronunciation: "like 'l' in lip" },
  { hindi: "व", romanized: "va", pronunciation: "like 'v' in vine" },

  { hindi: "श", romanized: "śha", pronunciation: "like 'sh' in ship" },
  { hindi: "ष", romanized: "ṣha", pronunciation: "retroflex 'sh'" },
  { hindi: "स", romanized: "sa", pronunciation: "like 's' in sun" },
  { hindi: "ह", romanized: "ha", pronunciation: "like 'h' in hat" },
];

type View = "menu" | "flashcards" | "stats";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function App() {
  const [view, setView] = useState<View>("menu");
  const [deck, setDeck] = useState<Consonant[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  // Stats: tracks last result (true = correct, false = wrong) for each character
  const [stats, setStats] = useState<Record<string, boolean>>(
    () => {
      const saved = localStorage.getItem("hindi-stats-v2");
      return saved ? JSON.parse(saved) : {};
    }
  );

  const saveStats = useCallback(
    (newStats: Record<string, boolean>) => {
      setStats(newStats);
      localStorage.setItem("hindi-stats-v2", JSON.stringify(newStats));
    },
    []
  );

  const startSession = (weakOnly = false) => {
    let cards = CONSONANTS;
    if (weakOnly) {
      cards = CONSONANTS.filter((c) => stats[c.hindi] !== true);
      if (cards.length === 0) cards = CONSONANTS;
    }
    setDeck(shuffle(cards));
    setCurrentIndex(0);
    setFlipped(false);
    setView("flashcards");
  };

  const markAnswer = (correct: boolean) => {
    const card = deck[currentIndex];
    const newStats = { ...stats, [card.hindi]: correct };
    saveStats(newStats);
    setFlipped(false);
    setCurrentIndex((i) => i + 1);
  };

  const resetStats = () => {
    saveStats({});
  };

  const current = deck[currentIndex];
  const isFinished = currentIndex >= deck.length;

  if (view === "menu") {
    return (
      <div className="container">
        <h1>हिन्दी व्यंजन</h1>
        <p className="subtitle">Hindi Consonant Flashcards</p>
        <div className="menu">
          <button className="btn primary" onClick={() => startSession()}>
            All Cards
          </button>
          <button className="btn primary" onClick={() => startSession(true)}>
            Weak Only
          </button>
          <button className="btn secondary" onClick={() => setView("stats")}>
            View Stats
          </button>
        </div>
        <p className="info">{CONSONANTS.length} consonants to learn</p>
      </div>
    );
  }

  if (view === "stats") {
    const correct = CONSONANTS.filter((c) => stats[c.hindi] === true).length;
    const attempted = CONSONANTS.filter((c) => stats[c.hindi] !== undefined).length;

    return (
      <div className="container">
        <h1>Your Progress</h1>
        {attempted > 0 && (
          <p className="overall">
            {correct} / {CONSONANTS.length} mastered
          </p>
        )}
        <div className="stats-grid">
          {CONSONANTS.map((c) => {
            const result = stats[c.hindi];
            const status = result === undefined ? "untried" : result ? "good" : "bad";
            return (
              <div key={c.hindi} className={`stat-card ${status}`}>
                <span className="stat-hindi">{c.hindi}</span>
                <span className="stat-roman">{c.romanized}</span>
                <span className={`stat-pct ${result === undefined ? "dim" : ""}`}>
                  {result === undefined ? "—" : result ? "✓" : "✗"}
                </span>
              </div>
            );
          })}
        </div>
        <div className="menu">
          <button className="btn primary" onClick={() => startSession()}>
            All Cards
          </button>
          <button className="btn primary" onClick={() => startSession(true)}>
            Weak Only
          </button>
          <button className="btn secondary" onClick={() => setView("menu")}>
            Back
          </button>
          {attempted > 0 && (
            <button className="btn danger" onClick={resetStats}>
              Reset Stats
            </button>
          )}
        </div>
      </div>
    );
  }

  // Flashcard view
  if (isFinished) {

    return (
      <div className="container">
        <h1>Session Complete!</h1>
        <p className="overall">
          You've reviewed all {deck.length} consonants
        </p>
        <div className="menu">
          <button className="btn primary" onClick={() => startSession()}>
            All Cards
          </button>
          <button className="btn primary" onClick={() => startSession(true)}>
            Weak Only
          </button>
          <button className="btn secondary" onClick={() => setView("stats")}>
            View Stats
          </button>
          <button className="btn secondary" onClick={() => setView("menu")}>
            Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flashcard-layout">
      <div className="flashcard-main">
        <div className="progress">
          {currentIndex + 1} / {deck.length}
        </div>

        <div className={`flashcard ${flipped ? "flipped" : ""}`} onClick={() => setFlipped(true)}>
          {!flipped ? (
            <div className="card-front">
              <span className="hindi-char">{current.hindi}</span>
              <span className="tap-hint">tap to reveal</span>
            </div>
          ) : (
            <div className="card-back">
              <span className="hindi-char">{current.hindi}</span>
              <span className="romanized">{current.romanized}</span>
              <span className="pronunciation">{current.pronunciation}</span>
            </div>
          )}
        </div>

        {flipped && (
          <div className="answer-buttons">
            <button className="btn wrong" onClick={() => markAnswer(false)}>
              ✗ Wrong
            </button>
            <button className="btn correct" onClick={() => markAnswer(true)}>
              ✓ Correct
            </button>
          </div>
        )}
      </div>

      <div className="sidebar-stats">
        <div className="stats-grid compact">
          {CONSONANTS.map((c) => {
            const result = stats[c.hindi];
            const status = result === undefined ? "untried" : result ? "good" : "bad";
            const isCurrent = current.hindi === c.hindi;
            return (
              <div
                key={c.hindi}
                className={`stat-card ${isCurrent ? "current" : ""} ${status}`}
              >
                <span className="stat-hindi">{c.hindi}</span>
                <span className={`stat-pct ${result === undefined ? "dim" : ""}`}>
                  {result === undefined ? "—" : result ? "✓" : "✗"}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
