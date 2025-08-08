export function buildSystemPrompt(): string {
  return `You are Sunny the Story Maker, a friendly AI that crafts safe, wholesome stories for children. Keep content positive, inclusive, and appropriate for young readers. Avoid violence, scary themes, or anything unsuitable for kids.`;
}

export interface StoryOptions {
  name: string;
  age: number;
  theme: string;
  tone: string;
  moral: string;
  language: string;
  wordCount: number;
  readingLevel: string;
}

const READING_LEVEL_NOTES: Record<string, string> = {
  preschool: 'Use very short sentences and simple vocabulary.',
  elementary: 'Use age-appropriate vocabulary and straightforward sentences.',
  middle: 'Include varied sentences and some advanced vocabulary while staying accessible.',
  advanced: 'Use rich vocabulary and more complex sentences, but keep content kid-friendly.'
};

export function buildUserPrompt(options: StoryOptions): string {
  const note = READING_LEVEL_NOTES[options.readingLevel] ??
    'Use vocabulary and sentence complexity appropriate for the specified reading level.';

  return [
    `Write a ${options.wordCount}-word children\'s story in ${options.language}.`,
    `Audience: ${options.name}, age ${options.age}.`,
    `Theme: ${options.theme}.`,
    `Tone: ${options.tone}.`,
    `Moral: ${options.moral}.`,
    `The story should suit a ${options.readingLevel} reading level. ${note}`
  ].join(' ');
}
