import Link from "next/link";
import { LayoutDashboard, User, Briefcase, Trophy, LogOut } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-dark text-white flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 glass-nav flex flex-col fixed h-full z-40">
        <div className="p-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-twelve flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">Intervue AI</span>
          </Link>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-twelve text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
            <User className="w-5 h-5" />
            <span>Profile</span>
          </Link>
          <Link href="/jobs" className="flex items-center gap-3 px-4 py-3 rounded-twelve text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
            <Briefcase className="w-5 h-5" />
            <span>Jobs</span>
          </Link>
          <Link href="/leaderboard" className="flex items-center gap-3 px-4 py-3 rounded-twelve text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
            <Trophy className="w-5 h-5" />
            <span>Leaderboard</span>
          </Link>
          <Link href="/interview" className="flex items-center gap-3 px-4 py-3 rounded-twelve bg-primary/10 text-primary hover:bg-primary/20 transition-colors font-medium mt-8 border border-primary/20">
            <LayoutDashboard className="w-5 h-5" />
            <span>Start Interview</span>
          </Link>
        </nav>
        
        <div className="p-4 border-t border-white/10">
          <button className="flex items-center gap-3 px-4 py-3 w-full rounded-twelve text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
            <LogOut className="w-5 h-5" />
            <span>Sign out</span>
          </button>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  );
}
