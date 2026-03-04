import { useState } from "react";
import {
  HONA_QUESTIONS, HONA_OPTIONS,
  POSTPOSITION_QUESTIONS, POSTPOSITION_OPTIONS,
  QUESTION_WORD_QUESTIONS, QUESTION_WORD_OPTIONS,
  shuffle,
} from "../data";
import type { FillBlankQuestion } from "../data";

type GrammarSection = "menu" | "hona" | "postpositions" | "questions";

interface SectionConfig {
  title: string;
  subtitle: string;
  questions: FillBlankQuestion[];
  options: string[];
  storageKey: string;
  guide: { heading: string; rows: { term: string; sound: string; meaning: string; rule: string }[]; notes?: string[] };
}

const SECTIONS: Record<string, SectionConfig> = {
  hona: {
    title: "होना",
    subtitle: "Verb 'to be' — हो / है / हैं / हूँ",
    questions: HONA_QUESTIONS,
    options: HONA_OPTIONS,
    storageKey: "hindi-grammar-hona",
    guide: {
      heading: "The verb 'to be' changes based on the subject:",
      rows: [
        { term: "हूँ", sound: "hoon", meaning: "am", rule: "Used with मैं / main (I)" },
        { term: "है", sound: "hai", meaning: "is", rule: "Used with वह / voh, यह / yeh (he/she/this/that) — singular" },
        { term: "हो", sound: "ho", meaning: "are", rule: "Used with तुम / tum (you, informal)" },
        { term: "हैं", sound: "hain", meaning: "are", rule: "Used with हम / hum (we), आप / aap (you, formal), वे / ve, ये / ye (they/these), and elders (माँ / maa, पिताजी / pitaaji — honorific)" },
      ],
      notes: [
        "Elders and respected people always get हैं (hain) even if singular — this is honorific plural.",
        "यह (yeh) / वह (voh) = singular (है / hai), ये (ye) / वे (ve) = plural (हैं / hain).",
      ],
    },
  },
  postpositions: {
    title: "परसर्ग",
    subtitle: "Postpositions — में / से / पर / तक / को / के / का / की",
    questions: POSTPOSITION_QUESTIONS,
    options: POSTPOSITION_OPTIONS,
    storageKey: "hindi-grammar-post",
    guide: {
      heading: "Postpositions come AFTER the noun (unlike English prepositions):",
      rows: [
        { term: "में", sound: "mein", meaning: "in", rule: "Location inside — Singapore mein (in Singapore)" },
        { term: "पर", sound: "par", meaning: "on / at", rule: "Location on surface — mez par (on the table)" },
        { term: "से", sound: "se", meaning: "from / with / by", rule: "Origin or instrument — yahaan se (from here)" },
        { term: "तक", sound: "tak", meaning: "until / up to", rule: "Limit of time/place — shaam tak (until evening)" },
        { term: "को", sound: "ko", meaning: "to / for", rule: "Direction or indirect object — school ko (to school)" },
        { term: "का", sound: "kaa", meaning: "'s (masc. sg.)", rule: "Possession — Ram kaa bhai (Ram's brother)" },
        { term: "के", sound: "ke", meaning: "'s (masc. pl./oblique)", rule: "Possession — Ram ke bhai (Ram's brothers)" },
        { term: "की", sound: "kee", meaning: "'s (feminine)", rule: "Possession — Ram kee behen (Ram's sister)" },
      ],
      notes: [
        "का (kaa) / के (ke) / की (kee) agree with the POSSESSED noun's gender/number, NOT the possessor.",
        "Masculine singular → का (kaa), masculine plural → के (ke), feminine (any) → की (kee).",
      ],
    },
  },
  questions: {
    title: "प्रश्न शब्द",
    subtitle: "Question Words — कौन / क्या / कहाँ / कब ...",
    questions: QUESTION_WORD_QUESTIONS,
    options: QUESTION_WORD_OPTIONS,
    storageKey: "hindi-grammar-qwords",
    guide: {
      heading: "Hindi question words and when to use each:",
      rows: [
        { term: "क्या", sound: "kyaa", meaning: "what", rule: "Asking about things — yeh kyaa hai? (What is this?)" },
        { term: "कौन", sound: "kaun", meaning: "who", rule: "Asking about people — yeh kaun hai? (Who is this?)" },
        { term: "कहाँ", sound: "kahaan", meaning: "where", rule: "Asking about place — tum kahaan ho? (Where are you?)" },
        { term: "कब", sound: "kab", meaning: "when", rule: "Asking about time — shaadi kab hai? (When is the wedding?)" },
        { term: "क्यों", sound: "kyon", meaning: "why", rule: "Asking for reason — voh kyon udaas hai? (Why is he sad?)" },
        { term: "कैसा/कैसी/कैसे", sound: "kaisaa/kaisee/kaise", meaning: "how / what kind", rule: "Agrees with gender: kaisaa (m.sg.), kaisee (f.), kaise (m.pl./formal)" },
        { term: "कितना/कितनी/कितने", sound: "kitnaa/kitnee/kitne", meaning: "how many/much", rule: "Agrees with gender: kitnaa (m.sg.), kitnee (f.), kitne (m.pl.)" },
        { term: "किसका/किसकी/किसके", sound: "kiskaa/kiskee/kiske", meaning: "whose", rule: "Agrees with possessed noun: kiskaa (m.sg.), kiskee (f.), kiske (m.pl.)" },
      ],
      notes: [
        "कैसा (kaisaa), कितना (kitnaa), किसका (kiskaa) all change form to match the gender/number of the noun they refer to.",
        "कहाँ (kahaan), कब (kab), क्यों (kyon) never change form — they are invariable.",
      ],
    },
  },
};

