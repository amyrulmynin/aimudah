import { NextRequest, NextResponse } from "next/server";

const UPSTREAM_URL = "https://app.minie.qzz.io/v1/chat/completions";
const UPSTREAM_KEY = process.env.UPSTREAM_API_KEY || "sk-0bbe287d2db7e3ae-enhj77-bd1214f8";

// Model mapping: aimudah/ → ma/
const MODELS: Record<string, string> = {
  "aimudah/claude-3.7-sonnet": "ma/claude-3.7-sonnet",
  "aimudah/claude-haiku-4.5": "ma/claude-haiku-4.5",
  "aimudah/claude-opus-4.5": "ma/claude-opus-4.5",
  "aimudah/claude-opus-4.6": "ma/claude-opus-4.6",
  "aimudah/claude-opus-4.7": "ma/claude-opus-4.7",
  "aimudah/claude-sonnet-4": "ma/claude-sonnet-4",
  "aimudah/claude-sonnet-4.5": "ma/claude-sonnet-4.5",
  "aimudah/claude-sonnet-4.6": "ma/claude-sonnet-4.6",
  "aimudah/deepseek-3.2": "ma/deepseek-3.2",
  "aimudah/glm-5": "ma/glm-5",
  "aimudah/minimax-m2.1": "ma/minimax-m2.1",
  "aimudah/minimax-m2.5": "ma/minimax-m2.5",
  "aimudah/qwen3-coder-next": "ma/qwen3-coder-next",
};

function getApiKeyFromHeader(req: NextRequest): string | null {
  const auth = req.headers.get("authorization");
  if (auth?.startsWith("Bearer ")) {
    return auth.slice(7);
  }
  return null;
}

export async function POST(req: NextRequest) {
  // 1. Validate API key
  const apiKey = getApiKeyFromHeader(req);
  if (!apiKey || !apiKey.startsWith("aimudah-22dex-")) {
    return NextResponse.json(
      { error: { message: "API key tidak sah.", type: "invalid_api_key" } },
      { status: 401 }
    );
  }

  // TODO: Validate key against database, check user plan, rate limit

  // 2. Parse request body
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: { message: "Request body tidak sah.", type: "invalid_request" } },
      { status: 400 }
    );
  }

  const { model, messages, stream = false, ...rest } = body;

  if (!model || !messages) {
    return NextResponse.json(
      { error: { message: "Parameter 'model' dan 'messages' diperlukan.", type: "invalid_request" } },
      { status: 400 }
    );
  }

  // 3. Map model name
  const upstreamModel = MODELS[model];
  if (!upstreamModel) {
    return NextResponse.json(
      { error: { message: `Model '${model}' tidak disokong. Guna prefix 'aimudah/'.`, type: "invalid_model" } },
      { status: 400 }
    );
  }

  // 4. Forward to upstream
  try {
    const upstreamRes = await fetch(UPSTREAM_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${UPSTREAM_KEY}`,
      },
      body: JSON.stringify({
        model: upstreamModel,
        messages,
        stream,
        ...rest,
      }),
    });

    if (!upstreamRes.ok) {
      const errText = await upstreamRes.text();
      return NextResponse.json(
        { error: { message: `Upstream error: ${upstreamRes.status}`, type: "upstream_error", details: errText } },
        { status: upstreamRes.status }
      );
    }

    // 5. Handle streaming
    if (stream) {
      const responseStream = upstreamRes.body;
      if (!responseStream) {
        return NextResponse.json(
          { error: { message: "Stream tidak tersedia.", type: "server_error" } },
          { status: 500 }
        );
      }

      return new Response(responseStream, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      });
    }

    // 6. Non-streaming — pass through
    const data = await upstreamRes.json();
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json(
      { error: { message: `Ralat dalaman: ${err.message}`, type: "server_error" } },
      { status: 500 }
    );
  }
}
