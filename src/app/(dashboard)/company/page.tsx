import { Users, Filter, Star, Briefcase, Eye, ChevronRight } from "lucide-react";

export default function RecruiterDashboard() {
  const candidates = [
    { id: 1, name: "Alex Rivera", role: "Full Stack Engineer", match: 98, status: "Interviewed", score: 9.8 },
    { id: 2, name: "Maria Gonzalez", role: "Frontend Developer", match: 94, status: "Pending Review", score: 9.2 },
    { id: 3, name: "James Wilson", role: "Backend Engineer", match: 88, status: "Shortlisted", score: 8.9 },
  ];

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold mb-2">Company Dashboard</h1>
          <p className="text-gray-400">Manage open positions and evaluate AI-validated candidates.</p>
        </div>
        <button className="bg-primary hover:bg-blue-600 px-6 py-2.5 rounded-twelve text-sm font-semibold transition-colors">
          Post New Role
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <div className="glass-card p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-2 text-gray-400">
            <Briefcase className="w-5 h-5" />
            <span className="font-semibold">Active Roles</span>
          </div>
          <div className="text-3xl font-bold">12</div>
        </div>
        <div className="glass-card p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-2 text-gray-400">
            <Users className="w-5 h-5" />
            <span className="font-semibold">Total Candidates</span>
          </div>
          <div className="text-3xl font-bold">843</div>
        </div>
        <div className="glass-card p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-2 text-primary">
            <Star className="w-5 h-5" />
            <span className="font-semibold">Top Matches</span>
          </div>
          <div className="text-3xl font-bold text-primary">45</div>
        </div>
        <div className="glass-card p-6 rounded-2xl bg-white/5 border border-white/10">
          <p className="text-sm text-gray-400 mb-4">Intervue AI is currently sourcing 150+ engineers for your backend requirements.</p>
          <button className="text-sm text-primary font-bold hover:underline flex items-center gap-1">
            View Active Campaigns <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <h2 className="text-xl font-bold">Recent Top Candidates</h2>
          <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="px-6 py-4 text-xs font-bold uppercase text-gray-400">Candidate</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-gray-400">Role Match</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-gray-400">Status</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-gray-400">AI Score</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-gray-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {candidates.map((c) => (
                <tr key={c.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500"></div>
                      <span className="font-bold">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-semibold">{c.role}</span>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden w-24">
                          <div className="h-full bg-green-500" style={{ width: `${c.match}%` }}></div>
                        </div>
                        <span className="text-xs text-green-400 font-bold">{c.match}%</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 text-xs font-bold rounded bg-white/10 text-gray-300">
                      {c.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-lg font-bold text-primary">{c.score}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="inline-flex items-center justify-center gap-2 text-sm font-bold text-white bg-white/10 hover:bg-primary transition-colors px-4 py-2 rounded-twelve">
                      <Eye className="w-4 h-4" /> View Insights
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
