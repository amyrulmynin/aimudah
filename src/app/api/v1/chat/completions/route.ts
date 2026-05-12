import { NextRequest, NextResponse } from "next/server";

// Model routing config
const MODEL_ROUTES: Record<string, { provider: string; model: string; url: string }> = {
  "claude-haiku-4.5": {
    provider: "anthropic",
    model: "claude-haiku-4.5",
    url: "https://api.anthropic.com/v1/messages",
  },
  "claude-sonnet-4.5": {
    provider: "anthropic",
    model: "claude-sonnet-4.5",
    url: "https://api.anthropic.com/v1/messages",
  },
  "claude-sonnet-4": {
    provider: "anthropic",
    model: "claude-sonnet-4",
    url: "https://api.anthropic.com/v1/messages",
  },
  "claude-opus-4.6": {
    provider: "anthropic",
    model: "claude-opus-4.6",
    url: "https://api.anthropic.com/v1/messages",
  },
  "claude-opus-4.7": {
    provider: "anthropic",
    model: "claude-opus-4.7",
    url: "https://api.anthropic.com/v1/messages",
  },
  "gpt-5": {
    provider: "openai",
    model: "gpt-5",
    url: "https://api.openai.com/v1/chat/completions",
  },
  "gpt-5.4": {
    provider: "openai",
    model: "gpt-5.4",
    url: "https://api.openai.com/v1/chat/completions",
  },
  "gpt-5.5": {
    provider: "openai",
    model: "gpt-5.5",
    url: "https://api.openai.com/v1/chat/completions",
  },
  "gemini-2.5-pro": {
    provider: "google",
    model: "gemini-2.5-pro",
    url: "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions",
  },
  "gemini-3-flash": {
    provider: "google",
    model: "gemini-3-flash",
    url: "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions",
  },
  "gemini-3.1-pro": {
    provider: "google",
    model: "gemini-3.1-pro",
    url: "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions",
  },
  "deepseek-3.2": {
    provider: "deepseek",
    model: "deepseek-chat",
    url: "https://api.deepseek.com/v1/chat/completions",
  },
  "kimi-k2.5": {
    provider: "moonshot",
    model: "kimi-k2.5",
    url: "https://api.moonshot.cn/v1/chat/completions",
  },
};

// Tier access control
const FREE_MODELS = [
  "claude-haiku-4.5",
  "claude-sonnet-4.5",
  "deepseek-3.2",
];

const SULTAN_ONLY = ["gpt-5.5"];

function getApiKeyFromHeader(req: NextRequest): string | null {
  const auth = req.headers.get("authorization");
  if (auth?.startsWith("Bearer ")) {
    return auth.slice(7);
  }
  return null;
}

function getProviderKey(provider: string): string | null {
  const keys: Record<string, string | undefined> = {
    anthropic: process.env.ANTHROPIC_API_KEY,
    openai: process.env.OPENAI_API_KEY,
    google: process.env.GOOGLE_API_KEY,
    deepseek: process.env.DEEPSEEK_API_KEY,
    moonshot: process.env.MOONSHOT_API_KEY,
  };
  return keys[provider] || null;
}

