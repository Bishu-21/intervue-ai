import Link from "next/link";
import { LayoutDashboard, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-20 px-6 border-t border-white/10" data-purpose="main-footer">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-primary rounded-twelve flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold">Intervue AI</span>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed">
            Revolutionizing hiring through artificial intelligence and validated talent ecosystems.
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-gray-300">Platform</h4>
          <ul className="space-y-4 text-sm text-gray-500">
            <li><Link href="#" className="hover:text-primary transition-colors">How it Works</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">AI Interviewer</Link></li>
            <li><Link href="/leaderboard" className="hover:text-primary transition-colors">Talent Score</Link></li>
            <li><Link href="/jobs" className="hover:text-primary transition-colors">Career Path</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-gray-300">Company</h4>
          <ul className="space-y-4 text-sm text-gray-500">
            <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Careers</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-gray-300">Stay Updated</h4>
          <div className="relative">
            <input 
              type="email" 
              className="w-full bg-white/5 border border-white/10 rounded-twelve py-3 px-4 text-sm focus:outline-none focus:border-primary text-white placeholder-gray-500" 
              placeholder="Your email" 
            />
            <button className="absolute right-2 top-2 bg-primary p-1.5 rounded-lg hover:bg-blue-600 transition-colors">
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-20 pt-8 border-t border-white/5 text-center text-gray-600 text-xs">
        © {new Date().getFullYear()} Intervue AI. All rights reserved.
      </div>
    </footer>
  );
}
