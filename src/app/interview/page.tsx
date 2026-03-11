"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { account } from "@/lib/appwrite";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function InterviewPage() {
  const router = useRouter();
  const transcriptRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: "assistant", 
      content: "Hello! I'm your AI technical interviewer. To start, could you please introduce yourself and briefly describe your recent experience?" 
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [candidateName, setCandidateName] = useState("Guest Candidate");
  const recognitionRef = useRef<any>(null);
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsMounted(true);
    
    // Fetch user and profile
    const initUser = async () => {
      // Try to get from cache first for speed
      const cached = localStorage.getItem('intervue_user_profile');
      if (cached) {
        const p = JSON.parse(cached);
        setUserId(p.userId);
        setCandidateName(p.name);
      }

      try {
        const user = await account.get();
        if (user) {
          setUserId(user.$id);
          setCandidateName(user.name);
          localStorage.setItem('intervue_user_profile', JSON.stringify({ userId: user.$id, name: user.name }));
        }
      } catch (e) { 
        console.warn("Session check failed - likely unauthenticated.");
        // Only redirect if we don't even have a cached version and it's definitely unauth
        if (!localStorage.getItem('intervue_user_profile')) {
           router.push('/auth');
        }
      }
    };
    initUser();

    // Speak initial greeting
    const timer = setTimeout(() => {
      speakText(messages[0].content);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleEndInterview = () => {
    // 1. Stop Speech
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    // 2. Stop Recognition
    stopListening();
    // 3. Stop Media
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    // 4. Navigate
    router.replace('/dashboard');
  };

  const speakText = (text: string) => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.onend = () => {
        // Automatically start listening after AI finishes speaking
        if (!isMuted) {
          // Wrap in a slight delay to ensure the system is ready
          setTimeout(startListening, 100);
        }
      };
      window.speechSynthesis.speak(utterance);
    }
  };

  const startListening = () => {
    // Check internal state AND recognition instance state
    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e) { 
        console.error("Recognition start error (ignoring if already started):", e); 
        // If it was already started, just sync the state
        setIsListening(true);
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      try {
        recognitionRef.current.stop();
      } catch (e) { console.error("Recognition stop error:", e); }
      setIsListening(false);
    }
  };

  // Set up camera
  useEffect(() => {
    let stream: MediaStream | null = null;
    if (isMounted && isVideoOn && navigator.mediaDevices) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: isMuted ? false : true })
        .then(s => {
          stream = s;
          if (videoRef.current) {
            videoRef.current.srcObject = s;
          }
        })
        .catch(err => console.error("Media access denied:", err));
    }
    return () => {
      stream?.getTracks().forEach(track => track.stop());
    };
  }, [isMounted, isVideoOn, isMuted]);
  
  // Set up speech recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        
        recognition.onresult = (event: any) => {
          let currentTranscript = "";
          let isFinal = false;
          for (let i = event.resultIndex; i < event.results.length; i++) {
            currentTranscript += event.results[i][0].transcript;
            if (event.results[i].isFinal) isFinal = true;
          }
          setInputText(currentTranscript);

          // Auto-submit if final result is detected
          if (isFinal && currentTranscript.trim().length > 3) {
            if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
            silenceTimerRef.current = setTimeout(() => {
              handleAutoSubmit(currentTranscript.trim());
            }, 1500); // 1.5s silence before auto-submit
          }
        };
        
        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition not supported.");
      return;
    }
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleAutoSubmit = (text: string) => {
    stopListening();
    handleSendMessage(undefined, text);
  };

  // Auto-scroll transcript
  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e?: React.FormEvent, overrideText?: string) => {
    e?.preventDefault();
    const messageToSend = overrideText || inputText;
    if (!messageToSend.trim() || isProcessing) return;

    const userMessage = messageToSend.trim();
    setInputText("");
    setIsProcessing(true);
    stopListening(); // Ensure we don't listen while processing

    // Add user message to state
    const updatedMessages: Message[] = [...messages, { role: "user", content: userMessage }];
    setMessages(updatedMessages);

    try {
      const res = await fetch("/api/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: userMessage,
          history: messages,
          userId: userId
        }),
      });

      if (!res.ok) throw new Error("Failed to get response");
      
      const data = await res.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
      
      // AI Speaks the response
      speakText(data.reply);

    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="relative flex h-screen w-full flex-col bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 overflow-hidden">
      
      {/* Top Navigation */}
      <header className="flex items-center justify-between px-8 py-4 glass border-b-0 z-50">
        <div className="flex items-center gap-3">
          <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white liquid-glow">
            <span className="material-symbols-outlined text-xl">cognition</span>
          </div>
          <h2 className="text-slate-100 text-lg font-bold tracking-tight">
            Intervue <span className="text-primary">AI</span>
          </h2>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 px-4 py-2 rounded-xl glass">
            <div className="size-2 rounded-full bg-red-500 animate-pulse"></div>
            <span className="text-sm font-medium text-slate-300">Live Session: Software Engineer</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 rounded-xl glass border-primary/20">
            <span className="material-symbols-outlined text-primary text-xl">schedule</span>
            <span className="text-slate-100 font-mono font-bold tracking-wider">Active</span>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button className="flex items-center justify-center rounded-xl h-10 w-10 glass hover:bg-white/10 transition-colors">
            <span className="material-symbols-outlined text-slate-300">settings</span>
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 flex gap-4 p-4 overflow-hidden h-[calc(100vh-72px-88px)]">
        
        {/* Left Side: AI Interviewer */}
        <div className="w-1/4 flex flex-col gap-4">
          <div className="flex-1 rounded-2xl glass overflow-hidden relative flex flex-col items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent"></div>
            
            <div className="relative size-48 rounded-full bg-primary/10 flex items-center justify-center liquid-glow border border-primary/30">
              <div className={`size-40 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden transition-all duration-300 ${isProcessing ? 'animate-pulse scale-105' : ''}`}>
                <img 
                  className="w-full h-full object-cover opacity-80 mix-blend-screen" 
                  alt="AI Avatar" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdGDQ4ZaDOhUI9E2TOV2znv1VGDi7GrBBm5994YOp1CWMMyakDReB9yTkYELUaihtAqoRR2f5NvnVq0Rbx0mppaGhLruIuTQBzCfFHmmdds9pQM-bUu3yhegSSpGbFNemYEi6xCKRT7l8wpJqTqvF9RqdQjzYr6ow9B48z-T1NjhL6AkGo2OKnz8XjRYgbA61GUkogcgoZ0O5ZH_KL6zPd3zubKX661f9WkCaEv2VE69Kl2hYEQMnhclGYJwsgkQaQ18qreVWUXL0"
                />
              </div>
            </div>
            
            <div className="mt-8 text-center px-6">
              <h3 className="text-xl font-semibold text-slate-100 mb-2">AI Interviewer</h3>
              <p className="text-slate-400 text-sm italic">
                {isProcessing ? "Analyzing response..." : "Listening..."}
              </p>
            </div>

            {/* Floating Context Card - Showing last AI message */}
            <div className="absolute bottom-6 left-4 right-4 glass-primary p-5 rounded-2xl shadow-2xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] uppercase tracking-widest font-bold text-primary">Current Focus</span>
                <div className="h-px flex-1 bg-primary/20"></div>
              </div>
              <p className="text-slate-100 text-sm leading-relaxed font-medium line-clamp-3">
                {messages.filter(m => m.role === "assistant").pop()?.content || "Waiting for interview to begin..."}
              </p>
            </div>
          </div>
        </div>

        {/* Center: Live Candidate Feed & Waveform */}
        <div className="flex-1 flex flex-col gap-4 relative">
          <div className="flex-1 rounded-2xl overflow-hidden relative glass border-primary/20 bg-slate-900 border border-white/10 flex items-center justify-center">
            {isVideoOn ? (
              <video 
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover transform -scale-x-100" 
              />
            ) : (
                <div className="flex flex-col items-center justify-center text-slate-500">
                    <span className="material-symbols-outlined text-6xl mb-4">videocam_off</span>
                    <p>Camera is turned off</p>
                </div>
            )}
            
            <div className="absolute top-4 left-4 glass px-3 py-1.5 rounded-lg flex items-center gap-2">
              <span className="text-sm font-medium text-white">{candidateName} (You)</span>
            </div>

            {/* Real-time Waveform Animation (Simulated) */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-end h-16 gap-1.5 px-8 py-3 glass rounded-full opacity-80">
              {[...Array(12)].map((_, i) => (
                <div 
                  key={i} 
                  className={`w-1.5 bg-primary rounded-full origin-bottom animate-waveform`}
                  style={{
                    height: (isMounted && !isMuted) ? `${Math.max(20, Math.random() * 100)}%` : '20%',
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: '0.8s',
                    animationIterationCount: isMuted ? '1' : 'infinite'
                  }}
                ></div>
              ))}
            </div>
          </div>

          <div className="h-20 glass rounded-2xl flex items-center px-4 border-primary/10">
             <div className="w-full flex items-center gap-3 px-4">
                <div className="flex-1 text-slate-400 text-sm animate-pulse flex items-center gap-2">
                   <span className="material-symbols-outlined text-primary">voice_chat</span>
                   {isProcessing ? "AI is responding..." : isListening ? (inputText || "I'm listening, please speak...") : "Voice session active. Tap mic to speak."}
                </div>
                <div className="flex items-center gap-2">
                   <span className="text-[10px] uppercase font-bold text-slate-500">Live Voice-to-Voice Mode</span>
                   <div className="size-2 rounded-full bg-green-500 animate-pulse"></div>
                </div>
             </div>
          </div>
        </div>

        {/* Right Side: Live Transcript */}
        <div className="w-1/4 flex flex-col gap-4">
          <div className="flex-1 rounded-2xl glass flex flex-col overflow-hidden">
            <div className="p-4 border-b border-white/5 flex items-center justify-between">
              <h4 className="font-bold text-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">description</span>
                Live Transcript
              </h4>
              {isProcessing && (
                <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded uppercase font-bold tracking-tighter animate-pulse">
                  AI Processing
                </span>
              )}
            </div>
            
            {/* Messages Area */}
            <div ref={transcriptRef} className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {messages.map((msg, idx) => (
                <div key={idx} className="space-y-1">
                  <p className={`text-[10px] font-bold uppercase ${msg.role === 'assistant' ? 'text-primary/70' : 'text-slate-500'}`}>
                    {msg.role === 'assistant' ? 'Interviewer' : 'You'}
                  </p>
                  <div className={`p-3 rounded-xl ${
                    msg.role === 'assistant' 
                      ? 'glass rounded-tl-none' 
                      : 'glass-primary rounded-tr-none'
                  }`}>
                    <p className={`text-sm ${msg.role === 'assistant' ? 'text-slate-300' : 'text-slate-100'}`}>
                      {msg.content}
                    </p>
                  </div>
                </div>
              ))}
              {isProcessing && (
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-primary/70 uppercase">Interviewer</p>
                  <div className="glass p-3 rounded-xl rounded-tl-none w-16 flex items-center justify-center gap-1 h-10">
                    <div className="size-1.5 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                    <div className="size-1.5 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                    <div className="size-1.5 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Controls */}
      <footer className="h-20 glass border-t-0 flex items-center justify-between px-10 z-50">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 glass px-3 py-2 rounded-xl">
            <span className="material-symbols-outlined text-green-400 text-lg">check_circle</span>
            <span className="text-xs font-medium text-slate-300">Connection: Stable (24ms)</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleListening}
            className={`flex items-center justify-center size-12 rounded-2xl transition-all ${isListening ? 'bg-green-500/20 text-green-500 border border-green-500/50 animate-pulse' : 'glass hover:bg-white/10 text-slate-200'}`}
            title="Toggle Voice dictation"
          >
            <span className="material-symbols-outlined">{isListening ? 'mic' : 'mic_off'}</span>
          </button>
          
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className={`flex items-center justify-center size-12 rounded-2xl transition-all ${isMuted ? 'bg-red-500/20 text-red-500 border border-red-500/50' : 'glass hover:bg-white/10 text-slate-200'}`}
            title="Mute Call Audio"
          >
            <span className="material-symbols-outlined">{isMuted ? 'volume_off' : 'volume_up'}</span>
          </button>
          <button 
            onClick={() => setIsVideoOn(!isVideoOn)}
            className={`flex items-center justify-center size-12 rounded-2xl transition-all ${!isVideoOn ? 'bg-red-500/20 text-red-500 border border-red-500/50' : 'glass hover:bg-white/10 text-slate-200'}`}
          >
            <span className="material-symbols-outlined">{isVideoOn ? 'videocam' : 'videocam_off'}</span>
          </button>
          
          <div className="w-px h-8 bg-white/10 mx-2"></div>
          
          <button className="flex items-center justify-center size-12 rounded-2xl glass hover:bg-white/10 transition-all text-slate-200">
            <span className="material-symbols-outlined">more_vert</span>
          </button>
        </div>
        
        <div className="flex items-center">
          <button 
            onClick={handleEndInterview}
            className="flex items-center gap-3 px-6 py-2.5 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-bold transition-all shadow-lg shadow-red-500/20"
          >
            <span className="material-symbols-outlined">call_end</span>
            End Interview
          </button>
        </div>
      </footer>

      {/* Liquid Background Decor */}
      <div className="fixed top-0 left-0 -z-10 w-full h-full overflow-hidden opacity-30 pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[10%] right-[10%] w-[30%] h-[30%] bg-blue-500/10 blur-[100px] rounded-full"></div>
      </div>
      
      {/* Waveform Keyframes for React injection */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes waveform {
          0% { transform: scaleY(0.2); }
          50% { transform: scaleY(1); }
          100% { transform: scaleY(0.2); }
        }
        .animate-waveform {
          animation-name: waveform;
          animation-timing-function: ease-in-out;
        }
      `}} />
    </div>
  );
}
