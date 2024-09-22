import React, { useState } from "react"
import { HydraSecretForm } from "@/model/hydra"

import { HydraForm } from "./form"

type HydraSecretsProps = {
  secretForm: HydraSecretForm
}

export const HydraSecrets: React.FC<HydraSecretsProps> = ({ secretForm }) => {
  const [savedSecret, setSavedSecret] = useState<Record<string, string> | null>(
    null
  )

  const handleSaveSecret = (data: Record<string, string>) => {
    // Save the secret locally
    localStorage.setItem("hydraSecret", JSON.stringify(data))
    setSavedSecret(data)

    // Call the original onSubmit function if provided
    if (secretForm.onSubmit) {
      secretForm.onSubmit(data)
    }
  }

  return (
    <div className="space-y-4">
      <HydraForm {...secretForm} onSubmit={handleSaveSecret} />
      {savedSecret && (
        <div className="mt-4 rounded-md bg-green-100 p-4 text-green-700">
          Secret saved successfully!
        </div>
      )}
      <button
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        onClick={() => {
          const savedData = localStorage.getItem("hydraSecret")
          if (savedData) {
            setSavedSecret(JSON.parse(savedData))
          }
        }}
      >
        Load Saved Secret
      </button>
    </div>
  )
}
