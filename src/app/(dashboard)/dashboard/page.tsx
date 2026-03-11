"use client";

import { useState, useEffect } from "react";
import { Upload, Save, Loader2 } from "lucide-react";
import { account } from "@/lib/appwrite";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = await account.get();
        const res = await fetch(`/api/user/profile?userId=${user.$id}`);
        if (res.ok) {
          const data = await res.json();
          setProfile(data.profile);
        }
      } catch (e) {
        console.error("Failed to fetch profile", e);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  const p = profile || {};

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 md:px-0">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Profile</h1>
        <p className="text-gray-400">Manage your career profile and AI interview preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <section className="glass-card p-6 rounded-2xl">
            <h2 className="text-xl font-bold mb-4">Personal Details</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Full Name</label>
                  <input type="text" readOnly value={p.name || p.fullName || "Guest User"} className="w-full bg-white/5 border border-white/10 rounded-twelve py-2 px-4 focus:border-primary focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">University / Bootcamp</label>
                  <input type="text" readOnly value={p.university || "Not provided"} className="w-full bg-white/5 border border-white/10 rounded-twelve py-2 px-4 focus:border-primary focus:outline-none" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-1">Bio / Major</label>
                <textarea rows={4} readOnly className="w-full bg-white/5 border border-white/10 rounded-twelve py-2 px-4 focus:border-primary focus:outline-none" value={p.major || "No major specified."}></textarea>
              </div>
            </div>
          </section>

          <section className="glass-card p-6 rounded-2xl">
            <h2 className="text-xl font-bold mb-4">Links</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">LinkedIn Profile</label>
                <input type="url" readOnly value={p.socialLinks?.linkedin || ""} placeholder="https://linkedin.com/in/..." className="w-full bg-white/5 border border-white/10 rounded-twelve py-2 px-4 focus:border-primary focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">GitHub Profile</label>
                <input type="url" readOnly value={p.socialLinks?.github || ""} placeholder="https://github.com/..." className="w-full bg-white/5 border border-white/10 rounded-twelve py-2 px-4 focus:border-primary focus:outline-none" />
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="glass-card p-6 rounded-2xl text-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-purple-500 mx-auto mb-4 border-4 border-dark flex items-center justify-center font-bold text-2xl">
              {(p.name || "G")[0]}
            </div>
            <button className="text-sm text-primary font-medium hover:underline">View Profile</button>
          </section>

          <section className="glass-card p-6 rounded-2xl border-dashed border-2 border-white/10 bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer text-center group">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <Upload className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-bold mb-1">Update Resume</h3>
            <p className="text-xs text-gray-400">{p.resumeUrl ? "CV Uploaded" : "PDF up to 5MB"}</p>
          </section>

          <button className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 text-white font-bold py-3 rounded-twelve transition-all shadow-lg shadow-primary/20">
            <Save className="w-4 h-4" />
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
}

