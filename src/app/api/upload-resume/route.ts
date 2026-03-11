import { NextRequest, NextResponse } from "next/server";
import { uploadResumeToBlob } from "@/lib/azure/blobUpload";
import { randomUUID } from "crypto";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Convert Web File to Node Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Generate unique filename to prevent overwrite
    const uniqueFilename = `${Date.now()}-${randomUUID()}-${file.name.replace(/[^a-zA-Z0-9.\-_]/g, '')}`;

    // Upload to Azure Blob Storage
    const uploadedUrl = await uploadResumeToBlob(buffer, uniqueFilename, file.type);

    return NextResponse.json({ url: uploadedUrl }, { status: 200 });
  } catch (error: any) {
    console.error("Error uploading resume:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: error.message },
      { status: 500 }
    );
  }
}