function ConceptGuide({ config, onStart, onBack }: { config: SectionConfig; onStart: () => void; onBack: () => void }) {
  const g = config.guide;
  return (
    <div className="container" style={{ maxWidth: "650px" }}>
      <h1>{config.title}</h1>
      <p className="subtitle">{config.subtitle}</p>
      <div className="guide-box">
        <p className="guide-heading">{g.heading}</p>
        <table className="guide-table">
          <thead>
            <tr><th>Word</th><th>Sound</th><th>Meaning</th><th>Rule</th></tr>
          </thead>
          <tbody>
            {g.rows.map((r, i) => (
              <tr key={i}>
                <td className="guide-term">{r.term}</td>
                <td className="guide-sound">{r.sound}</td>
                <td>{r.meaning}</td>
                <td>{r.rule}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {g.notes && g.notes.length > 0 && (
          <div className="guide-notes">
            {g.notes.map((n, i) => <p key={i} className="guide-note">{n}</p>)}
          </div>
        )}
      </div>
      <div className="menu">
        <button className="btn primary" onClick={onStart}>Start Practice</button>
        <button className="btn secondary" onClick={onBack}>Back</button>
      </div>
    </div>
  );
}

function FillBlankExercise({
  config,
  onBack,
}: {
  config: SectionConfig;
  onBack: () => void;
}) {
  const [phase, setPhase] = useState<"learn" | "practice">("learn");
  const [questions] = useState(() => shuffle(config.questions));
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [showHint, setShowHint] = useState(false);

  if (phase === "learn") {
    return <ConceptGuide config={config} onStart={() => setPhase("practice")} onBack={onBack} />;
  }

  const handleSelect = (opt: string) => {
    if (selected) return;
    setSelected(opt);
    const q = questions[idx];
    if (opt === q.answer || q.acceptAlso?.includes(opt)) {
      setScore((s) => s + 1);
    }
  };

  const next = () => {
    setSelected(null);
    setShowHint(false);
    if (idx + 1 >= questions.length) setDone(true);
    else setIdx(idx + 1);
  };

  if (done) {
    return (
      <div className="container">
        <h1>Complete!</h1>
        <p className="overall">{score} / {questions.length} correct</p>
        <div className="menu">
          <button className="btn primary" onClick={() => { setIdx(0); setScore(0); setSelected(null); setDone(false); }}>
            Retry
          </button>
          <button className="btn secondary" onClick={onBack}>Back</button>
        </div>
      </div>
    );
  }

  const q = questions[idx];
  const parts = q.sentence.split("___");
  const isCorrect = selected === q.answer || (selected !== null && q.acceptAlso?.includes(selected));

  return (
    <div className="container">
      <div className="progress">{idx + 1} / {questions.length}</div>
      <h2 style={{ fontSize: "1.2rem", color: "#888", margin: 0 }}>{config.title}</h2>

      <div className="fill-sentence">
        {parts[0]}
        <span className={`fill-blank ${selected ? (isCorrect ? "correct" : "wrong") : ""}`}>
          {selected || "______"}
        </span>
        {parts[1]}
      </div>

      {!showHint && (
        <button className="btn hint" onClick={() => setShowHint(true)}>
          Hint
        </button>
      )}
      {showHint && (
        <div className="hint-box">
          <div className="hint-line">{q.transliteration}</div>
          <div className="hint-line translation">{q.translation}</div>
        </div>
      )}

      {selected && !isCorrect && (
        <div className="correct-answer">
          Correct: {q.answer}
        </div>
      )}

      {selected && (
        <div className="explanation-box">
          {q.explanation}
        </div>
      )}

      <div className="word-bank">
        {config.options.map((opt) => {
          let cls = "btn word-chip";
          if (selected) {
            if (opt === q.answer || q.acceptAlso?.includes(opt)) cls += " correct-chip";
            else if (opt === selected) cls += " wrong-chip";
          }
          return (
            <button key={opt} className={cls} onClick={() => handleSelect(opt)}>
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

export default function GrammarPractice({ onBack }: { onBack: () => void }) {
  const [section, setSection] = useState<GrammarSection>("menu");

  if (section === "menu") {
    return (
      <div className="container">
        <h1>व्याकरण</h1>
        <p className="subtitle">Grammar Practice</p>
        <div className="section-cards">
          {Object.entries(SECTIONS).map(([key, cfg]) => (
            <button
              key={key}
              className="section-card"
              onClick={() => setSection(key as GrammarSection)}
            >
              <span className="section-card-title">{cfg.title}</span>
              <span className="section-card-sub">{cfg.subtitle}</span>
              <span className="section-card-count">{cfg.questions.length} questions</span>
            </button>
          ))}
        </div>
        <button className="btn secondary" onClick={onBack} style={{ marginTop: "1rem" }}>
          Back
        </button>
      </div>
    );
  }

  const config = SECTIONS[section];
  return <FillBlankExercise config={config} onBack={() => setSection("menu")} />;
}
