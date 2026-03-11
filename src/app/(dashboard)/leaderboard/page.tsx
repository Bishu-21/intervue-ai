import { Trophy, Medal, Award, Eye } from "lucide-react";

export default function LeaderboardPage() {
  const leaders = [
    { rank: 1, name: "Alex Rivera", role: "Full Stack Engineer", score: 9.8, skills: ["React", "Node.js"], tier: "Elite" },
    { rank: 2, name: "Sarah Chen", role: "ML Specialist", score: 9.6, skills: ["PyTorch", "Python"], tier: "Platinum" },
    { rank: 3, name: "Jordan Smith", role: "Product Designer", score: 9.4, skills: ["Figma", "UI/UX"], tier: "Gold" },
    { rank: 4, name: "Michael Chang", role: "Backend Engineer", score: 9.1, skills: ["Go", "Kubernetes"], tier: "Silver" },
    { rank: 5, name: "Emma Wilson", role: "Frontend Developer", score: 8.9, skills: ["Vue", "Tailwind"], tier: "Bronze" },
  ];

  const getTierIcon = (rank: number) => {
    switch(rank) {
      case 1: return <Trophy className="w-6 h-6 text-yellow-400" />;
      case 2: return <Medal className="w-6 h-6 text-gray-300" />;
      case 3: return <Award className="w-6 h-6 text-[#CD7F32]" />;
      default: return <span className="font-bold text-gray-500 text-lg">#{rank}</span>;
    }
  };

  const getTierColor = (tier: string) => {
    switch(tier) {
      case 'Elite': return 'from-yellow-400 to-yellow-600';
      case 'Platinum': return 'from-gray-300 to-gray-500';
      case 'Gold': return 'from-[#FFD700] to-[#DAA520]';
      case 'Silver': return 'from-gray-400 to-gray-600';
      case 'Bronze': return 'from-[#CD7F32] to-[#8B4513]';
      default: return 'from-primary to-blue-500';
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Global Leaderboard</h1>
          <p className="text-gray-400">Validated candidates ranked by their AI Interview scores.</p>
        </div>
        
        <div className="flex gap-2">
          <select className="bg-white/5 border border-white/10 rounded-twelve py-2 px-4 text-sm focus:border-primary focus:outline-none appearance-none">
            <option>All Roles</option>
            <option>Engineering</option>
            <option>Design</option>
            <option>Product</option>
          </select>
          <select className="bg-white/5 border border-white/10 rounded-twelve py-2 px-4 text-sm focus:border-primary focus:outline-none appearance-none">
            <option>Global</option>
            <option>North America</option>
            <option>Europe</option>
            <option>Asia</option>
          </select>
        </div>
      </div>

      <div className="glass-card rounded-twelve overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="px-8 py-5 text-xs font-bold uppercase text-gray-400 tracking-wider">Rank</th>
                <th className="px-8 py-5 text-xs font-bold uppercase text-gray-400 tracking-wider">Candidate</th>
                <th className="px-8 py-5 text-xs font-bold uppercase text-gray-400 tracking-wider">Expertise</th>
                <th className="px-8 py-5 text-xs font-bold uppercase text-gray-400 tracking-wider text-center">Talent Score</th>
                <th className="px-8 py-5 text-xs font-bold uppercase text-gray-400 tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {leaders.map((leader) => (
                <tr key={leader.rank} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-8 py-6 text-center w-16">
                    <div className="flex items-center justify-center">
                      {getTierIcon(leader.rank)}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${getTierColor(leader.tier)}`}></div>
                      <div>
                        <p className="font-bold">{leader.name}</p>
                        <p className="text-xs text-gray-500">{leader.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex gap-2">
                      {leader.skills.map(skill => (
                        <span key={skill} className="px-2 py-1 bg-white/5 rounded text-[10px] text-gray-400">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className="text-lg font-bold text-primary">{leader.score}</span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="flex items-center justify-end gap-2 text-sm font-semibold text-primary hover:underline ml-auto">
                      <Eye className="w-4 h-4" />
                      View Portfolio
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
