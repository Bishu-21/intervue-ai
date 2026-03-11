"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Mic, Video, MonitorUp, PhoneOff, AlertCircle, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function InterviewPage() {
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(0);
  const [messages, setMessages] = useState<{sender: 'ai' | 'user', text: string}[]>([
    { sender: 'ai', text: "Hello! I'm your AI technical interviewer. Are you ready to begin?" }
  ]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive) {
      interval = setInterval(() => setTime(t => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const toggleInterview = () => {
    if (!isActive) {
      setIsActive(true);
      setTimeout(() => {
        setMessages(prev => [...prev, { sender: 'ai', text: "Great. Let's start with a system design question. How would you design a URL shortening service like bit.ly?" }]);
      }, 2000);
    } else {
      setIsActive(false);
    }
  };

  return (
    <div className="h-screen bg-[#050505] text-white flex flex-col font-sans overflow-hidden">
      {/* Top Header */}
      <header className="h-16 flex items-center justify-between px-6 border-b border-white/10 glass-nav z-10">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors">
            Exit
          </Link>
          <div className="h-4 w-px bg-white/20"></div>
          <span className="font-semibold">Backend Engineering Interview</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-red-500 animate-pulse' : 'bg-gray-500'}`}></span>
            <span className="text-sm font-mono text-gray-300">{formatTime(time)}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 bg-primary/20 text-primary text-xs font-bold rounded">AI Active</span>
          </div>
        </div>
      </header>

      {/* Main Grid container */}
      <main className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
        <div className="glow-bg top-1/2 left-1/4 -translate-y-1/2 opacity-50"></div>
        
        {/* Left Column - Video Feeds */}
        <div className="lg:col-span-2 flex flex-col gap-6 relative z-10">
          {/* Main AI Video Feed */}
          <div className="flex-1 rounded-2xl overflow-hidden glass-card relative border border-white/5">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10" />
            <img 
              src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80" 
              alt="AI Interviewer" 
              className="w-full h-full object-cover"
            />
            
            <div className="absolute bottom-6 left-6 z-20">
              <div className="bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                <span className="text-sm font-medium">Alex (AI Interviewer)</span>
              </div>
            </div>

            {/* AI Audio waves visualization */}
            {isActive && (
              <div className="absolute bottom-6 right-6 z-20 flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div 
                    key={i}
                    animate={{ height: ["8px", "24px", "8px"] }}
                    transition={{ repeat: Infinity, duration: 1, delay: i * 0.1 }}
                    className="w-1.5 bg-primary rounded-full"
                  />
                ))}
              </div>
            )}
          </div>

          /* Bottom Control Bar & Self View */
          <div className="h-32 flex gap-6">
            {/* Self Video Feed */}
            <div className="w-48 rounded-xl overflow-hidden bg-white/5 border border-white/10 relative">
              <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm">
                Camera Off
              </div>
            </div>

            {/* Controls */}
            <div className="flex-1 glass-card rounded-xl flex items-center justify-center gap-4">
              <button className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                <Mic className="w-5 h-5" />
              </button>
              <button className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                <Video className="w-5 h-5 text-gray-400" />
              </button>
              <button className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                <MonitorUp className="w-5 h-5" />
              </button>
              
              <div className="w-px h-8 bg-white/10 mx-2"></div>
              
              <button 
                onClick={toggleInterview}
                className={`px-6 py-3 rounded-full font-bold flex items-center gap-2 transition-all ${
                  isActive 
                    ? "bg-red-500/20 text-red-500 hover:bg-red-500/30 border border-red-500/30" 
                    : "bg-primary text-white hover:bg-blue-600 shadow-lg shadow-primary/20"
                }`}
              >
                {isActive ? <PhoneOff className="w-5 h-5" /> : null}
                {isActive ? "End Interview" : "Start Interview"}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Real-time Analysis & Chat */}
        <div className="glass-card rounded-2xl flex flex-col border border-white/5 relative z-10">
          <div className="p-4 border-b border-white/10 flex items-center gap-3">
            <MessageSquare className="w-5 h-5 text-primary" />
            <h3 className="font-bold">Live Transcript</h3>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <AnimatePresence>
              {messages.map((msg, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={i}
                  className={`p-3 rounded-xl max-w-[85%] ${
                    msg.sender === 'ai' 
                      ? "bg-white/5 border border-white/10 text-gray-300" 
                      : "bg-primary/20 border border-primary/30 text-blue-100 ml-auto"
                  }`}
                >
                  <p className="text-xs font-bold mb-1 opacity-50 uppercase tracking-wider">
                    {msg.sender === 'ai' ? 'Interviewer' : 'You'}
                  </p>
                  <p className="text-sm">{msg.text}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* AI Internal Thoughts/Feedback preview */}
          <div className="p-4 bg-black/40 border-t border-white/10 text-xs">
            <div className="flex items-center gap-2 text-green-400 mb-2 font-mono">
              <AlertCircle className="w-4 h-4" />
              <span>AI Engine Analysis</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-white/5 rounded text-gray-400">Speech Clarity: Excellent</span>
              <span className="px-2 py-1 bg-white/5 rounded text-gray-400">Confidence: High</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
