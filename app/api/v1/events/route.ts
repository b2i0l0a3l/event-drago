import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest){
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Missing API Key" }, { status: 401 })
    }

}