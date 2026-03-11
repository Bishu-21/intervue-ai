import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, history, userId } = body;
    console.log("Interview API Request:", { message, historyLength: history?.length, userId });

    // Try to fetch candidate profile if userId is provided
    let candidateContext = "a Graduate Student";
    if (userId) {
      try {
        const profileData = await redis.get(`user:${userId}:profile`);
        if (profileData) {
          const profile = typeof profileData === 'string' ? JSON.parse(profileData) : profileData;
          candidateContext = `
            Name: ${profile.fullName || 'Candidate'}
            University: ${profile.university || 'N/A'}
            Major: ${profile.major || 'N/A'}
            Location: ${profile.location || 'N/A'}
            Skills: ${Object.entries(profile.skills || {}).map(([s, v]) => `${s}: ${v}/10`).join(', ')}
            Interests: ${profile.interests || 'N/A'}
          `;
        }
      } catch (err) {
        console.error("Redis fetch error:", err);
      }
    }

    // Determine if it's time to end (approx 10-12 exchanges)
    const turns = history?.length || 0;
    const isEnding = turns > 10;

    const modelName = "gemini-3.1-flash-lite-preview";
    const model = genAI.getGenerativeModel({
      model: modelName,
      systemInstruction: `You are an expert AI technical interviewer for Intervue AI evaluating a candidate for a Software Engineering position.

Candidate Profile:
${candidateContext}

Interview Guidelines:
1. Start with a brief intro if this is the beginning.
2. Ask technical and behavioral questions specifically based on the candidate's skills and background listed above.
3. Keep responses concise (2-3 sentences max).
4. Conduct the interview for about 10-12 total exchanges.
${isEnding ? "5. CRITICAL: The interview is now wrapping up. Please provide: A) A brief final feedback summary, and B) A 'Final Evaluation Score: [Score]/100' based on their answers so far." : "5. Ask only one question at a time."}
6. Do not break character.`
    });

    const formattedHistory: { role: string; parts: { text: string }[] }[] = [];
    if (history && history.length > 0) {
      history.forEach((msg: any) => {
        const role = msg.role === "assistant" ? "model" : "user";
        if (formattedHistory.length === 0 && role === "model") return;
        formattedHistory.push({
          role: role,
          parts: [{ text: msg.content }],
        });
      });
    }

    const chatSession = model.startChat({
      history: formattedHistory,
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.7,
      }
    });

    const result = await chatSession.sendMessage(message);
    const text = result.response.text();

    return NextResponse.json({ reply: text });

  } catch (error: any) {
    console.error("Interview API Error Detailed:", error);
    return NextResponse.json(
      { error: "Failed to process interview response", details: error.message, stack: error.stack },
      { status: 500 }
    );
  }
}
