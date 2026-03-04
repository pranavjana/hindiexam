import { useState } from "react";
import "./App.css";
import ConsonantFlashcards from "./components/ConsonantFlashcards";
import VowelFlashcards from "./components/VowelFlashcards";
import MatraPractice from "./components/MatraPractice";
import GrammarPractice from "./components/GrammarPractice";
import ReadingPractice from "./components/ReadingPractice";

type Section = "home" | "consonants" | "vowels" | "matras" | "grammar" | "reading";

const SECTIONS: { key: Section; hindi: string; english: string; desc: string }[] = [
  { key: "consonants", hindi: "व्यंजन", english: "Consonants", desc: "33 consonant flashcards" },
  { key: "vowels", hindi: "स्वर", english: "Vowels", desc: "12 vowel flashcards" },
  { key: "matras", hindi: "मात्रा", english: "Matras", desc: "Vowel sign multiple choice" },
  { key: "grammar", hindi: "व्याकरण", english: "Grammar", desc: "होना, postpositions, question words" },
  { key: "reading", hindi: "पठन", english: "Reading", desc: "Passage comprehension" },
];

function App() {
  const [section, setSection] = useState<Section>("home");

  const goHome = () => setSection("home");

  switch (section) {
    case "consonants": return <ConsonantFlashcards onBack={goHome} />;
    case "vowels": return <VowelFlashcards onBack={goHome} />;
    case "matras": return <MatraPractice onBack={goHome} />;
    case "grammar": return <GrammarPractice onBack={goHome} />;
    case "reading": return <ReadingPractice onBack={goHome} />;
  }

  return (
    <div className="container">
      <h1>हिन्दी परीक्षा</h1>
      <p className="subtitle">Hindi Midterm Practice</p>
      <div className="section-cards">
        {SECTIONS.map((s) => (
          <button key={s.key} className="section-card" onClick={() => setSection(s.key)}>
            <span className="section-card-title">{s.hindi}</span>
            <span className="section-card-sub">{s.english}</span>
            <span className="section-card-count">{s.desc}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
