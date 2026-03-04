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
  const [stats, setStats] = useState<Record<string, { correct: number; wrong: number }>>(
    () => {
      const saved = localStorage.getItem("hindi-stats");
      return saved ? JSON.parse(saved) : {};
    }
  );

  const saveStats = useCallback(
    (newStats: Record<string, { correct: number; wrong: number }>) => {
      setStats(newStats);
      localStorage.setItem("hindi-stats", JSON.stringify(newStats));
    },
    []
  );

  const startSession = (weakOnly = false) => {
    let cards = CONSONANTS;
    if (weakOnly) {
      cards = CONSONANTS.filter((c) => {
        const s = stats[c.hindi];
        if (!s) return true; // never attempted
        const total = s.correct + s.wrong;
        return total === 0 || s.correct / total < 1;
      });
      if (cards.length === 0) cards = CONSONANTS; // fallback if all 100%
    }
    setDeck(shuffle(cards));
    setCurrentIndex(0);
    setFlipped(false);
    setView("flashcards");
  };

  const markAnswer = (correct: boolean) => {
    const card = deck[currentIndex];
    const prev = stats[card.hindi] || { correct: 0, wrong: 0 };
    const newStats = {
      ...stats,
      [card.hindi]: {
        correct: prev.correct + (correct ? 1 : 0),
        wrong: prev.wrong + (correct ? 0 : 1),
      },
    };
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
    const entries = CONSONANTS.map((c) => ({
      ...c,
      ...(stats[c.hindi] || { correct: 0, wrong: 0 }),
    }));
    const totalCorrect = entries.reduce((s, e) => s + e.correct, 0);
    const totalWrong = entries.reduce((s, e) => s + e.wrong, 0);
    const total = totalCorrect + totalWrong;

    return (
      <div className="container">
        <h1>Your Progress</h1>
        {total > 0 && (
          <p className="overall">
            Overall: {totalCorrect}/{total} ({Math.round((totalCorrect / total) * 100)}%)
          </p>
        )}
        <div className="stats-grid">
          {entries.map((e) => {
            const attempts = e.correct + e.wrong;
            const pct = attempts > 0 ? Math.round((e.correct / attempts) * 100) : -1;
            return (
              <div
                key={e.hindi}
                className={`stat-card ${pct === -1 ? "untried" : pct >= 80 ? "good" : pct >= 50 ? "ok" : "bad"}`}
              >
                <span className="stat-hindi">{e.hindi}</span>
                <span className="stat-roman">{e.romanized}</span>
                {attempts > 0 ? (
                  <span className="stat-pct">{pct}%</span>
                ) : (
                  <span className="stat-pct dim">—</span>
                )}
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
          {total > 0 && (
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
            const s = stats[c.hindi] || { correct: 0, wrong: 0 };
            const attempts = s.correct + s.wrong;
            const pct = attempts > 0 ? Math.round((s.correct / attempts) * 100) : -1;
            const isCurrent = current.hindi === c.hindi;
            return (
              <div
                key={c.hindi}
                className={`stat-card ${isCurrent ? "current" : ""} ${pct === -1 ? "untried" : pct >= 80 ? "good" : pct >= 50 ? "ok" : "bad"}`}
              >
                <span className="stat-hindi">{c.hindi}</span>
                {attempts > 0 ? (
                  <span className="stat-pct">{pct}%</span>
                ) : (
                  <span className="stat-pct dim">—</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
