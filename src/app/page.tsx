"use client"

import ChatBox from "@/components/chat/box"
import { PoweredBy } from "@/components/Powered-By"

const Page = () => {
  return (
    <div className="mx-auto flex h-screen w-full max-w-7xl flex-col">
      <ChatBox />
      <PoweredBy />
    </div>
  )
}

export default Page
