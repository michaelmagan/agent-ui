import { SiteConfig } from "@/types"

import { env } from "@/env.mjs"

export const siteConfig: SiteConfig = {
  name: "Agent-UI",
  author: "AI Tinkerers",
  description:
    "An adaptive UI for agents to interface with humans, built during the AI Tinkerers Fall Hackathon.",
  keywords: [
    "AI",
    "Agents",
    "Adaptive UI",
    "Human-AI Interaction",
    "Next.js",
    "Hydra-ai",
    "React",
    "Tailwind CSS",
  ],
  url: {
    base: env.NEXT_PUBLIC_APP_URL,
    author: "usehydra.ai",
  },
  links: {
    github: "https://github.com/michaelmagan/agent-ui",
  },
  ogImage: `${env.NEXT_PUBLIC_APP_URL}/agent-ui-og.jpg`,
}
