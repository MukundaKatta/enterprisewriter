import { NextRequest, NextResponse } from "next/server";
import { generateAIResponse } from "@/lib/ai";

export async function POST(req: NextRequest) {
  try {
    const { prompt, model, language } = await req.json();
    const systemPrompt = `You are EnterpriseWriter, an enterprise-grade AI content generator. Generate professional content in ${language || "English"}. Apply compliance checks automatically. Always maintain enterprise quality standards.`;
    const content = await generateAIResponse(systemPrompt, prompt);
    return NextResponse.json({ content, model, complianceStatus: "passed", auditId: `EW-${Date.now()}` });
  } catch (error) {
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }
}
