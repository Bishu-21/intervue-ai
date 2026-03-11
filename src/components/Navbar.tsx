import Link from "next/link";
import { LayoutDashboard } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 glass-nav" data-purpose="main-navigation">
      <div className="mx-auto px-6 h-20 flex items-center justify-between max-w-7xl">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-twelve flex items-center justify-center">
            <LayoutDashboard className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">Intervue AI</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <Link href="/#features" className="hover:text-white transition-colors">Features</Link>
          <Link href="/#demo" className="hover:text-white transition-colors">AI Demo</Link>
          <Link href="/leaderboard" className="hover:text-white transition-colors">Talent Pool</Link>
          <Link href="/jobs" className="hover:text-white transition-colors">Jobs</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/auth" className="text-sm font-medium hover:text-primary transition-colors">Login</Link>
          <Link href="/auth" className="bg-primary hover:bg-blue-600 text-white px-6 py-2.5 rounded-twelve text-sm font-semibold transition-all">
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
