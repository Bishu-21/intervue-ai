import Link from "next/link";
import { Mic, BarChart, Zap, Handshake } from "lucide-react";

export default function LandingPage() {
  return (
    <>
      <section className="relative pt-20 pb-20 px-6 overflow-hidden" data-purpose="hero-section">
        <div className="glow-bg top-0 -left-20"></div>
        <div className="glow-bg bottom-0 -right-20"></div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-white/10 mb-8 animate-bounce">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-300">Next Gen Career Tech</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-8 leading-[1.1]">
            One Interview.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
              Infinite Opportunities.
            </span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-gray-400 text-lg md:text-xl mb-12">
            Experience a revolutionary AI-powered career ecosystem where a single interview unlocks a world of global roles. Validated skills, instant matching, and direct hiring.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Link href="/auth" className="w-full md:w-auto px-10 py-4 bg-white text-dark font-bold rounded-twelve hover:bg-gray-100 transition-all shadow-xl shadow-white/5 text-center">
              Start Free Journey
            </Link>
            <Link href="#demo" className="w-full md:w-auto px-10 py-4 glass-card font-bold rounded-twelve hover:bg-white/10 transition-all text-center">
              Watch Demo
            </Link>
          </div>

          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6" data-purpose="hero-feature-carousel">
            <div className="glass-card p-8 rounded-twelve text-left animate-float" style={{ animationDelay: '0s' }}>
              <div className="w-12 h-12 bg-primary/20 rounded-twelve flex items-center justify-center mb-6">
                <Mic className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">AI Interview</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Sophisticated voice and video AI that evaluates your skills through natural conversation.
              </p>
            </div>
            
            <div className="glass-card p-8 rounded-twelve text-left animate-float" style={{ animationDelay: '0.2s' }}>
              <div className="w-12 h-12 bg-blue-500/20 rounded-twelve flex items-center justify-center mb-6">
                <BarChart className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Talent Score</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                A verified, data-driven performance score that showcases your true potential to top employers.
              </p>
            </div>
            
            <div className="glass-card p-8 rounded-twelve text-left animate-float" style={{ animationDelay: '0.4s' }}>
              <div className="w-12 h-12 bg-indigo-500/20 rounded-twelve flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Instant Match</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Automated matching with high-growth startups and global tech giants looking for your profile.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-dark/50" data-purpose="ai-demo-section" id="demo">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">See the AI in Action</h2>
            <p className="text-gray-400">Our AI agent conducts professional, bias-free technical and behavioral interviews.</p>
          </div>
          <div className="glass-card rounded-3xl p-4 md:p-8 flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/2 aspect-video bg-black rounded-2xl overflow-hidden relative group">
              <img 
                alt="AI Interface" 
                className="w-full h-full object-cover opacity-60" 
                src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-20 h-20 bg-primary/90 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-2xl shadow-primary/20">
                  <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>
                </button>
              </div>
              <div className="absolute bottom-6 left-6 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                <span className="text-xs font-mono text-white/70">REC: 00:04:12</span>
              </div>
            </div>
            <div className="w-full md:w-1/2 space-y-6">
              <div className="space-y-4">
                <div className="p-4 rounded-twelve bg-white/5 border border-white/10">
                  <p className="text-xs font-bold text-primary mb-1 uppercase tracking-tighter">AI Interviewer</p>
                  <p className="text-sm italic">&quot;Can you explain the difference between optimistic and pessimistic locking in a distributed system?&quot;</p>
                </div>
                <div className="p-4 rounded-twelve bg-primary/10 border border-primary/20 ml-8">
                  <p className="text-xs font-bold text-blue-400 mb-1 uppercase tracking-tighter">Candidate</p>
                  <p className="text-sm">&quot;Optimistic locking assumes conflicts are rare, while pessimistic locking...&quot;</p>
                </div>
              </div>
              <div className="pt-6">
                <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  Real-time Feedback Engine
                </h4>
                <ul className="text-sm text-gray-400 space-y-3">
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-primary rounded-full"></div>
                    Natural Language Processing (NLP) Analysis
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-primary rounded-full"></div>
                    Technical Depth &amp; Accuracy Scoring
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-primary rounded-full"></div>
                    Communication &amp; Confidence Metrics
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-24 px-6 relative" data-purpose="talent-leaderboard" id="leaderboard">
        <div className="glow-bg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-4xl font-bold mb-4">Top Talent Leaderboard</h2>
              <p className="text-gray-400">Validated candidates with verified Talent Scores ready for immediate hire.</p>
            </div>
            <Link href="/leaderboard" className="px-6 py-3 bg-white/5 border border-white/10 rounded-twelve text-sm font-semibold hover:bg-white/10 transition-colors inline-block text-center">
              View All Talent
            </Link>
          </div>
          <div className="glass-card rounded-twelve overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="px-8 py-5 text-xs font-bold uppercase text-gray-400 tracking-wider">Candidate</th>
                    <th className="px-8 py-5 text-xs font-bold uppercase text-gray-400 tracking-wider">Expertise</th>
                    <th className="px-8 py-5 text-xs font-bold uppercase text-gray-400 tracking-wider text-center">Talent Score</th>
                    <th className="px-8 py-5 text-xs font-bold uppercase text-gray-400 tracking-wider text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-500"></div>
                        <div>
                          <p className="font-bold">Alex Rivera</p>
                          <p className="text-xs text-gray-500">Verified Full Stack Engineer</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex gap-2">
                        <span className="px-2 py-1 bg-white/5 rounded text-[10px] text-gray-400">React</span>
                        <span className="px-2 py-1 bg-white/5 rounded text-[10px] text-gray-400">Node.js</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className="text-lg font-bold text-primary">9.8</span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="text-sm font-semibold text-primary hover:underline">View Portfolio</button>
                    </td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-blue-500"></div>
                        <div>
                          <p className="font-bold">Sarah Chen</p>
                          <p className="text-xs text-gray-500">ML Specialist</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex gap-2">
                        <span className="px-2 py-1 bg-white/5 rounded text-[10px] text-gray-400">PyTorch</span>
                        <span className="px-2 py-1 bg-white/5 rounded text-[10px] text-gray-400">Python</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className="text-lg font-bold text-primary">9.6</span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="text-sm font-semibold text-primary hover:underline">View Portfolio</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white/[0.02]" data-purpose="success-stories" id="testimonials">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="glass-card p-8 rounded-twelve">
              <p className="text-gray-300 italic mb-8">&quot;I did one interview and within 48 hours, I had offers from three different startups. The AI scoring really helped me stand out without multiple rounds.&quot;</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-700"></div>
                <div>
                  <p className="font-bold">David L.</p>
                  <p className="text-xs text-gray-500">Frontend Engineer @ TechFlow</p>
                </div>
              </div>
            </div>
            <div className="glass-card p-8 rounded-twelve border-primary/20 bg-primary/5">
              <p className="text-gray-300 italic mb-8">&quot;Intervue AI streamlined our entire hiring pipeline. We only see candidates who are already validated, saving us hundreds of hours.&quot;</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-700"></div>
                <div>
                  <p className="font-bold">Maria G.</p>
                  <p className="text-xs text-gray-500">CTO @ InnovateNow</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-32 px-6 relative overflow-hidden" data-purpose="call-to-action">
        <div className="absolute inset-0 liquid-gradient opacity-20"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-extrabold mb-8 tracking-tighter">Ready to fast-track your career?</h2>
          <p className="text-xl text-gray-400 mb-12">Join thousands of developers getting hired through the world&apos;s most advanced AI interview platform.</p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link href="/auth" className="bg-primary hover:bg-blue-600 text-white px-12 py-5 rounded-twelve text-lg font-bold transition-all shadow-2xl shadow-primary/20 text-center">
              Sign Up for Free
            </Link>
            <Link href="/auth" className="glass-card px-12 py-5 rounded-twelve text-lg font-bold hover:bg-white/10 transition-all text-center">
              For Employers
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
