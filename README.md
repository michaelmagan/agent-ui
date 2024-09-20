# 🧠 Adaptive UI for Agents 🤖

[![AI Tinkerers - Humans-in-the-Loop Hackathon with Anthropic 2024](https://img.shields.io/badge/AI%20Tinkerers-Humans--in--the--Loop%20Hackathon%202024-blueviolet?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0id2hpdGUiIGQ9Ik0xMiAyQzYuNDggMiAyIDYuNDggMiAxMnM0LjQ4IDEwIDEwIDEwIDEwLTQuNDggMTAtMTBTMTcuNTIgMiAxMiAyek0xMCAyMHYtNmg0djZoLTR6bTQtOGgtNFY0aDR2OHoiLz48L3N2Zz4=)](https://seattle.aitinkerers.org/p/ai-tinkerers-humans-in-the-loop-hackathon-with-anthropic)
[![Adaptive UI](https://img.shields.io/badge/Adaptive%20UI-for%20Agents-ff69b4?style=for-the-badge&logo=react)](https://github.com/michaelmagan/agent-ui)
[![Discord](https://img.shields.io/discord/1251581895414911016?color=7289da&label=discord&style=for-the-badge&logo=discord)](https://discord.gg/dJNvPEHth6)

## 🚀 About The Project

This project aims to revolutionize the interface between AI agents and users by providing an adaptive UI. Our key features include:

- 🔒 Secure handling of sensitive data (passwords/secrets)
- 🖱️ Enhanced user interactions through intuitive UI elements (dropdowns, buttons, sliders)
- 📊 Effective data presentation using graphs and visualizations

## 🛠️ Technologies

We're leveraging cutting-edge technologies:

- [Hydra-AI](https://github.com/michaelmagan/hydraai) - For adaptive UI
- [Anthropic](https://www.anthropic.com/) - AI capabilities
- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Pinecone](https://www.pinecone.io/) - Vector database

## 🤝 Join Our Hackathon Team

We're looking for talented individuals with experience in:

- 🤖 Building AI agents
- ⚛️ React development
- 🧠 Memory or vector databases
- 🎨 UI/UX design

To join:

1. Come find me: [here is what I look like](https://x.com/mrmagan_/photo)
2. Join our [discord server](https://discord.gg/dJNvPEHth6)
3. Navigate to the `#agent-ui` channel
4. Post your GitHub handle in the channel

## 🔑 Key Tasks

- [ ] Create an AI agent with tools requiring secure access
- [ ] Implement secret storage and access for AI models
- [ ] Develop flexible UIs for agent-user interactions
- [ ] Create a UI for managing multiple agents simultaneously
- [ ] Design a monitoring interface for agent actions
- [ ] Implement UI components for agent output display (graphs, slides, text boxes)

## 🚀 Getting Started

1. Clone the repository
2. Set up environment variables in `.env.local`
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Create a branch for your changes
6. Submit a pull request when ready

## 📁 Project Structure

- `/app`: Next.js app directory
  - `components`: App-specific components
    - `page.tsx`: Main page component
    - `layout.tsx`: Layout component
- `/components`: Reusable components
  - `/chat`: Chat-related components
  - `/hydra`: Hydra-specific components
  - `/ui`: UI components
- `/model`: Data models and schemas
  - `document.ts`: Document model
  - `hydra.ts`: Hydra-related schemas
- `/styles`: Styling files
- `/types`: TypeScript type definitions
- `hydra-client.ts`: Where you register hydra components with schemas and tools.
- `yc.service.ts`: An example service that can be used as a tool.
