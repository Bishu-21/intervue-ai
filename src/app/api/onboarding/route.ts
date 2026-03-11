import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Verify token or User ID from Appwrite auth context. 
    // Since Appwrite cookies might require more setup in Next.js Server Actions, 
    // for MVP we can extract a userId if passed, or mock one.
    const userId = data.userId || "mock-student-id"; 

    // Store data in Upstash Redis
    await redis.set(`user:${userId}:profile`, JSON.stringify(data));

    return NextResponse.json({ success: true, message: "Onboarding completed" }, { status: 200 });
  } catch (error: any) {
    console.error("Error saving onboarding data:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: error.message },
      { status: 500 }
    );
  }
}
