"use client";

import { useState } from "react";
import Link from "next/link";
import { account } from "@/lib/appwrite";
import { OAuthProvider, ID } from "appwrite";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [userId, setUserId] = useState("");
  const [otp, setOtp] = useState("");

  const handleOAuthLogin = (provider: OAuthProvider) => {
    account.createOAuth2Session(
      provider,
      `${window.location.origin}/dashboard`, // Success URL
      `${window.location.origin}/auth` // Failure URL
    );
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      setLoading(true);
      setMessage("");
      
      const token = await account.createEmailToken(
        ID.unique(),
        email
      );
      
      setUserId(token.userId);
      setShowOtp(true);
      setMessage(`Secure token sent to ${email}. Check your inbox!`);
      
    } catch (err: any) {
      console.error(err);
      setMessage("Failed to send login token. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || !userId) return;

    try {
      setLoading(true);
      setMessage("");
      
      await account.createSession(userId, otp);
      
      window.location.href = "/dashboard";
    } catch (err: any) {
      console.error(err);
      setMessage("Invalid or expired code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-display bg-background-light dark:bg-[#101822] text-slate-900 dark:text-slate-100 min-h-screen relative overflow-hidden transition-colors duration-300 flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="fixed inset-0 liquid-bg -z-10 bg-[radial-gradient(circle_at_20%_30%,_rgba(19,109,236,0.15)_0%,_transparent_40%),radial-gradient(circle_at_80%_70%,_rgba(19,109,236,0.1)_0%,_transparent_40%)]"></div>
      <div className="blur-[80px] opacity-40 absolute z-[-1] bg-primary w-96 h-96 top-[-10%] left-[-10%] rounded-full"></div>
      <div className="blur-[80px] opacity-40 absolute z-[-1] bg-blue-400 w-80 h-80 bottom-[-5%] right-[-5%] rounded-full"></div>
      
      {/* Navigation Header */}
      <header className="w-full px-6 py-4 flex items-center justify-between absolute top-0 left-0 z-10">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-primary p-1.5 rounded-lg">
            <span className="material-symbols-outlined text-white text-2xl">grid_view</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Intervue AI</span>
        </Link>
      </header>
      
      {/* Main Container */}
      <div className="w-full max-w-[440px] bg-white/5 backdrop-blur-[20px] border border-white/10 p-8 rounded-xl shadow-2xl relative overflow-hidden">
        {/* Decorative Inner Glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 blur-3xl rounded-full"></div>
        
        <div className="relative z-10">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Please enter your details to sign in</p>
          </div>
          
          {/* Social Sign In */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button 
              onClick={() => handleOAuthLogin(OAuthProvider.Google)}
              className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 py-3 px-4 rounded-xl hover:bg-white/10 text-sm font-medium transition-colors"
            >
              <img alt="Google" className="w-5 h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFIw_LzqYkvPjIZQBVkh1owZx3sGyJiR9a6Jp4oMwf9iRAv9A8U8hsEPo3S4XH3wKXxfiUUqvCH3s0RZhHRp_IiN_7-9rVLpzR-jQpy6_TPsQKbEjVchZtbZVXrguSOn2-vVQPJS2Zk9ihbmgavGV7sw-5NdnPdQES6eFTXXq_xvfttaIgdpZ88H9kAguAP-vvHuq-g8sIHUJyCVonUKyePZyHwoxtQLHTs1a72KgSjrr2CwrgT0MH9aXCPX5_dOm-6SVJLHndK7A"/>
              Google
            </button>
            <button 
              onClick={() => handleOAuthLogin(OAuthProvider.Linkedin)}
              className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 py-3 px-4 rounded-xl hover:bg-white/10 text-sm font-medium transition-colors"
            >
              <img alt="LinkedIn" className="w-5 h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8aKa98IghRznvMX5OswfNvnA246neYHkd7kDEGtfZLZEEX8uVEzYUc3Ihl17U_-bPU52lFYyc2RHawqprE6wc4d177lFSr2628oxQJcH6IAh4aEH4U_3wHStGWLeHnoyTXm18S5xoY0jSeLI_5tNA-4Dtq54zirMf9wX1NZ9cuUh-3Bzm2xTrI6kSe_3m9iS4k-N1b-zf9S7UQo4_aP0jgD6dWzNx54A7GG3dWSTTLH79RiC_55_6eq1u-iNRCo0cNw-xTD_XSEY"/>
              LinkedIn
            </button>
          </div>
          
          <div className="flex items-center gap-4 mb-8">
            <div className="h-[1px] flex-1 bg-slate-200 dark:bg-slate-800"></div>
            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">OR EMAIL</span>
            <div className="h-[1px] flex-1 bg-slate-200 dark:bg-slate-800"></div>
          </div>
          
          {/* Login Form */}
          {!showOtp ? (
            <form className="space-y-6" onSubmit={handleEmailLogin}>
              <div className="space-y-2 group">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1 transition-all group-focus-within:text-primary">Email Address</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">mail</span>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-100/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all placeholder:text-slate-500 dark:placeholder:text-slate-600" 
                    placeholder="name@company.com" 
                  />
                </div>
              </div>
              
              {message && (
                <p className="text-sm font-medium text-center text-primary bg-primary/10 py-2 rounded-lg">
                  {message}
                </p>
              )}

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#136dec] hover:bg-blue-600 text-white font-bold py-4 rounded-xl shadow-[0_0_15px_rgba(19,109,236,0.3)] hover:shadow-[0_0_20px_rgba(19,109,236,0.6)] disabled:opacity-50 transition-all flex items-center justify-center gap-2 group"
              >
                {loading ? "Sending..." : "Send Magic Link"}
                <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>
            </form>
          ) : (
            <form className="space-y-6" onSubmit={handleVerifyOtp}>
              <div className="space-y-2 group">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1 transition-all group-focus-within:text-primary">Verification Code</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">password</span>
                  <input 
                    type="text" 
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full tracking-widest text-center bg-slate-100/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl py-4 pr-12 pl-12 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all placeholder:text-slate-500 dark:placeholder:text-slate-600 font-bold text-lg" 
                    placeholder="------" 
                    maxLength={6}
                  />
                </div>
              </div>
              
              {message && (
                <p className={`text-sm font-medium text-center py-2 rounded-lg ${message.includes('Invalid') ? 'text-red-500 bg-red-500/10' : 'text-green-500 bg-green-500/10'}`}>
                  {message}
                </p>
              )}

              <button 
                type="submit" 
                disabled={loading || otp.length < 6}
                className="w-full bg-[#136dec] hover:bg-blue-600 text-white font-bold py-4 rounded-xl shadow-[0_0_15px_rgba(19,109,236,0.3)] hover:shadow-[0_0_20px_rgba(19,109,236,0.6)] disabled:opacity-50 transition-all flex items-center justify-center gap-2 group"
              >
                {loading ? "Verifying..." : "Verify Code"}
                <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">check_circle</span>
              </button>
            </form>
          )}
          
          <p className="mt-8 text-center text-slate-500 dark:text-slate-400 text-sm">
              Don&apos;t have an account? 
              <Link href="/auth/signup" className="text-primary font-bold hover:underline ml-1">Create account</Link>
          </p>
        </div>
      </div>
      
      {/* Footer Stats */}
      <footer className="fixed bottom-8 left-0 w-full px-8 flex flex-col md:flex-row items-center justify-between text-slate-500 text-xs gap-4 z-10 hidden md:flex">
        <div className="flex items-center gap-6 bg-white/5 border border-white/10 backdrop-blur-md py-2 px-4 rounded-full">
          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> System Operational</span>
          <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">shield</span> SSL Secured</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
          <span>© {new Date().getFullYear()} Intervue AI</span>
        </div>
      </footer>
    </div>
  );
}
