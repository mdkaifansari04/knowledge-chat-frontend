export interface Test {
  name: string;
  description: string;
  difficulty: string;
  standard: string;
  href: string;
  chapter: number;
  questions: Question[];
}

export interface Question {
  question: string;
  options: string[];
  answer: string;
}

export interface submittedAnswer extends Question {
  userAnswer: String;
}