export async function POST(req: NextRequest) {
  const startTime = Date.now();

  // 1. Validate API key
  const apiKey = getApiKeyFromHeader(req);
  if (!apiKey || !apiKey.startsWith("sk-aimudah-")) {
    return NextResponse.json(
      { error: { message: "API key tidak sah.", type: "invalid_api_key" } },
      { status: 401 }
    );
  }

  // TODO: Validate key against database, check user plan, rate limit
  // For now, accept any sk-aimudah- prefixed key

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

  // 3. Route to provider
  const route = MODEL_ROUTES[model];
  if (!route) {
    return NextResponse.json(
      { error: { message: `Model '${model}' tidak disokong.`, type: "invalid_model" } },
      { status: 400 }
    );
  }

  const providerKey = getProviderKey(route.provider);
  if (!providerKey) {
    return NextResponse.json(
      { error: { message: "Provider tidak dikonfigurasi.", type: "server_error" } },
      { status: 500 }
    );
  }

  // 4. Build upstream request based on provider
  let upstreamUrl = route.url;
  let upstreamHeaders: Record<string, string> = {};
  let upstreamBody: any;

  if (route.provider === "anthropic") {
    // Convert OpenAI format to Anthropic format
    upstreamHeaders = {
      "Content-Type": "application/json",
      "x-api-key": providerKey,
      "anthropic-version": "2023-06-01",
    };

    const systemMsg = messages.find((m: any) => m.role === "system");
    const nonSystemMsgs = messages.filter((m: any) => m.role !== "system");

    upstreamBody = JSON.stringify({
      model: route.model,
      messages: nonSystemMsgs,
      ...(systemMsg ? { system: systemMsg.content } : {}),
      max_tokens: rest.max_tokens || 4096,
      stream,
    });
  } else if (route.provider === "google") {
    // Google's OpenAI-compatible endpoint
    upstreamUrl = `${route.url}`;
    upstreamHeaders = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${providerKey}`,
    };
    upstreamBody = JSON.stringify({
      model: route.model,
      messages,
      stream,
      ...rest,
    });
  } else {
    // OpenAI-compatible providers (openai, deepseek, moonshot)
    upstreamHeaders = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${providerKey}`,
    };
    upstreamBody = JSON.stringify({
      model: route.model,
      messages,
      stream,
      ...rest,
    });
  }

  // 5. Make upstream request
  try {
    const upstreamRes = await fetch(upstreamUrl, {
      method: "POST",
      headers: upstreamHeaders,
      body: upstreamBody,
    });

    if (!upstreamRes.ok) {
      const errText = await upstreamRes.text();
      return NextResponse.json(
        { error: { message: `Upstream error: ${upstreamRes.status}`, type: "upstream_error", details: errText } },
        { status: upstreamRes.status }
      );
    }

    // 6. Handle streaming
    if (stream) {
      const responseStream = upstreamRes.body;
      if (!responseStream) {
        return NextResponse.json(
          { error: { message: "Stream tidak tersedia.", type: "server_error" } },
          { status: 500 }
        );
      }

      // For Anthropic, we need to convert SSE format to OpenAI format
      if (route.provider === "anthropic") {
        const transformedStream = transformAnthropicStream(responseStream, model);
        return new Response(transformedStream, {
          headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            Connection: "keep-alive",
          },
        });
      }

      // For OpenAI-compatible providers, pass through
      return new Response(responseStream, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      });
    }

    // 7. Handle non-streaming
    const data = await upstreamRes.json();

    // Convert Anthropic response to OpenAI format
    if (route.provider === "anthropic") {
      return NextResponse.json(convertAnthropicToOpenAI(data, model));
    }

    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json(
      { error: { message: `Ralat dalaman: ${err.message}`, type: "server_error" } },
      { status: 500 }
    );
  }
}

// Convert Anthropic response to OpenAI format
function convertAnthropicToOpenAI(data: any, model: string) {
  return {
    id: data.id || `chatcmpl-${Date.now()}`,
    object: "chat.completion",
    created: Math.floor(Date.now() / 1000),
    model,
    choices: [
      {
        index: 0,
        message: {
          role: "assistant",
          content: data.content?.[0]?.text || "",
        },
        finish_reason: data.stop_reason === "end_turn" ? "stop" : data.stop_reason,
      },
    ],
    usage: {
      prompt_tokens: data.usage?.input_tokens || 0,
      completion_tokens: data.usage?.output_tokens || 0,
      total_tokens: (data.usage?.input_tokens || 0) + (data.usage?.output_tokens || 0),
    },
  };
}

// Transform Anthropic SSE stream to OpenAI SSE format
function transformAnthropicStream(stream: ReadableStream, model: string): ReadableStream {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();

  return new ReadableStream({
    async start(controller) {
      let buffer = "";

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            controller.enqueue(encoder.encode("data: [DONE]\n\n"));
            controller.close();
            break;
          }

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const jsonStr = line.slice(6);
              if (jsonStr === "[DONE]") {
                controller.enqueue(encoder.encode("data: [DONE]\n\n"));
                continue;
              }

              try {
                const event = JSON.parse(jsonStr);

                if (event.type === "content_block_delta" && event.delta?.text) {
                  const chunk = {
                    id: `chatcmpl-${Date.now()}`,
                    object: "chat.completion.chunk",
                    created: Math.floor(Date.now() / 1000),
                    model,
                    choices: [
                      {
                        index: 0,
                        delta: { content: event.delta.text },
                        finish_reason: null,
                      },
                    ],
                  };
                  controller.enqueue(
                    encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`)
                  );
                } else if (event.type === "message_stop") {
                  const chunk = {
                    id: `chatcmpl-${Date.now()}`,
                    object: "chat.completion.chunk",
                    created: Math.floor(Date.now() / 1000),
                    model,
                    choices: [
                      {
                        index: 0,
                        delta: {},
                        finish_reason: "stop",
                      },
                    ],
                  };
                  controller.enqueue(
                    encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`)
                  );
                }
              } catch {
                // Skip malformed JSON
              }
            }
          }
        }
      } catch (err) {
        controller.error(err);
      }
    },
  });
}
