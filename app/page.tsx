'use client'

import { useState, ChangeEvent, FormEvent } from 'react';

interface FormValues {
  childName: string;
  age: string;
  theme: string;
  tone: string;
  moral: string;
  language: string;
  readingLevel: string;
  wordCount: string;
  model?: string;
}

const defaultForm: FormValues = {
  childName: 'Aarav',
  age: '6',
  theme: 'Adventure',
  tone: 'Playful',
  moral: 'Be kind',
  language: 'English',
  readingLevel: 'Beginner',
  wordCount: '200',
  model: ''
};

export default function Page() {
  const [form, setForm] = useState<FormValues>(defaultForm);
  const [story, setStory] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const generateStory = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          age: Number(form.age),
          wordCount: Number(form.wordCount)
        })
      });
      const data = await res.json();
      setStory(data.story || '');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const resetDefaults = () => {
    setForm(defaultForm);
    setStory('');
  };

  const speakStory = () => {
    if (!story) return;
    const utter = new SpeechSynthesisUtterance(story);
    const voices = speechSynthesis.getVoices();
    const preferredLang = form.language.toLowerCase().includes('hindi')
      ? 'hi'
      : 'en';
    const voice = voices.find(v =>
      v.lang.toLowerCase().startsWith(preferredLang)
    );
    if (voice) utter.voice = voice;
    speechSynthesis.speak(utter);
  };

  return (
    <main className="p-4 max-w-xl mx-auto">
      <form onSubmit={generateStory} className="space-y-2">
        <input
          name="childName"
          value={form.childName}
          onChange={handleChange}
          placeholder="Child's Name"
          className="border p-1 w-full"
        />
        <input
          name="age"
          value={form.age}
          onChange={handleChange}
          placeholder="Age"
          type="number"
          className="border p-1 w-full"
        />
        <input
          name="theme"
          value={form.theme}
          onChange={handleChange}
          placeholder="Theme"
          className="border p-1 w-full"
        />
        <input
          name="tone"
          value={form.tone}
          onChange={handleChange}
          placeholder="Tone"
          className="border p-1 w-full"
        />
        <input
          name="moral"
          value={form.moral}
          onChange={handleChange}
          placeholder="Moral"
          className="border p-1 w-full"
        />
        <input
          name="language"
          value={form.language}
          onChange={handleChange}
          placeholder="Language"
          className="border p-1 w-full"
        />
        <input
          name="readingLevel"
          value={form.readingLevel}
          onChange={handleChange}
          placeholder="Reading Level"
          className="border p-1 w-full"
        />
        <input
          name="wordCount"
          value={form.wordCount}
          onChange={handleChange}
          placeholder="Word Count"
          type="number"
          className="border p-1 w-full"
        />
        <input
          name="model"
          value={form.model}
          onChange={handleChange}
          placeholder="Model (optional)"
          className="border p-1 w-full"
        />
        <div className="flex gap-2 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            {loading ? 'Generating...' : 'Generate Story'}
          </button>
          <button
            type="button"
            onClick={resetDefaults}
            className="bg-gray-300 px-3 py-1 rounded"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={speakStory}
            disabled={!story}
            className="bg-green-500 text-white px-3 py-1 rounded"
          >
            Read Aloud
          </button>
        </div>
      </form>
      {story && (
        <section className="mt-4 p-4 border rounded bg-gray-50 whitespace-pre-line">
          {story}
        </section>
      )}
    </main>
  );
}

