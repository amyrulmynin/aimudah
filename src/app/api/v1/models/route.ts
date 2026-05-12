import { NextResponse } from "next/server";

const MODELS = [
  { id: "claude-haiku-4.5", object: "model", owned_by: "anthropic", tier: "free" },
  { id: "claude-sonnet-4.5", object: "model", owned_by: "anthropic", tier: "free" },
  { id: "claude-sonnet-4", object: "model", owned_by: "anthropic", tier: "pro" },
  { id: "claude-opus-4.6", object: "model", owned_by: "anthropic", tier: "pro" },
  { id: "claude-opus-4.7", object: "model", owned_by: "anthropic", tier: "pro" },
  { id: "deepseek-3.2", object: "model", owned_by: "deepseek", tier: "free" },
  { id: "gpt-5", object: "model", owned_by: "openai", tier: "pro" },
  { id: "gpt-5.4", object: "model", owned_by: "openai", tier: "pro" },
  { id: "gpt-5.5", object: "model", owned_by: "openai", tier: "sultan" },
  { id: "gemini-2.5-pro", object: "model", owned_by: "google", tier: "pro" },
  { id: "gemini-3-flash", object: "model", owned_by: "google", tier: "pro" },
  { id: "gemini-3.1-pro", object: "model", owned_by: "google", tier: "pro" },
  { id: "kimi-k2.5", object: "model", owned_by: "moonshot", tier: "pro" },
];

export async function GET() {
  return NextResponse.json({
    object: "list",
    data: MODELS,
  });
}
