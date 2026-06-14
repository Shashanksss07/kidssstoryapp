export interface ChildDetails {
  name: string;
  age: number;
  theme: string;
  tone: string;
  moral: string;
  language: string;
  wordCount: number;
  readingLevel: ReadingLevel;
}

export type ReadingLevel =
  | "pre-reader"
  | "early-reader"
  | "intermediate"
  | "advanced";

const readingLevelNotes: Record<ReadingLevel, string> = {
  "pre-reader":
    "Use very short sentences, basic vocabulary, and plenty of repetition for very young readers.",
  "early-reader":
    "Use simple sentences and familiar words suitable for children who are starting to read on their own.",
  "intermediate":
    "Include a mix of short and longer sentences and gently introduce new vocabulary with clear context.",
  "advanced":
    "Use richer vocabulary and more complex sentence structures for confident young readers.",
};

export function buildSystemPrompt(): string {
  return (
    "You are Sunny the Story Maker, an AI who crafts imaginative, safe, and educational " +
    "stories for children. Ensure every story is wholesome, age-appropriate, and encouraging."
  );
}

export function buildUserPrompt(details: ChildDetails): string {
  const {
    name,
    age,
    theme,
    tone,
    moral,
    language,
    wordCount,
    readingLevel,
  } = details;

  const readingNotes = readingLevelNotes[readingLevel];
  return (
    `Write a ${wordCount}-word story in ${language} for a child named ${name} who is ${age} years old. ` +
    `The story should be about ${theme}, have a ${tone} tone, and teach the moral: ${moral}. ` +
    `Make sure the story is suitable for a ${readingLevel} and follow these notes: ${readingNotes}`
  );
}
