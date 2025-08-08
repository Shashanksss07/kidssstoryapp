import OpenAI from "openai";
import { NextResponse } from "next/server";
import { z } from "zod";

const bodySchema = z.object({
  childName: z.string(),
  age: z.number(),
  theme: z.string(),
  tone: z.string(),
  moral: z.string(),
  language: z.string(),
  wordCount: z.number(),
  readingLevel: z.string(),
  model: z.string().optional(),
});

interface StoryParams {
  childName: string;
  age: number;
  theme: string;
  tone: string;
  moral: string;
  language: string;
  wordCount: number;
  readingLevel: string;
}

function buildSystemPrompt(params: StoryParams): string {
  return `You are a creative children's storyteller. Craft a story for a ${params.age}-year-old reader at a ${params.readingLevel} reading level. The story should adopt a ${params.tone} tone, communicate the moral: ${params.moral}, and be written in ${params.language}. Aim for approximately ${params.wordCount} words.`;
}

function buildUserPrompt(params: StoryParams): string {
  return `Write a story about ${params.theme} for a child named ${params.childName}.`;
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = bodySchema.parse(json);

    const { model = "gpt-4o-mini", ...params } = parsed;

    const instructions = buildSystemPrompt(params);
    const input = buildUserPrompt(params);

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const response = await client.responses.create({
      model,
      instructions,
      input,
    });

    const story =
      (response as any).output_text ??
      response.output?.map((o: any) => o.content?.map((c: any) => c.text).join(" ")).join("\n") ??
      "";

    return NextResponse.json({ story });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to generate story" }, { status: 400 });
  }
}

