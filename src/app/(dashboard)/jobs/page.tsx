import { Search, MapPin, DollarSign, Building, Zap } from "lucide-react";

export default function JobsPage() {
  const jobs = [
    {
      id: 1,
      role: "Senior Full Stack Engineer",
      company: "TechFlow",
      location: "San Francisco, CA (Hybrid)",
      salary: "$150k - $200k",
      skills: ["React", "Node.js", "Redis"],
      match: 98
    },
    {
      id: 2,
      role: "Machine Learning Specialist",
      company: "InnovateNow",
      location: "Remote",
      salary: "$160k - $220k",
      skills: ["Python", "PyTorch", "AWS"],
      match: 92
    },
    {
      id: 3,
      role: "Frontend Developer",
      company: "Scaleup Inc.",
      location: "New York, NY",
      salary: "$120k - $160k",
      skills: ["React", "Tailwind", "TypeScript"],
      match: 85
    }
  ];

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Job Matches</h1>
          <p className="text-gray-400">AI-curated opportunities based on your profile and interview score.</p>
        </div>
        
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search roles..." 
            className="w-full bg-white/5 border border-white/10 rounded-twelve py-2.5 pl-10 pr-4 text-sm focus:border-primary focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div key={job.id} className="glass-card p-6 rounded-2xl flex flex-col h-full cursor-pointer group hover:bg-white/[0.04]">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-white/10 rounded-twelve flex items-center justify-center">
                <Building className="w-6 h-6 text-gray-300" />
              </div>
              <div className="flex items-center gap-1 bg-green-500/10 text-green-400 px-2 py-1 rounded text-xs font-bold border border-green-500/20">
                <Zap className="w-3 h-3" />
                {job.match}% Match
              </div>
            </div>
            
            <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">{job.role}</h3>
            <p className="text-gray-400 text-sm mb-4">{job.company}</p>
            
            <div className="space-y-2 mb-6 mt-auto">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <MapPin className="w-4 h-4 text-gray-500" />
                {job.location}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <DollarSign className="w-4 h-4 text-gray-500" />
                {job.salary}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {job.skills.map(skill => (
                <span key={skill} className="bg-white/5 border border-white/10 px-2.5 py-1 rounded text-xs text-gray-300">
                  {skill}
                </span>
              ))}
            </div>
            
            <button className="w-full py-2.5 bg-white/5 hover:bg-primary hover:text-white rounded-twelve text-sm font-semibold transition-colors border border-white/10 hover:border-primary">
              Express Interest
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
