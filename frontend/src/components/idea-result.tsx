import { Badge } from "@/components/ui/badge";
import { IdeaResponse } from "@/types/idea";
import { Layers, Lightbulb, Code2, Palette } from "lucide-react";

interface IdeaResultProps {
  data: IdeaResponse;
}

export function IdeaResult({ data }: IdeaResultProps) {
  return (
    <div className="space-y-8 text-purple-50">
      {/* Top Section: Analysis & Strategy */}
      <div className="grid md:grid-cols-2 gap-8">
        
        {/* Left Column: Strategy */}
        <div className="space-y-6">
            {/* UPDATED COLOR: text-[#0AF085] */}
            <div className="flex items-center gap-2 text-[#0AF085] mb-4">
                <Lightbulb className="w-5 h-5" />
                <h3 className="text-lg font-semibold">Strategy & Concept</h3>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm font-medium text-purple-300">Project Title</p>
              <p className="text-lg font-semibold">{data.analysis.title}</p>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm font-medium text-purple-300">Target Audience</p>
              <p className="text-base leading-relaxed text-purple-100/90">{data.analysis.target_audience}</p>
            </div>
        </div>

         {/* Right Column: Features & Tech */}
        <div className="space-y-6">
             {/* UPDATED COLOR: text-[#0AF085] */}
             <div className="flex items-center gap-2 text-[#0AF085] mb-4">
                <Layers className="w-5 h-5" />
                 <h3 className="text-lg font-semibold">Features & Tech</h3>
            </div>

             <div className="space-y-2">
              <p className="text-sm font-medium text-purple-300">Key Features</p>
              <div className="flex flex-wrap gap-2">
                {data.analysis.key_features.map((feature, i) => (
                  <Badge 
                    key={i} 
                    variant="secondary" 
                    className="bg-purple-900/50 text-purple-100 hover:bg-purple-800/50 border-0 px-3 py-1.5 h-auto whitespace-normal text-left leading-snug"
                  >
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="space-y-1">
                    <div className="flex items-center gap-1 text-sm font-medium text-purple-300">
                        <Code2 className="w-4 h-4" /> Tech Stack
                    </div>
                    <p className="text-sm text-purple-100/90">{data.recommendations.tech_stack}</p>
                </div>
                <div className="space-y-1">
                     <div className="flex items-center gap-1 text-sm font-medium text-purple-300">
                        <Palette className="w-4 h-4" /> UI/UX Vibe
                    </div>
                    <p className="text-sm text-purple-100/90">{data.recommendations.ui_style}</p>
                </div>
            </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>

      {/* Bottom Section: The Prompt */}
      <div className="space-y-4">
        {/* UPDATED COLOR: text-[#0AF085] */}
        <h3 className="text-lg font-semibold text-[#0AF085]">✨ Ready-to-Use Prompt</h3>
        
        <div className="bg-[#0A0118]/50 rounded-xl p-6 border border-purple-500/20 shadow-inner shadow-purple-900/20">
            <pre className="text-sm font-mono text-purple-200/90 whitespace-pre-wrap overflow-y-auto max-h-[300px] scrollbar-thin scrollbar-thumb-purple-700 scrollbar-track-transparent pr-2">
                {data.generated_prompt}
            </pre>
        </div>
      </div>
    </div>
  );
}