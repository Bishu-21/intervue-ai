"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ResumeUpload from "@/components/ResumeUpload";
import { account } from "@/lib/appwrite";

const DEFAULT_INTERESTS = [
  "AI",
  "Web Development",
  "Data Science",
  "Product Design",
  "Cybersecurity",
  "Blockchain"
];

const DEFAULT_CAREER_INTERESTS = [
  "AI Engineer",
  "Software Engineer",
  "Product Manager",
  "Designer",
  "Data Analyst"
];

export default function OnboardingPage() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: "",
    university: "",
    major: "",
    location: "",
    resumeUrl: "",
    interests: [] as string[],
    skills: [
        { name: "Python", level: 50 },
        { name: "UI Design", level: 30 }
    ],
    careerInterests: [] as string[],
    socialLinks: {
      linkedin: "",
      github: "",
      portfolio: ""
    }
  });

  const [customInterest, setCustomInterest] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormValid = formData.name.trim() !== "" && 
                      formData.university.trim() !== "" && 
                      formData.resumeUrl !== "";

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest) 
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleCustomInterestAdd = () => {
    if (customInterest.trim() && !formData.interests.includes(customInterest.trim())) {
      setFormData(prev => ({
        ...prev,
        interests: [...prev.interests, customInterest.trim()]
      }));
      setCustomInterest("");
    }
  };

  const handleCareerInterestToggle = (career: string) => {
    setFormData(prev => ({
      ...prev,
      careerInterests: prev.careerInterests.includes(career)
        ? prev.careerInterests.filter(c => c !== career)
        : [...prev.careerInterests, career]
    }));
  };

  const handleSkillLevelChange = (index: number, newLevel: number) => {
    const newSkills = [...formData.skills];
    newSkills[index].level = newLevel;
    setFormData({ ...formData, skills: newSkills });
  };

  const [newSkillName, setNewSkillName] = useState("");
  const handleAddSkill = () => {
    if (newSkillName.trim()) {
       setFormData(prev => ({
         ...prev,
         skills: [...prev.skills, { name: newSkillName.trim(), level: 50 }]
       }));
       setNewSkillName("");
    }
  };

  const getSkillLabel = (level: number) => {
    if (level < 33) return "Beginner";
    if (level < 66) return "Intermediate";
    return "Advanced";
  };

  const handleSubmit = async () => {
    if (!isFormValid) return;
    setIsSubmitting(true);
    
    try {
      const user = await account.get();
      const payload = { ...formData, userId: user.$id };
      
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      
      if (res.ok) {
        router.push("/dashboard");
      }
    } catch (e) {
      // Silent fail for non-critical onboarding issues or session errors handled by layout
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden bg-background-dark text-slate-100 font-sans selection:bg-primary/30">
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px]"></div>
      </div>

      <header className="flex items-center justify-between border-b border-white/10 px-6 lg:px-40 py-4 bg-white/[0.03] backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-lg shadow-[0_0_15px_rgba(19,109,236,0.4)]">
            <span className="material-symbols-outlined text-white">bolt</span>
          </div>
          <h2 className="text-xl font-bold tracking-tight">Intervue AI</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col items-end mr-2">
            <span className="text-xs text-slate-400 uppercase tracking-wider font-bold">Student Account</span>
            <span className="text-sm font-medium">New User</span>
          </div>
          <div className="bg-primary/20 p-1 rounded-full border border-primary/30">
            <div className="size-10 rounded-full bg-slate-800 flex items-center justify-center">
              <span className="material-symbols-outlined text-slate-400">person</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center py-12 px-6">
        <div className="w-full max-w-4xl space-y-8">
          
          {/* Progress Bar */}
          <div className="bg-white/[0.03] backdrop-blur-md border border-white/10 p-6 rounded-xl space-y-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-lg font-semibold">Profile Completion</h3>
                <p className="text-sm text-slate-400">Step 2 of 4: Experience & Skills</p>
              </div>
              <span className="text-2xl font-bold text-primary">45%</span>
            </div>
            <div className="relative h-3 w-full bg-slate-800 rounded-full overflow-hidden">
              <div className="absolute top-0 left-0 h-full bg-primary shadow-[0_0_15px_rgba(19,109,236,0.4)] w-[45%] transition-all duration-500"></div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <div className="h-1 rounded-full bg-primary"></div>
              <div className="h-1 rounded-full bg-primary/40"></div>
              <div className="h-1 rounded-full bg-slate-800"></div>
              <div className="h-1 rounded-full bg-slate-800"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              
              {/* Basic Info */}
              <section className="bg-white/[0.03] backdrop-blur-md border border-white/10 p-8 rounded-xl">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">person</span> Basic Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Full Name <span className="text-red-500">*</span></label>
                    <input 
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all outline-none" 
                      placeholder="John Doe" 
                      type="text"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">University <span className="text-red-500">*</span></label>
                    <input 
                      value={formData.university}
                      onChange={e => setFormData({...formData, university: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all outline-none" 
                      placeholder="Stanford University" 
                      type="text"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Major</label>
                    <input 
                      value={formData.major}
                      onChange={e => setFormData({...formData, major: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all outline-none" 
                      placeholder="Computer Science" 
                      type="text"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Location</label>
                    <div className="relative">
                      <input 
                        value={formData.location}
                        onChange={e => setFormData({...formData, location: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 pl-10 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all outline-none" 
                        placeholder="San Francisco, CA" 
                        type="text"
                      />
                      <span className="material-symbols-outlined absolute left-3 top-3 text-slate-500 text-sm">location_on</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Interests */}
              <section className="bg-white/[0.03] backdrop-blur-md border border-white/10 p-8 rounded-xl">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">star</span> Interests
                </h2>
                <div className="flex flex-wrap gap-3 mb-4">
                  {[...DEFAULT_INTERESTS, ...formData.interests.filter(i => !DEFAULT_INTERESTS.includes(i))].map(interest => {
                    const isSelected = formData.interests.includes(interest);
                    return (
                      <button 
                        key={interest}
                        onClick={() => handleInterestToggle(interest)}
                        className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                          isSelected 
                            ? "border-primary bg-primary/20 text-primary" 
                            : "border-white/10 bg-white/5 hover:border-primary/50 text-slate-300"
                        }`}
                      >
                        {interest}
                      </button>
                    )
                  })}
                </div>
                <div className="flex items-center gap-2">
                  <input 
                    value={customInterest}
                    onChange={e => setCustomInterest(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleCustomInterestAdd()}
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none" 
                    placeholder="Add custom interest..." 
                  />
                  <button 
                    onClick={handleCustomInterestAdd}
                    className="px-4 py-2 rounded-lg border border-dashed border-white/20 bg-transparent text-slate-400 hover:text-white text-sm font-medium flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-sm">add</span> Add Custom
                  </button>
                </div>
              </section>

              {/* Skills */}
              <section className="bg-white/[0.03] backdrop-blur-md border border-white/10 p-8 rounded-xl">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">psychology</span> Skills & Proficiency
                </h2>
                <div className="space-y-8">
                  {formData.skills.map((skill, idx) => (
                    <div key={idx} className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-xs uppercase bg-primary/10 text-primary px-2 py-1 rounded">
                          {getSkillLabel(skill.level)}
                        </span>
                      </div>
                      <input 
                        className="w-full accent-primary h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer" 
                        type="range"
                        min="0"
                        max="100"
                        value={skill.level}
                        onChange={(e) => handleSkillLevelChange(idx, parseInt(e.target.value))}
                      />
                      <div className="flex justify-between text-[10px] text-slate-500 uppercase font-bold tracking-tighter">
                        <span>Beginner</span>
                        <span>Expert</span>
                      </div>
                    </div>
                  ))}
                  
                  <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
                    <input 
                      value={newSkillName}
                      onChange={e => setNewSkillName(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleAddSkill()}
                      className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 outline-none focus:ring-primary/50 focus:border-primary focus:ring-2"
                      placeholder="E.g. React, Java, User Research..." 
                    />
                    <button 
                      onClick={handleAddSkill}
                      className="w-full py-3 border border-dashed border-white/20 rounded-lg text-slate-400 hover:text-white hover:border-white/40 transition-all flex items-center justify-center gap-2"
                    >
                      <span className="material-symbols-outlined">add_circle</span> Add New Skill
                    </button>
                  </div>
                </div>
              </section>

            </div>

            <div className="space-y-8">
              {/* Resume Upload component */}
              <ResumeUpload onUploadSuccessAction={(url) => setFormData(prev => ({...prev, resumeUrl: url}))} />

              {/* Social Links */}
              <section className="bg-white/[0.03] backdrop-blur-md border border-white/10 p-6 rounded-xl">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">link</span> Social Links
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/10">
                    <div className="w-8 h-8 rounded bg-[#0077B5]/20 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[#0077B5] text-xl">work</span>
                    </div>
                    <input 
                      value={formData.socialLinks.linkedin}
                      onChange={e => setFormData({...formData, socialLinks: {...formData.socialLinks, linkedin: e.target.value}})}
                      className="bg-transparent border-none outline-none text-sm w-full focus:ring-0" 
                      placeholder="LinkedIn URL" 
                      type="text"
                    />
                  </div>
                  <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/10">
                    <div className="w-8 h-8 rounded bg-slate-700/50 flex items-center justify-center">
                      <span className="material-symbols-outlined text-slate-300 text-xl">code</span>
                    </div>
                    <input 
                      value={formData.socialLinks.github}
                      onChange={e => setFormData({...formData, socialLinks: {...formData.socialLinks, github: e.target.value}})}
                      className="bg-transparent border-none outline-none text-sm w-full focus:ring-0" 
                      placeholder="GitHub Profile" 
                      type="text"
                    />
                  </div>
                  <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/10">
                    <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary text-xl">public</span>
                    </div>
                    <input 
                      value={formData.socialLinks.portfolio}
                      onChange={e => setFormData({...formData, socialLinks: {...formData.socialLinks, portfolio: e.target.value}})}
                      className="bg-transparent border-none outline-none text-sm w-full focus:ring-0" 
                      placeholder="Portfolio Website" 
                      type="text"
                    />
                  </div>
                </div>
              </section>

              {/* Career Interests */}
              <section className="bg-white/[0.03] backdrop-blur-md border border-white/10 p-6 rounded-xl">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">work</span> Career Interests
                </h2>
                <div className="space-y-3">
                  {DEFAULT_CAREER_INTERESTS.map(career => (
                    <label key={career} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-all">
                      <input 
                        type="checkbox" 
                        checked={formData.careerInterests.includes(career)}
                        onChange={() => handleCareerInterestToggle(career)}
                        className="w-5 h-5 rounded border-white/20 appearance-none border checked:bg-primary checked:border-primary relative
                          after:content-[''] after:absolute after:hidden checked:after:block after:left-1.5 after:top-0.5 after:w-1.5 after:h-2.5 after:border-white after:border-b-2 after:border-r-2 after:rotate-45"
                      />
                      <span className="text-sm">{career}</span>
                    </label>
                  ))}
                </div>
              </section>
            </div>
          </div>

          <div className="flex items-center justify-between pt-8 border-t border-white/10">
            <button 
              onClick={() => router.back()}
              className="px-8 py-3 rounded-lg font-semibold text-slate-400 hover:text-white transition-all"
            >
              Back
            </button>
            <button 
              onClick={handleSubmit}
              disabled={!isFormValid || isSubmitting}
              className={`px-10 py-3 rounded-lg font-bold transition-all flex items-center gap-2 ${
                isFormValid && !isSubmitting 
                  ? "bg-primary hover:bg-primary/90 text-white shadow-[0_0_15px_rgba(19,109,236,0.4)]" 
                  : "bg-primary/50 text-white/50 cursor-not-allowed"
              }`}
            >
              {isSubmitting ? "Saving..." : "Next Step"}
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
