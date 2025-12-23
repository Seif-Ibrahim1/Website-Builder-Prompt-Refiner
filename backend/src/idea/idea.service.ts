import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class IdeaService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');
    if (!apiKey) {
      throw new InternalServerErrorException('GEMINI_API_KEY is not defined in .env');
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
    
    this.model = this.genAI.getGenerativeModel({ 
      model: 'gemini-2.5-flash',
      // We force JSON generation for easier parsing
      generationConfig: { responseMimeType: "application/json" }
    });
  }

  async generateRefinement(userIdea: string) {
    try {
      const prompt = `
        You are an expert Product Manager and Tech Lead.
        Analyze this raw website idea: "${userIdea}".
        
        Return a JSON object with this EXACT structure:
        {
          "analysis": {
            "title": "A short, catchy title for the project",
            "target_audience": "Who is this for?",
            "key_features": ["Feature 1", "Feature 2", "Feature 3"]
          },
          "recommendations": {
            "tech_stack": "Recommended frontend/backend tools",
            "ui_style": "Visual vibe (e.g., Minimalist, Dark Mode)"
          },
          "generated_prompt": "A highly detailed, professional prompt that the user can copy and paste into an AI coding tool to build this exact website."
        }
      `;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // Since we requested JSON mimeType, we can safely parse it
      return JSON.parse(text);

    } catch (error) {
      console.error("AI Error:", error);
      throw new InternalServerErrorException('Failed to refine idea');
    }
  }
}