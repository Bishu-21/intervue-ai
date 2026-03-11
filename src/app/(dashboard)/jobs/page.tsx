"use client";

import { useState, useEffect } from "react";
import { Search, MapPin, DollarSign, Building, Zap, Loader2 } from "lucide-react";
import { account } from "@/lib/appwrite";
import { useRouter } from "next/navigation";

export default function JobsPage() {
  const router = useRouter();
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const user = await account.get();
        const res = await fetch("/api/jobs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.$id })
        });
        
        if (res.ok) {
          const data = await res.json();
          setJobs(data.jobs || []);
        }
      } catch (e) {
        console.error("Failed to fetch jobs", e);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(job => 
    job.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Job Matches</h1>
          <p className="text-gray-400">AI-curated opportunities in India based on your profile.</p>
        </div>
        
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search roles..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-twelve py-2.5 pl-10 pr-4 text-sm focus:border-primary focus:outline-none"
          />
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass-card p-6 rounded-2xl h-[350px] animate-pulse flex flex-col">
              <div className="w-12 h-12 bg-white/10 rounded-twelve mb-4" />
              <div className="h-6 bg-white/10 rounded w-3/4 mb-2" />
              <div className="h-4 bg-white/10 rounded w-1/2 mb-8" />
              <div className="space-y-2 mt-auto">
                <div className="h-4 bg-white/10 rounded w-full" />
                <div className="h-4 bg-white/10 rounded w-full" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
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
                {(job.skills || []).map((skill: string) => (
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
      ) : (
        <div className="text-center py-20 bg-white/[0.02] border border-dashed border-white/10 rounded-2xl">
          <p className="text-gray-400">No matching jobs found. Try adjusting your profile interests.</p>
        </div>
      )}
    </div>
  );
}

