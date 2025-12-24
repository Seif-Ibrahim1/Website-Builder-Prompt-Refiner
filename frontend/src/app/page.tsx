'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { IdeaResult } from "@/components/idea-result";
import { refineIdeaAction } from "./actions";
import { IdeaResponse } from "@/types/idea";
import { toast } from "sonner";
import { Loader2, Copy, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

// Custom Filled Send Icon
function SendIcon({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
    </svg>
  );
}

export default function Home() {
  const [idea, setIdea] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<IdeaResponse | null>(null);

  async function handleSubmit() {
    if (!idea.trim()) {
      toast.error("Please enter an idea first!");
      return;
    }

    setIsLoading(true);
    
    const response = await refineIdeaAction(idea);

    if ('error' in response) {
      toast.error(response.error);
    } else {
      setResult(response);
      toast.success("Idea refined successfully!");
    }

    setIsLoading(false);
  }

  const handleRegenerate = () => {
    if (result && idea) {
        handleSubmit();
    }
  };

  const handleCopyPrompt = () => {
      if (result) {
          navigator.clipboard.writeText(result.generated_prompt);
          toast.success("Prompt copied to clipboard!");
      }
  };

  return (
    <main className="min-h-screen bg-[#0A0118] text-white selection:bg-purple-500/30 selection:text-purple-100 overflow-hidden">
      
      {/* Navbar */}
      <nav className="py-6">
        <div className="container mx-auto px-4 flex justify-start items-center font-medium">
          <div className="flex items-center gap-2 text-lg">
            Build something 
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-purple-500/20">
              <Image 
                src="/cat-glasses.png" 
                alt="Cool Cat" 
                fill
                className="object-cover"
                priority
              />
            </div>
            <span className="font-bold">Stunning</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 pb-32 max-w-4xl flex flex-col items-center">
        
        {/* Layout Container */}
        <div 
          className={cn(
            "text-center w-full transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
            result ? "mb-8" : "mb-16"
          )}
        >
          {/* Main Title */}
          <h1 
            className={cn(
              "font-bold tracking-tight leading-tight transition-all duration-700",
              result ? "text-3xl md:text-4xl" : "text-5xl md:text-7xl"
            )}
          >
            Refine your vision.
            <br className={cn("transition-all", result && "hidden")} /> 
            {result ? " " : ""}
            Build faster
          </h1>

          {/* Subtitle Container - Text Updated */}
          <div 
            className={cn(
              "grid transition-all duration-700 ease-in-out",
              result ? "grid-rows-[0fr] opacity-0 mt-0" : "grid-rows-[1fr] opacity-100 mt-4"
            )}
          >
            <div className="overflow-hidden">
              <p className="text-lg text-purple-50/90 max-w-2xl mx-auto">
                Stop guessing features. Describe your app idea below, and our AI will architect the tech stack, features, and prompts you need to build it.
              </p>
            </div>
          </div>
        </div>

        {/* Main Input Container */}
        <div className="w-full max-w-3xl relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
          
          <div className="relative bg-white rounded-2xl flex items-center p-2 shadow-2xl">
            <Textarea 
              placeholder="Describe your idea here..."
              className="flex-1 border-0 focus-visible:ring-0 text-lg text-gray-900 placeholder:text-gray-400 min-h-[120px] py-4 px-6 resize-none bg-transparent leading-relaxed"
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              disabled={isLoading}
            />
            
            <Button 
              size="icon"
              onClick={handleSubmit} 
              disabled={isLoading || !idea.trim()}
              className="bg-gradient-to-r from-[#A923E9] to-[#d423e9] hover:from-[#931FD3] hover:to-[#c01fd3] text-white rounded-full w-12 h-12 flex items-center justify-center shrink-0 mr-2 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 self-end mb-2 shadow-[0_0_20px_rgba(169,35,233,0.6)] hover:shadow-[0_0_30px_rgba(169,35,233,0.8)]"
            >
              {isLoading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                <SendIcon className="h-5 w-5 ml-1" />
              )}
            </Button>
          </div>
        </div>

        {/* Results Section */}
        {result && (
          <div className="w-full max-w-3xl mt-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-900/50 to-fuchsia-900/50 rounded-3xl blur-2xl opacity-20"></div>
                <div className="relative bg-[#120322] border border-purple-500/20 rounded-3xl p-8 shadow-2xl">
                    <IdeaResult data={result} />
                </div>
            </div>

            <div className="flex justify-end gap-4 mt-6">
                <Button
                    size="icon"
                    variant="secondary"
                    onClick={handleCopyPrompt}
                    className="bg-[#A923E9] hover:bg-[#931FD3] text-white rounded-full w-12 h-12 shadow-lg shadow-purple-900/30 hover:shadow-purple-800/50 transition-all"
                    title="Copy Prompt"
                >
                    <Copy className="h-5 w-5" />
                </Button>
                <Button
                    size="icon"
                    variant="secondary"
                    onClick={handleRegenerate}
                    disabled={isLoading}
                     className="bg-[#A923E9] hover:bg-[#931FD3] text-white rounded-full w-12 h-12 shadow-lg shadow-purple-900/30 hover:shadow-purple-800/50 transition-all disabled:opacity-50"
                     title="Regenerate"
                >
                     <RefreshCw className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
                </Button>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}