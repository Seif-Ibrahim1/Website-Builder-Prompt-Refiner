// This matches the JSON structure Gemini returns
export interface IdeaAnalysis {
  title: string;
  target_audience: string;
  key_features: string[];
}

export interface IdeaRecommendations {
  tech_stack: string;
  ui_style: string;
}

export interface IdeaResponse {
  analysis: IdeaAnalysis;
  recommendations: IdeaRecommendations;
  generated_prompt: string;
}