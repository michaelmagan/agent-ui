import { FunctionComponent } from "react"

import { Header as HeaderClient } from "./Header-Client"
import { UsersIcon } from "lucide-react"

export const Header: FunctionComponent = () => {
  return (
    <header className="fixed left-0 right-0 top-0 z-10 mx-4 my-4 space-y-4 bg-background">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex flex-col">
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-10 h-10 border-2 border-[#43AA8B] bg-background rounded-full">
              <UsersIcon className="w-5 h-5 text-[#277DA1]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                <span style={{color: "#277DA1"}}>C</span>
                <span style={{color: "#577590"}}>o</span>
                <span style={{color: "#4D908E"}}>-</span>
                <span style={{color: "#43AA8B"}}>F</span>
                <span style={{color: "#90BE6D"}}>i</span>
                <span style={{color: "#F9C74F"}}>n</span>
                <span style={{color: "#F9844A"}}>d</span>
                <span style={{color: "#F8961E"}}>e</span>
                <span style={{color: "#F3722C"}}>r</span>
              </h1>
              <p className="text-xs text-gray-600 dark:text-gray-400 md:text-sm">
                Find your ideal co-founder
              </p>
            </div>
          </div>
        </div>
        <HeaderClient />
      </div>
    </header>
  )
}
