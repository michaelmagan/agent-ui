# Adaptive UI for Agents

This project aims to improve the interface between AI agents and users by providing an adaptive UI. It supports handling sensitive data like passwords/secrets, makes user interactions easier through dropdowns, buttons, sliders, etc., and presents data back to users more effectively using graphs, visualizations, and UI elements.

## Join Our Hackathon Team

If you'd like to join our hackathon team, follow these steps:

1. Join our Discord server: [![Discord](https://img.shields.io/discord/1251581895414911016?color=7289da&label=discord)](https://discord.gg/dJNvPEHth6)
2. Navigate to the #agent-ui channel
3. Post your GitHub handle, and I'll add you as a contributor.

We're looking for:

- People with experience building agents
- People with experience building with React
- People with experience with memory or vector databases
- Peoplw with design skills :)

## Technologies

We're using:

- [Hydra-AI](https://github.com/michaelmagan/hydraai) for the adaptive UI
- Anthropic for AI capabilities
- Next.js for the React framework
- Tailwind CSS for styling
- Pinecone for vector database

## Preflight

-

## Key Tasks

- Create an AI agent (especially one with tools that need passwords or API key access)
- Add a way for the app to store secrets and give the AI model an identifier and a way to access those secrets
- Implement a UI with the ability to store secrets, usernames/passwords (as mentioned above)
- Create flexible UIs for Agents asking for user inputs.
- UI for running multiple agents at once and notifications for when the agents need input.
- UI to monitor the actions of Agents (see runing logs.)
- UI for the agents to display final outputs: graphs, slides, text boxes etc.

## Getting Started

1. Clone the repository
2. Set up your environment variables by creating a `.env.local` file and populating it with the necessary keys
3. Install the required Node.js packages:
   ```
   npm install
   ```
4. Start the development server:
   ```
   npm run dev
   ```
5. Create a branch with your changes.
6. Perform a pull request when completed.

## Project Structure

The project is structured as follows:

- `/src`: Main source directory

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
