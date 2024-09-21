import React, { useState } from "react"
import { useCoAgent } from "@copilotkit/react-core"

import { Button } from "@/components/ui/button"

const Agent: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false)
  const { state, setState, start, stop, run, running } = useCoAgent({
    name: "search_agent",
  })

  const handleToggleAgent = () => {
    if (isRunning) {
      stop()
      setIsRunning(false)
    } else {
      start()
      setIsRunning(true)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <Button
        onClick={handleToggleAgent}
        className="px-6 py-2 text-lg font-semibold"
      >
        {isRunning ? "Stop Agent" : "Start Agent"}
      </Button>
      <p className="text-sm text-gray-500">
        {isRunning
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
