// === CONSONANTS ===
export interface Consonant {
  hindi: string;
  romanized: string;
  pronunciation: string;
}

export const CONSONANTS: Consonant[] = [
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

// === VOWELS ===
export interface Vowel {
  hindi: string;
  romanized: string;
  pronunciation: string;
}

export const VOWELS: Vowel[] = [
  { hindi: "अ", romanized: "a", pronunciation: "like 'u' in but" },
  { hindi: "आ", romanized: "ā", pronunciation: "like 'a' in father" },
  { hindi: "इ", romanized: "i", pronunciation: "like 'i' in sit" },
  { hindi: "ई", romanized: "ī", pronunciation: "like 'ee' in see" },
  { hindi: "उ", romanized: "u", pronunciation: "like 'u' in put" },
  { hindi: "ऊ", romanized: "ū", pronunciation: "like 'oo' in food" },
  { hindi: "ए", romanized: "e", pronunciation: "like 'a' in cake" },
  { hindi: "ऐ", romanized: "ai", pronunciation: "like 'ai' in fair" },
  { hindi: "ओ", romanized: "o", pronunciation: "like 'o' in go" },
  { hindi: "औ", romanized: "au", pronunciation: "like 'ou' in out" },
  { hindi: "अं", romanized: "aṃ", pronunciation: "nasal 'um'" },
  { hindi: "अः", romanized: "aḥ", pronunciation: "aspirated 'aha'" },
];

// === MATRAS (vowel diacritics) ===
export interface Matra {
  vowel: string;       // full vowel letter
  matra: string;       // diacritic form (empty string for inherent अ)
  roman: string;       // romanized vowel sound
  display: string;     // display form for the diacritic
}

export const MATRAS: Matra[] = [
  { vowel: "आ", matra: "\u093E", roman: "aa", display: "ा" },
  { vowel: "इ", matra: "\u093F", roman: "i", display: "ि" },
  { vowel: "ई", matra: "\u0940", roman: "ee", display: "ी" },
  { vowel: "उ", matra: "\u0941", roman: "u", display: "ु" },
  { vowel: "ऊ", matra: "\u0942", roman: "oo", display: "ू" },
  { vowel: "ऋ", matra: "\u0943", roman: "ri", display: "ृ" },
  { vowel: "ए", matra: "\u0947", roman: "ay", display: "े" },
  { vowel: "ऐ", matra: "\u0948", roman: "ai", display: "ै" },
  { vowel: "ओ", matra: "\u094B", roman: "o", display: "ो" },
  { vowel: "औ", matra: "\u094C", roman: "au", display: "ौ" },
  { vowel: "अं", matra: "\u0902", roman: "un", display: "ं" },
  { vowel: "अः", matra: "\u0903", roman: "aha", display: "ः" },
];

// Consonants for matra practice with base sound (without inherent 'a')
export const MATRA_CONSONANTS: { hindi: string; base: string }[] = [
  { hindi: "क", base: "k" }, { hindi: "ख", base: "kh" }, { hindi: "ग", base: "g" },
  { hindi: "घ", base: "gh" }, { hindi: "च", base: "ch" }, { hindi: "छ", base: "chh" },
  { hindi: "ज", base: "j" }, { hindi: "झ", base: "jh" }, { hindi: "ट", base: "ṭ" },
  { hindi: "ठ", base: "ṭh" }, { hindi: "ड", base: "ḍ" }, { hindi: "ढ", base: "ḍh" },
  { hindi: "त", base: "t" }, { hindi: "थ", base: "th" }, { hindi: "द", base: "d" },
  { hindi: "ध", base: "dh" }, { hindi: "न", base: "n" }, { hindi: "प", base: "p" },
  { hindi: "फ", base: "ph" }, { hindi: "ब", base: "b" }, { hindi: "भ", base: "bh" },
  { hindi: "म", base: "m" }, { hindi: "य", base: "y" }, { hindi: "र", base: "r" },
  { hindi: "ल", base: "l" }, { hindi: "व", base: "v" }, { hindi: "श", base: "sh" },
  { hindi: "स", base: "s" }, { hindi: "ह", base: "h" },
];

// === GRAMMAR: होना (verb to be) ===
export interface FillBlankQuestion {
  sentence: string;         // use ___ for the blank
  answer: string;           // correct answer
  acceptAlso?: string[];    // alternate correct answers
  transliteration: string;  // romanized Hindi
  translation: string;      // English meaning
  explanation: string;       // why this answer is correct
}

export const HONA_QUESTIONS: FillBlankQuestion[] = [
  { sentence: "माँ बहुत सुन्दर ___ |", answer: "हैं", transliteration: "Maa bahut sundar ___ .", translation: "Mother is very beautiful.", explanation: "माँ (mother) is an elder/respected person, so we use हैं (honorific plural)." },
  { sentence: "मैं सिंगापुर में ___ |", answer: "हूँ", transliteration: "Main Singapore mein ___ .", translation: "I am in Singapore.", explanation: "मैं (I) always takes हूँ." },
  { sentence: "आजकल तुम कहाँ ___ ?", answer: "हो", transliteration: "Aajkal tum kahaan ___ ?", translation: "Where are you these days?", explanation: "तुम (you, informal) always takes हो." },
  { sentence: "यह दादाजी की किताब ___ |", answer: "है", transliteration: "Yeh daadaaji ki kitaab ___ .", translation: "This is grandfather's book.", explanation: "यह (this) refers to a single thing (किताब), so we use है (singular)." },
  { sentence: "हम भारत से ___ |", answer: "हैं", transliteration: "Hum Bhaarat se ___ .", translation: "We are from India.", explanation: "हम (we) is plural, so we use हैं." },
  { sentence: "आप कैसे ___ ?", answer: "हैं", transliteration: "Aap kaise ___ ?", translation: "How are you?", explanation: "आप (you, formal) always takes हैं (honorific plural)." },
  { sentence: "वह मेरा दोस्त ___ |", answer: "है", transliteration: "Voh mera dost ___ .", translation: "He is my friend.", explanation: "वह (he/she) is singular third person, so we use है." },
  { sentence: "ये मेरे भाई ___ |", answer: "हैं", transliteration: "Ye mere bhai ___ .", translation: "These are my brothers.", explanation: "ये (these) is plural, so we use हैं." },
  { sentence: "तुम बहुत अच्छे ___ |", answer: "हो", transliteration: "Tum bahut acche ___ .", translation: "You are very good.", explanation: "तुम (you, informal) always takes हो." },
  { sentence: "मैं छात्र ___ |", answer: "हूँ", transliteration: "Main chaatr ___ .", translation: "I am a student.", explanation: "मैं (I) always takes हूँ." },
  { sentence: "यह किताब बहुत अच्छी ___ |", answer: "है", transliteration: "Yeh kitaab bahut acchi ___ .", translation: "This book is very good.", explanation: "यह (this) is singular, so we use है." },
  { sentence: "वे लोग भारतीय ___ |", answer: "हैं", transliteration: "Ve log Bhartiya ___ .", translation: "Those people are Indian.", explanation: "वे (those) is plural, so we use हैं." },
];
export const HONA_OPTIONS = ["हो", "है", "हैं", "हूँ"];

// === GRAMMAR: Postpositions ===
export const POSTPOSITION_QUESTIONS: FillBlankQuestion[] = [
  { sentence: "राधा ___ दोस्त ख़ुश है|", answer: "का", acceptAlso: ["की"], transliteration: "Radhaa ___ dost khush hai.", translation: "Radha's friend is happy.", explanation: "का/की shows possession ('s). दोस्त (friend) is masculine, so का. की also works if referring to a female friend." },
  { sentence: "अलमारी ___ मेरा चश्मा है|", answer: "में", acceptAlso: ["पर"], transliteration: "Almaari ___ mera chashma hai.", translation: "My glasses are in/on the cupboard.", explanation: "में means 'in' — the glasses are inside the cupboard. पर ('on') also works if they're on top." },
  { sentence: "वह शाम ___ NUS में है|", answer: "तक", transliteration: "Voh shaam ___ NUS mein hai.", translation: "He is at NUS until evening.", explanation: "तक means 'until/up to' — he's at NUS up to evening time." },
  { sentence: "मेरा घर यहाँ ___ दूर है|", answer: "से", transliteration: "Mera ghar yahaan ___ door hai.", translation: "My house is far from here.", explanation: "से means 'from' — the house is far FROM here." },
  { sentence: "मैं सिंगापुर ___ रहता हूँ|", answer: "में", transliteration: "Main Singapore ___ rehta hoon.", translation: "I live in Singapore.", explanation: "में means 'in' — I live IN Singapore." },
  { sentence: "किताब मेज़ ___ है|", answer: "पर", transliteration: "Kitaab mez ___ hai.", translation: "The book is on the table.", explanation: "पर means 'on' — the book is ON the table." },
  { sentence: "यह मेरी माँ ___ साड़ी है|", answer: "की", transliteration: "Yeh meri maa ___ saadi hai.", translation: "This is my mother's saree.", explanation: "की shows possession and agrees with साड़ी which is feminine, so we use की (not का/के)." },
  { sentence: "वह सुबह ___ शाम ___ काम करता है|", answer: "से", acceptAlso: ["तक"], transliteration: "Voh subah ___ shaam ___ kaam karta hai.", translation: "He works from morning to evening.", explanation: "से...तक means 'from...to'. से = from (morning), तक = until (evening)." },
  { sentence: "राम ___ एक बहन है|", answer: "के", transliteration: "Ram ___ ek behen hai.", translation: "Ram has a sister.", explanation: "के is the oblique form of का used before postpositions. 'राम के' = Ram's (possession construct for 'having')." },
  { sentence: "मुझ ___ हिंदी आती है|", answer: "को", transliteration: "Mujh ___ Hindi aati hai.", translation: "I know Hindi.", explanation: "को marks the experiencer. 'मुझको' = 'to me' — Hindi comes to me (I know Hindi)." },
  { sentence: "यह राधा ___ भाई है|", answer: "का", transliteration: "Yeh Radhaa ___ bhai hai.", translation: "This is Radha's brother.", explanation: "का shows possession. भाई (brother) is masculine singular, so we use का." },
  { sentence: "बच्चे स्कूल ___ जाते हैं|", answer: "को", transliteration: "Bachche school ___ jaate hain.", translation: "The children go to school.", explanation: "को here means 'to' — the children go TO school." },
];
export const POSTPOSITION_OPTIONS = ["में", "से", "पर", "तक", "को", "के", "का", "की"];

// === GRAMMAR: Question words ===
export const QUESTION_WORD_QUESTIONS: FillBlankQuestion[] = [
  { sentence: "3 idiots फ़िल्म में ___ है?", answer: "कौन", transliteration: "3 idiots film mein ___ hai?", translation: "Who is in the 3 Idiots film?", explanation: "कौन = 'who'. We're asking about a person in the film." },
  { sentence: "तुम्हारी बहन की शादी ___ है?", answer: "कब", acceptAlso: ["कहाँ"], transliteration: "Tumhaari behen ki shaadi ___ hai?", translation: "When/where is your sister's wedding?", explanation: "कब = 'when'. Asking about the time of the wedding. कहाँ ('where') also works." },
  { sentence: "तुम्हारे पिताजी ___ हैं?", answer: "कहाँ", acceptAlso: ["कौन"], transliteration: "Tumhaare pitaaji ___ hain?", translation: "Where is your father?", explanation: "कहाँ = 'where'. Asking about location. कौन ('who') could also fit depending on context." },
  { sentence: "यह ___ थैला है?", answer: "किसका", transliteration: "Yeh ___ thaila hai?", translation: "Whose bag is this?", explanation: "किसका = 'whose' (masculine). थैला (bag) is masculine, so किसका matches." },
  { sentence: "तुम्हारा भाई ___ है?", answer: "कहाँ", transliteration: "Tumhaara bhai ___ hai?", translation: "Where is your brother?", explanation: "कहाँ = 'where'. Asking about the brother's location." },
  { sentence: "वह ___ उदास है?", answer: "क्यों", transliteration: "Voh ___ udaas hai?", translation: "Why is he/she sad?", explanation: "क्यों = 'why'. Asking for the reason someone is sad." },
  { sentence: "तुम्हारे परिवार में ___ लोग हैं?", answer: "कितने", transliteration: "Tumhaare parivaar mein ___ log hain?", translation: "How many people are in your family?", explanation: "कितने = 'how many' (masculine plural). लोग (people) is masculine plural, so कितने." },
  { sentence: "सिंगापुर ___ है?", answer: "कैसा", transliteration: "Singapore ___ hai?", translation: "How is Singapore? / What is Singapore like?", explanation: "कैसा = 'how/what kind' (masculine singular). सिंगापुर is treated as masculine, so कैसा." },
  { sentence: "तुम्हारी माँ ___ हैं?", answer: "कैसी", transliteration: "Tumhaari maa ___ hain?", translation: "How is your mother?", explanation: "कैसी = 'how' (feminine). माँ (mother) is feminine, so we use the feminine form कैसी." },
  { sentence: "यह ___ है?", answer: "क्या", acceptAlso: ["कौन"], transliteration: "Yeh ___ hai?", translation: "What is this?", explanation: "क्या = 'what'. Asking about a thing. कौन ('who') works if asking about a person." },
  { sentence: "तुम्हारे ___ भाई हैं?", answer: "कितने", transliteration: "Tumhaare ___ bhai hain?", translation: "How many brothers do you have?", explanation: "कितने = 'how many' (masculine plural). भाई (brothers) is masculine plural." },
  { sentence: "यह ___ किताब है?", answer: "किसकी", transliteration: "Yeh ___ kitaab hai?", translation: "Whose book is this?", explanation: "किसकी = 'whose' (feminine). किताब (book) is feminine, so we use किसकी (not किसका)." },
];
export const QUESTION_WORD_OPTIONS = ["क्या", "कब", "किसका", "किसकी", "कितनी", "क्यों", "कैसी", "कौन", "कहाँ", "किसके", "कितना", "कितने", "कैसा", "कैसे"];

// === READING COMPREHENSION ===
export interface ReadingPassage {
  title: string;
  passage: string;
  questions: { text: string; answer: boolean }[];
}

export const READING_PASSAGES: ReadingPassage[] = [
  {
    title: "राधा का परिवार",
    passage: `मेरी दोस्त का नाम राधा है| वह बहुत सुन्दर है| वह लम्बी नहीं है| वह NUS में विज्ञान पढ़ती है| उसका घर 'east coast' में है| उसका घर बहुत बड़ा नहीं है लेकिन सुन्दर है| उसका परिवार बड़ा है| परिवार में आठ लोग हैं- राधा के दादाजी-दादीजी, माँ-पिताजी, दो भाई और एक बहन| राधा के दादाजी-दादीजी को शाम को घूमना पसंद है| उसकी बहन का नाम दिव्या है| वह शादीशुदा है| उसके पति bank manager हैं| राधा का छोटा भाई छात्र है| उसका नाम राघव है| उसको cricket खेलना और आम खाना बहुत पसंद है| राधा का बड़ा भाई बहुत लंबा है| राधा की माँ भी बहुत लम्बी हैं| उनका नाम मीरा है| उनको स्वादिष्ट खाना बनाना पसंद है|`,
    questions: [
      { text: "राधा विज्ञान पढ़ती है|", answer: true },
      { text: "राधा का परिवार बड़ा नहीं है|", answer: false },
      { text: "राधा शादीशुदा है|", answer: false },
      { text: "राधा की बहन को स्वादिष्ट खाना बनाना पसंद है|", answer: false },
      { text: "राघव दिव्या का भाई है|", answer: true },
    ],
  },
  {
    title: "मेरा परिवार",
    passage: `मेरा नाम अमित है| मैं सिंगापुर में रहता हूँ| मेरा परिवार छोटा है| मेरे परिवार में चार लोग हैं- मेरे माँ-पिताजी, मेरी बहन और मैं| मेरे पिताजी डॉक्टर हैं| वे अस्पताल में काम करते हैं| मेरी माँ अध्यापिका हैं| वे स्कूल में हिंदी पढ़ाती हैं| मेरी बहन का नाम प्रिया है| वह NUS में पढ़ती है| उसको संगीत सुनना और किताबें पढ़ना पसंद है| मुझे क्रिकेट खेलना और हिंदी फ़िल्में देखना पसंद है| हम सब को शाम को साथ खाना खाना पसंद है|`,
    questions: [
      { text: "अमित का परिवार बड़ा है|", answer: false },
      { text: "अमित के पिताजी अस्पताल में काम करते हैं|", answer: true },
      { text: "अमित की माँ अंग्रेज़ी पढ़ाती हैं|", answer: false },
      { text: "प्रिया को किताबें पढ़ना पसंद है|", answer: true },
      { text: "अमित को हिंदी फ़िल्में देखना पसंद है|", answer: true },
    ],
  },
  {
    title: "मेरा दिन",
    passage: `मैं सुबह छह बजे उठती हूँ| मैं सुबह चाय पीती हूँ| मैं आठ बजे NUS जाती हूँ| NUS में मैं हिंदी और गणित पढ़ती हूँ| दोपहर को मैं कैंटीन में खाना खाती हूँ| मुझे चावल और सब्ज़ी खाना पसंद है| शाम को मैं लाइब्रेरी में पढ़ती हूँ| रात को मैं अपने दोस्तों से बात करती हूँ| मुझे संगीत सुनना भी बहुत पसंद है| मैं रात दस बजे सोती हूँ|`,
    questions: [
      { text: "वह सुबह सात बजे उठती है|", answer: false },
      { text: "वह NUS में हिंदी पढ़ती है|", answer: true },
      { text: "उसको चावल और सब्ज़ी खाना पसंद है|", answer: true },
      { text: "वह शाम को दोस्तों से मिलती है|", answer: false },
      { text: "वह रात दस बजे सोती है|", answer: true },
    ],
  },
];

// === UTILITIES ===
export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
