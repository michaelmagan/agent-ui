import React from "react"
import { useCoAgent, useCopilotChat } from "@copilotkit/react-core"
import { Role, TextMessage } from "@copilotkit/runtime-client-gql"

import { Button } from "@/components/ui/button"

const Agent: React.FC = () => {
  const { state, setState, start, stop, run, running } = useCoAgent({
    name: "cofinder_agent",
  })

  const { setMessages } = useCopilotChat()

  React.useEffect(() => {
    setMessages([
      new TextMessage({
        content: "what is the weather in sf",
        role: Role.System,
      }),
    ])
  }, [])

  const handleToggleAgent = () => {
    if (running) {
      stop()
    } else {
      run()
    }
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <Button
        onClick={handleToggleAgent}
        className="px-6 py-2 text-lg font-semibold"
      >
        {running ? "Stop Agent" : "Start Agent"}
      </Button>
      <p className="text-sm text-gray-500">
        {running
          ? "The car rental agent is running."
          : "Click to start the car rental agent."}
      </p>
      <p className="text-sm text-gray-500">
        state:{JSON.stringify(state)}
        running: {running.toString()}
      </p>
    </div>
  )
}

export { Agent }
