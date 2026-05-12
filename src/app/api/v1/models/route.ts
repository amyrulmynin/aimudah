import { NextResponse } from "next/server";

const MODELS = [
  { id: "aimudah/claude-3.7-sonnet", object: "model", owned_by: "aimudah" },
  { id: "aimudah/claude-haiku-4.5", object: "model", owned_by: "aimudah" },
  { id: "aimudah/claude-opus-4.5", object: "model", owned_by: "aimudah" },
  { id: "aimudah/claude-opus-4.6", object: "model", owned_by: "aimudah" },
  { id: "aimudah/claude-opus-4.7", object: "model", owned_by: "aimudah" },
  { id: "aimudah/claude-sonnet-4", object: "model", owned_by: "aimudah" },
  { id: "aimudah/claude-sonnet-4.5", object: "model", owned_by: "aimudah" },
  { id: "aimudah/claude-sonnet-4.6", object: "model", owned_by: "aimudah" },
  { id: "aimudah/deepseek-3.2", object: "model", owned_by: "aimudah" },
  { id: "aimudah/glm-5", object: "model", owned_by: "aimudah" },
  { id: "aimudah/minimax-m2.1", object: "model", owned_by: "aimudah" },
  { id: "aimudah/minimax-m2.5", object: "model", owned_by: "aimudah" },
  { id: "aimudah/qwen3-coder-next", object: "model", owned_by: "aimudah" },
];

export async function GET() {
  return NextResponse.json({
    object: "list",
    data: MODELS,
  });
}
