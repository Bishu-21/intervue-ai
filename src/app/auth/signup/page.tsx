"use client";

import { useState } from "react";
import Link from "next/link";
import { account } from "@/lib/appwrite";
import { OAuthProvider, ID } from "appwrite";

export default function SignupPage() {
  const [role, setRole] = useState("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleOAuthSignup = (provider: OAuthProvider) => {
    account.createOAuth2Token(
      provider,
      `${window.location.origin}/onboarding`, // Success URL
      `${window.location.origin}/auth/signup` // Failure URL
    );
  };

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !name) return;

    try {
      setLoading(true);
      setError("");
      
      // Creating the Appwrite standard email/password user
      await account.create(
        ID.unique(),
        email,
        password,
        name
      );
      
      // Auto-login the user
      await account.createEmailPasswordSession(email, password);
      
      // Note: In an actual app, you may want to save the user's selected 'role' into
      // Appwrite Databases before redirecting.
      
      window.location.href = "/onboarding";
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-display bg-background-light dark:bg-[#101822] text-slate-900 dark:text-slate-100 min-h-screen flex flex-col relative overflow-x-hidden">
      {/* Background Liquid Shapes */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px]"></div>
        <div className="absolute bottom-[-5%] right-[-5%] w-[35%] h-[35%] rounded-full bg-primary/10 blur-[100px]"></div>
        <div className="absolute top-[20%] right-[10%] w-[20%] h-[20%] rounded-full bg-indigo-500/10 blur-[80px]"></div>
      </div>
      
      {/* Top Navigation */}
      <header className="flex items-center justify-between px-6 py-4 lg:px-12 z-10">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-xl">dataset</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight">Intervue AI</h1>
        </Link>
      </header>
      
      {/* Center Content */}
      <main className="flex-grow flex items-center justify-center px-4 py-8 z-10">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 w-full max-w-[500px] rounded-xl p-8 lg:p-10 shadow-2xl relative">
          
          {/* Liquid Light Glow behind card */}
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-primary/20 blur-[60px] rounded-full z-[-1]"></div>
          
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black mb-2 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">Create Account</h2>
            <p className="text-slate-500 dark:text-slate-400">Join the future of AI interviewing</p>
          </div>
          
          <form className="space-y-5" onSubmit={handleEmailSignup}>
            {/* Role Selection */}
            <div className="p-1 flex flex-row gap-1 bg-slate-100 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
              <label className="flex-1 cursor-pointer">
                <input 
                  type="radio" 
                  name="role" 
                  value="student" 
                  className="hidden peer"
                  checked={role === "student"}
                  onChange={() => setRole("student")}
                />
                <div className="flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all peer-checked:bg-white dark:peer-checked:bg-slate-700 peer-checked:shadow-sm text-slate-500 dark:text-slate-400 peer-checked:text-primary">
                  <span className="material-symbols-outlined text-lg">school</span>
                  Student
                </div>
              </label>
              <label className="flex-1 cursor-pointer">
                <input 
                  type="radio" 
                  name="role" 
                  value="company" 
                  className="hidden peer"
                  checked={role === "company"}
                  onChange={() => setRole("company")}
                />
                <div className="flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all peer-checked:bg-white dark:peer-checked:bg-slate-700 peer-checked:shadow-sm text-slate-500 dark:text-slate-400 peer-checked:text-primary">
                  <span className="material-symbols-outlined text-lg">business</span>
                  Company
                </div>
              </label>
            </div>
            
            {/* Input Fields */}
            <div className="space-y-4">
              <div className="group">
                <label className="block text-sm font-medium mb-1.5 ml-1 text-slate-700 dark:text-slate-300">Full Name</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">person</span>
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all outline-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600" 
                    placeholder="John Doe" 
                  />
                </div>
              </div>

              <div className="group">
                <label className="block text-sm font-medium mb-1.5 ml-1 text-slate-700 dark:text-slate-300">Email Address</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">mail</span>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all outline-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600" 
                    placeholder="name@company.com" 
                  />
                </div>
              </div>

              <div className="group">
                <label className="block text-sm font-medium mb-1.5 ml-1 text-slate-700 dark:text-slate-300">Password</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">lock</span>
                  <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all outline-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600" 
                    placeholder="••••••••" 
                  />
                </div>
              </div>
            </div>
            
            {error && (
              <p className="text-sm font-medium text-center text-red-500 bg-red-500/10 py-2 rounded-lg">
                {error}
              </p>
            )}

            {/* Main Action */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#136dec] text-white font-bold py-4 rounded-xl transition-all hover:shadow-[0_0_20px_rgba(19,109,236,0.6)] flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
            >
              <span>{loading ? "Creating..." : "Create Account"}</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
            
            {/* Divider */}
            <div className="relative flex items-center py-4">
              <div className="flex-grow border-t border-slate-200 dark:border-slate-700"></div>
              <span className="flex-shrink mx-4 text-xs font-medium text-slate-400 uppercase tracking-widest">Or continue with</span>
              <div className="flex-grow border-t border-slate-200 dark:border-slate-700"></div>
            </div>
            
            {/* Social Signins */}
            <div className="grid grid-cols-2 gap-4">
              <button 
                type="button" 
                onClick={() => handleOAuthSignup(OAuthProvider.Google)}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <img alt="Google" className="w-5 h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEAUEupIzibkj_zd6BKSzTXhNaiMdeZlW-vGyY5YE-f3fC_UBZiwbrgBkfFQ58oMVx5DgYpurxHohMOI_86r52eI_6PK4Si1C_7vrGE4HRN36otU9IgRqAMVCZ9vW-YqVJMkC7NWvlMaio4EUdujPWD3sG1RfhU_PwpUw4RyGZeXEACiGaRHS1_o0OqQAMI6fsUzlZMZLegCczsUPjS3jlsvye7mWvRm9490YvXb1s4WkONggLSb0RCIyFdPTE6f-AFXiQDWWFDpI" />
                <span className="text-sm font-semibold">Google</span>
              </button>
              <button 
                type="button" 
                onClick={() => handleOAuthSignup(OAuthProvider.Linkedin)}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <img alt="LinkedIn" className="w-5 h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8aKa98IghRznvMX5OswfNvnA246neYHkd7kDEGtfZLZEEX8uVEzYUc3Ihl17U_-bPU52lFYyc2RHawqprE6wc4d177lFSr2628oxQJcH6IAh4aEH4U_3wHStGWLeHnoyTXm18S5xoY0jSeLI_5tNA-4Dtq54zirMf9wX1NZ9cuUh-3Bzm2xTrI6kSe_3m9iS4k-N1b-zf9S7UQo4_aP0jgD6dWzNx54A7GG3dWSTTLH79RiC_55_6eq1u-iNRCo0cNw-xTD_XSEY" />
                <span className="text-sm font-semibold">LinkedIn</span>
              </button>
            </div>
            
            <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
              Already have an account? 
              <Link href="/auth" className="text-primary font-bold hover:underline ml-1">Log in</Link>
            </p>
          </form>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="px-6 py-8 text-center text-xs text-slate-500 dark:text-slate-600 z-10">
        © {new Date().getFullYear()} Intervue AI. All rights reserved. Built with advanced neural systems.
      </footer>
    </div>
  );
}
