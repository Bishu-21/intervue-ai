import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "UserId is required" }, { status: 400 });
    }

    const profileData = await redis.get(`user:${userId}:profile`);
    
    if (!profileData) {
       return NextResponse.json({ message: "Profile not found" }, { status: 404 });
    }

    const profile = typeof profileData === 'string' ? JSON.parse(profileData) : profileData;

    return NextResponse.json({ profile }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: error.message },
      { status: 500 }
    );
  }
}
