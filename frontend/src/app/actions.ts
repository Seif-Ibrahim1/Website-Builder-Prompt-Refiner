'use server'

import { IdeaResponse } from "@/types/idea";

export async function refineIdeaAction(rawIdea: string): Promise<IdeaResponse | { error: string }> {
  try {
    // 1. Call our NestJS Backend
    // Note: In development, Backend is localhost:3000
    const response = await fetch('http://localhost:3000/idea/refine', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idea: rawIdea }),
      cache: 'no-store' // Don't cache the result, we want fresh AI every time
    });

    if (!response.ok) {
      return { error: 'Failed to connect to AI backend' };
    }

    const data = await response.json();
    return data;

  } catch (err) {
    console.error(err);
    return { error: 'Something went wrong. Is the backend running?' };
  }
}