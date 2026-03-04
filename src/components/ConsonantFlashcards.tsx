import { useState, useCallback } from "react";
import { CONSONANTS, shuffle } from "../data";
import type { Consonant } from "../data";

export default function ConsonantFlashcards({ onBack }: { onBack: () => void }) {
  const [mode, setMode] = useState<"menu" | "practice" | "done">("menu");
  const [deck, setDeck] = useState<Consonant[]>([]);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [stats, setStats] = useState<Record<string, boolean>>(() => {
    const s = localStorage.getItem("hindi-consonant-stats");
    return s ? JSON.parse(s) : {};
  });

  const save = useCallback((s: Record<string, boolean>) => {
    setStats(s);
    localStorage.setItem("hindi-consonant-stats", JSON.stringify(s));
  }, []);

  const start = (weakOnly = false) => {
    let cards: Consonant[] = CONSONANTS;
    if (weakOnly) {
      cards = CONSONANTS.filter((c) => stats[c.hindi] !== true);
      if (cards.length === 0) cards = CONSONANTS;
    }
    setDeck(shuffle(cards));
    setIdx(0);
    setFlipped(false);
    setMode("practice");
  };

  const mark = (correct: boolean) => {
    save({ ...stats, [deck[idx].hindi]: correct });
    setFlipped(false);
    if (idx + 1 >= deck.length) setMode("done");
    else setIdx(idx + 1);
  };

  if (mode === "menu") {
    const mastered = CONSONANTS.filter((c) => stats[c.hindi] === true).length;
    return (
      <div className="container">
        <h1>व्यंजन</h1>
        <p className="subtitle">Consonant Flashcards</p>
        <p className="overall">{mastered} / {CONSONANTS.length} mastered</p>
        <div className="menu">
          <button className="btn primary" onClick={() => start()}>All Cards</button>
          <button className="btn primary" onClick={() => start(true)}>Weak Only</button>
          <button className="btn secondary" onClick={onBack}>Back</button>
        </div>
        <div className="stats-grid" style={{ marginTop: "1rem" }}>
          {CONSONANTS.map((c) => {
            const r = stats[c.hindi];
            const s = r === undefined ? "untried" : r ? "good" : "bad";
            return (
              <div key={c.hindi} className={`stat-card ${s}`}>
                <span className="stat-hindi">{c.hindi}</span>
                <span className="stat-roman">{c.romanized}</span>
                <span className={`stat-pct ${r === undefined ? "dim" : ""}`}>
                  {r === undefined ? "—" : r ? "✓" : "✗"}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (mode === "done") {
    return (
      <div className="container">
        <h1>Session Complete!</h1>
        <p className="overall">Reviewed {deck.length} consonants</p>
        <div className="menu">
          <button className="btn primary" onClick={() => start()}>All Cards</button>
          <button className="btn primary" onClick={() => start(true)}>Weak Only</button>
          <button className="btn secondary" onClick={() => setMode("menu")}>Stats</button>
          <button className="btn secondary" onClick={onBack}>Home</button>
        </div>
      </div>
    );
  }

  const card = deck[idx];
  return (
    <div className="flashcard-layout">
      <div className="flashcard-main">
        <div className="progress">{idx + 1} / {deck.length}</div>
        <div className={`flashcard ${flipped ? "flipped" : ""}`} onClick={() => setFlipped(true)}>
          {!flipped ? (
            <div className="card-front">
              <span className="hindi-char">{card.hindi}</span>
              <span className="tap-hint">tap to reveal</span>
            </div>
          ) : (
            <div className="card-back">
              <span className="hindi-char">{card.hindi}</span>
              <span className="romanized">{card.romanized}</span>
              <span className="pronunciation">{card.pronunciation}</span>
            </div>
          )}
        </div>
        {flipped && (
          <div className="answer-buttons">
            <button className="btn wrong" onClick={() => mark(false)}>✗ Wrong</button>
            <button className="btn correct" onClick={() => mark(true)}>✓ Correct</button>
          </div>
        )}
      </div>
      <div className="sidebar-stats">
        <div className="stats-grid compact">
          {CONSONANTS.map((c) => {
            const r = stats[c.hindi];
            const s = r === undefined ? "untried" : r ? "good" : "bad";
            return (
              <div key={c.hindi} className={`stat-card ${card.hindi === c.hindi ? "current" : ""} ${s}`}>
                <span className="stat-hindi">{c.hindi}</span>
                <span className={`stat-pct ${r === undefined ? "dim" : ""}`}>
                  {r === undefined ? "—" : r ? "✓" : "✗"}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
