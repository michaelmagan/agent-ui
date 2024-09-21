import { NextRequest } from "next/server"
import {
  CopilotRuntime,
  copilotRuntimeNextJSAppRouterEndpoint,
  OpenAIAdapter,
} from "@copilotkit/runtime"
import OpenAI from "openai"

const openai = new OpenAI()
const serviceAdapter = new OpenAIAdapter({ openai })

const runtime = new CopilotRuntime()

export const POST = async (req: NextRequest) => {
  const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
    runtime,
    serviceAdapter,
    endpoint: "/api/copilotkit",
  })

  return handleRequest(req)
}
