import { FunctionComponent } from "react"

import { Header as HeaderClient } from "./Header-Client"

export const Header: FunctionComponent = () => {
  return (
    <header className="fixed left-0 right-0 top-0 z-10 mx-4 my-4 space-y-4 bg-background">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">Yage: A YC Clone of Sage</h1>
          <p className="text-xs text-gray-600 dark:text-gray-400 md:text-sm">
            Chat with 4500+ YC Companies Data
          </p>
        </div>
        <HeaderClient />
      </div>
    </header>
  )
}
